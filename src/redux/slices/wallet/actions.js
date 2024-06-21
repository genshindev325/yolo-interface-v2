import axios from 'axios'

import { config } from 'config'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { soliditySha3 } from 'utils'
import { LOCAL_WALLET_ID, TX_TYPE, YOLO_TOKEN_APPROVAL } from 'utils/constants'
import { setLocalTokenApprove } from 'utils/localStorage'

import { walletExtraReducer } from './reducers'
import { walletReducerActions } from './'

import { notificationActions } from 'redux/slices/notification/actions'

import { sendContractMethod, callContractMethod } from 'datasource/crypto/contracts'
import { confirmNftClaimed } from 'datasource/claimNft'

import { localTxActions } from './localTxActions'

// We can write thunks real actions, which may contain both sync and async logic.

// const walletActionsDef = () => async (dispatch, getState) => {
// }

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

// Actions Helpers

const composeTxEventListener = ({ dispatch, getState, eventCB = {}, gameId }) => {
  /*
    eventCB interface
      onHash: It will be triggered in the time we have the transaction hash, txInfo: { ...txInfo, gameId }
      onConfirmation: It will be triggered on every confirmation
      onConfirmed: It will be triggered once the number of confirmations are >= minConfirmation from config
      onFailed: It will be triggered when tx fails, if 'txInfo' is not define there are a problem with the tx in the blockchain
      onError: It will be triggered when tx process has error

    Code Snippet: 
    {
      onHash: (txInfo) => { console.log('onHash:', txInfo) },
      onConfirmation: (txInfo, txConfirmations) => { console.log('onConfirmation:', txConfirmations, txInfo) },
      onConfirmed: (txHash) => { console.log('onConfirmed:', txHash) },
      onFailed: (txInfo) => {}
      onError: () => {} WIP
    }
  */
  const state = getState()
  const network = state.wallet.chainInfo.network
  const { onHash, onError, ...restEventCB } = eventCB
  return {
    onTransactionHash: (txInfo) => {
      // txInfo = {from, hash, params, txType, eventListenersCb}
      const payload = { ...txInfo, gameId }
      localTxActions.addTx(network, payload)
      dispatch(walletReducerActions.addTx(payload))
      dispatch(walletExtraReducer.pullingTxInfo(restEventCB))
      onHash && onHash(payload)
    },
    onError: () => {
      onError && onError()
    }
  }
}

const updateAccount =
  ({ address }) =>
  (dispatch, getState) => {
    dispatch(walletExtraReducer.updateAddress({ address }))
    dispatch(walletExtraReducer.updateTokenInfo())
    dispatch(walletExtraReducer.updateNftInfo({ address }))
    dispatch(walletExtraReducer.updateBalance({ address }))
  }

const disconnect = () => (dispatch, getState) => {
  window.localStorage.removeItem(LOCAL_WALLET_ID)
  window.localStorage.removeItem('walletconnect')
  delete window.yoloWeb3
  dispatch(walletReducerActions.clearConnection())
}

const setTxAsUiHidden = (walletTxInfo) => async (dispatch, getState) => {
  const state = getState()
  const network = state.wallet.chainInfo.network
  const payload = { [walletTxInfo.hash]: { ...walletTxInfo } }
  localTxActions.updateTx(network, payload)
  dispatch(walletReducerActions.updateTx(payload))
}

/* ***************************************
 * User Interaction with contract actions
 * ***************************************/

// registerUsername refactored to BlockChain Polling Schema, tested in: desktop
const registerUsername = (actionData) => async (dispatch, getState) => {
  const { txData } = actionData
  const [usersContractInfo] = getSmartContractsInfo(['users'])
  const eventListenersCb = composeTxEventListener({
    dispatch,
    getState,
    eventCB: {
      onHash: (txInfo) => {
        const usernameToastObj = {
          show: true,
          id: 'usernamePending'
        }
        dispatch(notificationActions.updateToast(usernameToastObj))
      },
      onConfirmed: (txHash) => {
        const usernameToastObj = {
          show: true,
          id: 'usernameReady'
        }
        dispatch(notificationActions.updateToast(usernameToastObj))
      }
    }
  })
  const receipt = await sendContractMethod(
    { contractInfo: usersContractInfo, method: 'setUserNames', params: txData, txType: TX_TYPE.USERNAME },
    eventListenersCb
  )
  dispatch(walletExtraReducer.updateAddress({ address: receipt.from }))
}

// approveToken refactored to BlockChain Polling Schema, tested in: desktop
const approveToken =
  (gameId, clear = false) =>
  async (dispatch, getState) => {
    const state = getState()
    const { UINT256_MAX } = config
    const [tokenContractInfo, gameContractInfo] = getSmartContractsInfo(['token', gameId])
    if (!tokenContractInfo || !gameContractInfo) {
      !tokenContractInfo && console.warn('ERROR: Token contract undefined ')
      !gameContractInfo && console.warn('ERROR: Game contract undefined')
      return false
    }
    const eventCB = {
      onHash: (txInfo) => {
        const approvalToastObj = {
          show: true,
          id: 'tokenPending'
        }
        dispatch(notificationActions.updateToast(approvalToastObj))
      },
      onConfirmation: (txInfo, txConfirmations) => {
        console.log('ACZ onConfirmation:', txConfirmations, txInfo)
      },
      onConfirmed: (txHash) => {
        const approvalToastObj = {
          show: true,
          id: 'tokenReady'
        }
        dispatch(notificationActions.updateToast(approvalToastObj))
      }
    }
    const eventListenersCb = clear ? {} : composeTxEventListener({ dispatch, getState, eventCB, gameId })
    const receipt = await sendContractMethod(
      {
        contractInfo: tokenContractInfo,
        method: 'approve',
        params: { spender: gameContractInfo.address.toLowerCase(), amount: clear ? 0 : UINT256_MAX },
        txType: TX_TYPE.APPROVE
      },
      eventListenersCb
    )
    const amountAllowed = parseFloat(receipt?.events?.Approval?.returnValues?.value) || 0
    amountAllowed && dispatch(updateAccount({ address: state.wallet.address }))
    setLocalTokenApprove(state.wallet.address, gameId, amountAllowed ? true : false)
  }

// claimNft refactored to BlockChain Polling Schema, tested in: desktop
const claimNFT = () => async (dispatch, getState) => {
  const state = getState()
  const { address, isConnected } = state.wallet
  const { gameId } = state.gameData
  if (!isConnected) {
    const walletSelectorObj = {
      // this component will receive `closeModal` prop to close programmatically the modal
      show: true,
      id: 'walletSelector',
      backdropClose: false
    }
    dispatch(notificationActions.updateModal(walletSelectorObj))
    return
  }
  try {
    const [nftClaimsContractInfo] = getSmartContractsInfo(['NftClaims'])
    const eventCB = {
      onHash: (txInfo) => {
        const NftClaimToastObj = {
          show: true,
          id: 'nftClaimPending'
        }
        dispatch(notificationActions.updateToast(NftClaimToastObj))
      },
      onConfirmed: (txHash) => {
        dispatch(walletExtraReducer.updateBalance({ address }))
      },
      onFailed: () => {
        dispatch(walletExtraReducer.updateBalance({ address }))
      }
    }
    const clainNftEventListener = composeTxEventListener({ dispatch, getState, eventCB, gameId })
    const receipt = await sendContractMethod(
      {
        contractInfo: nftClaimsContractInfo,
        method: 'claimNft',
        params: {},
        txType: TX_TYPE.CLAIM_NFT
      },
      clainNftEventListener
    )
    const eventsList = Object.keys(receipt.events)
    if (eventsList.includes('NftClaimExpiration')) {
      dispatch(
        notificationActions.updateToast({
          show: true,
          id: 'error',
          props: {
            title: 'Your time has expired',
            paragraph: 'To renew your NFT claim, please apply again'
          }
        })
      )
    }
    if (eventsList.includes('NftClaimed')) {
      const { tokenIndex } = receipt.events.NftClaimed.returnValues || {}
      dispatch(
        notificationActions.updateToast({
          show: true,
          id: 'nftReady',
          props: {
            nftId: tokenIndex
          }
        })
      )
      confirmNftClaimed({ address, tokenIndex, complainMode: false })
    }
  } catch (err) {
    console.error(`ERROR: "claimNFT" action fails: ${err}`)
    dispatch(
      notificationActions.updateToast({
        show: true,
        id: 'error'
      })
    )
  }
}

// yoloBid refactored to BlockChain Polling Schema, tested in: desktop
const yoloBid = (actionData) => async (dispatch, getState) => {
  const state = getState()
  const address = state.wallet.address
  const network = state.wallet.chainInfo?.network
  const { bidData, gameId, gameHexId } = actionData
  const [tokenContractInfo, gameContractInfo] = getSmartContractsInfo(['token', gameId])
  if (!tokenContractInfo || !gameContractInfo) {
    !tokenContractInfo && console.warn('ERROR: Token contract undefined ')
    !gameContractInfo && console.warn('ERROR: Game contract undefined')
    return false
  }
  const eventCB = {
    onConfirmed: (txHash) => {
      const state = getState()
      const bidRoundIndex = bidData.bidRoundIndex
      const bidId = `${gameHexId}-${bidRoundIndex}-${txHash}`

      const txInfo = state.wallet?.txs?.[network]?.[txHash]

      const updatedTxInfo = { ...txInfo, txParams: { ...txInfo.txParams, bidId } }
      const bidDataForDb = {
        bidRoundIndex: bidRoundIndex,
        bidData: bidData,
        txHash: txInfo.hash,
        txInfo,
        gameId,
        gameContract: gameContractInfo.address
      }
      axios.post(`${yoloApiBaseUrl}/bidstodatabase`, bidDataForDb)

      const payload = { [txHash]: { ...updatedTxInfo } }
      localTxActions.updateTx(network, payload)
      dispatch(walletReducerActions.updateTx(payload))
      dispatch(walletExtraReducer.updateBalance({ address }))
    },
    onFailed: (txData) => {
      if (txData) {
        const state = getState()
        const txHash = txData.hash
        const bidRoundIndex = bidData.bidRoundIndex
        const bidId = `${gameHexId}-${bidRoundIndex}-${txHash}`
        const txInfo = state.wallet?.txs?.[network]?.[txHash]
        const updatedTxInfo = { ...txInfo, status: 'failed', txParams: { ...txInfo.txParams, bidId } }

        const payload = { [txHash]: { ...updatedTxInfo } }
        localTxActions.updateTx(network, payload)
        dispatch(walletReducerActions.updateTx(payload))
        dispatch(walletExtraReducer.updateBalance({ address }))
      }
    }
  }
  const txData = { contractInfo: gameContractInfo, method: 'bidInYolo', params: bidData, txType: TX_TYPE.BID }
  const bidEventListener = composeTxEventListener({ dispatch, getState, eventCB, gameId })
  await sendContractMethod(txData, bidEventListener)
}

// approveToken refactored to BlockChain Polling Schema, tested in: desktop
const withdrawUserBalance = (amountData, address) => async (dispatch, getState) => {
  const [usersContractInfo] = getSmartContractsInfo(['users'])
  if (!usersContractInfo) {
    console.warn('USERS CONTRACT UNDEFINED ')
    return false
  }

  const state = getState()
  const gameId = state.gameData.gameId

  const eventCB = {
    onConfirmed: (txHash) => {
      axios.post(`${yoloApiBaseUrl}/add-withdraw`, {
        txHash,
        address,
        amountInWei: amountData.amount
      })
    }
  }
  const withdrawEventListener = composeTxEventListener({ dispatch, getState, eventCB, gameId })
  const receipt = await sendContractMethod(
    { contractInfo: usersContractInfo, method: 'withdraw', params: amountData, txType: TX_TYPE.WITHDRAW },
    withdrawEventListener
  )
  if (receipt.status) {
    dispatch(walletExtraReducer.updateBalance({ address }))
  } else {
    console.warn('ERROR: `withdrawUserBalance` action fails')
  }
}

export const reduxWalletActions = {
  ...walletExtraReducer,
  disconnect,
  registerUsername,
  updateAccount,
  withdrawUserBalance,
  approveToken,
  yoloBid,
  claimNFT,
  setTxAsUiHidden
}
