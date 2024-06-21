// The `reducers` object lets us define reducers and generate associated actions
import { createAsyncThunk } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import axios from 'axios'

import { notificationActions } from 'redux/slices/notification/actions'

import { config } from 'config'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { Exception, getWeb3Utils, getThreeDotAddress, getTxInfo, getTxReceipt } from 'utils'
import { LOCAL_WALLET_ID, TX_TYPE } from 'utils/constants'

import {
  getUsername,
  checkHasNFTWaitlistId,
  getClaimExpirationTime,
  isPolygonTokenApproved,
  getBotBidStats,
  getNftTokenIndex,
  getNftTrackerData
} from 'datasource/crypto/contracts'
import {
  connectWalletWith,
  walletProviderSubscribe,
  getYoloTokenContractBalance,
  getUserContractBalance
} from 'datasource/crypto/wallets'

import { walletReducerActions } from '.'
import { walletInitialState } from './initialState'
import { localTxActions } from './localTxActions'

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

export const walletReducers = {
  setChainInfo: (state, action) => {
    state.chainInfo = action.payload
  },
  clearConnection: (state, action) => walletInitialState,
  addTx: (state, action) => {
    //state.lastPendingTxHash = action.payload.hash
    state.pendingTxHashes = [...state.pendingTxHashes, action.payload.hash]
    state.txs = {
      ...state.txs,
      [state.chainInfo.network]: {
        ...state.txs[state.chainInfo.network],
        [action.payload.hash]: {
          ...action.payload,
          status: 'pending',
          confirmations: 0,
          isConfirmed: false,
          timestamp: Date.now() / 1000
        }
      }
    }
  },
  updateTx: (state, action) => {
    state.txs = {
      ...state.txs,
      [state.chainInfo.network]: {
        ...state.txs[state.chainInfo.network],
        ...action.payload
      }
    }
  },
  updatePendingTxHashes: (state, action) => {
    state.pendingTxHashes = action.payload
  },
  setBidTxHash: (state, action) => {
    state.lastBidTxHash = action.payload
  }
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// const connectWallet = createAsyncThunk('gameData/fetchCurrentBlock', async ({walletProviderId}) => {
//   const latestBlock = await getWeb3LatestBlock()
//   return latestBlock.number
// })

const updateAddress = createAsyncThunk('wallet/updateAddress', async ({ address }, thunkAPI) => {
  const { dispatch } = thunkAPI
  try {
    const username = (await getUsername(address)) || getThreeDotAddress(address)
    return { username, address: address.toLowerCase() }
  } catch (err) {
    console.error(`ERROR: "updateAddress" action in Redux fails: ${err}`)
  }
})
const updateTokenInfo = createAsyncThunk('wallet/updateTokenInfo', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI
  /*
    import { cryptoToWei, soliditySha3 } from 'utils'
    const getYTKNLocalKey = (address) => soliditySha3(address, gameContractData.address.toLowerCase())
    const [tokensApprovals, setTokenApprovals] = useLocalStorage(YOLO_TOKEN_APPROVAL)
  */
  const state = thunkAPI.getState()
  const gameId = state.gameData.gameId
  const [tokenContractData, gameContractData] = getSmartContractsInfo(['token', gameId])
  try {
    const isTokenApproved = await isPolygonTokenApproved(tokenContractData, gameContractData.address.toLowerCase())
    if (!isTokenApproved) {
      dispatch(
        notificationActions.updateModal({
          id: 'tokenApproval',
          show: true,
          priority: 2,
          backdropClose: false
        })
      )
    }
    return isTokenApproved
  } catch (err) {
    console.error(`ERROR: "updateTokenInfo" action in Redux fails: ${err}`)
  }
})
const updateNftInfo = createAsyncThunk('wallet/updateNftInfo', async ({ address, useClaimBanner }, thunkAPI) => {
  const { dispatch } = thunkAPI
  const bannerId = 'nftWaitList'
  const modalId = 'nftNeeds'
  try {
    dispatch(notificationActions.clearBanner(bannerId))
    dispatch(notificationActions.clearModal(modalId))
    const { hasNFT, waitlistInfo } = await checkHasNFTWaitlistId(address.toLowerCase())
    const claimExpirationTime = Number(await getClaimExpirationTime(address.toLowerCase()))
    if (!hasNFT) {
      if (waitlistInfo.waitlistId) {
        useClaimBanner &&
          dispatch(
            notificationActions.updateBanner({
              show: true,
              id: bannerId
            })
          )
      } else {
        dispatch(
          notificationActions.updateModal({
            id: modalId,
            show: true,
            priority: 3,
            backdropClose: false
          })
        )
      }
    }
    return { hasNFT, waitlistInfo, claimExpirationTime }
  } catch (err) {
    console.error(`ERROR: "updateNftInfo" action in Redux fails: ${err}`)
  }
})
const updateBalance = createAsyncThunk('wallet/updateBalance', async (paramObj, thunkAPI) => {
  /**
   * paramObj = {address}
   */
  const state = thunkAPI.getState()
  const { address } = paramObj || { address: state.wallet.address }
  try {
    const userBalance = await getUserContractBalance(address)
    const tokenBalance = await getYoloTokenContractBalance(address)
    return { userBalance, tokenBalance }
  } catch (err) {
    console.error(`ERROR: "updateBalance" action in Redux fails: ${err}`)
  }
})

const updateYoloEarnings = createAsyncThunk('wallet/updateYoloEarnings', async ({ address, thunkAPI }) => {
  const [NftTracker, YoloNFT] = getSmartContractsInfo(['NftTracker', 'yoloNft'])
  const botStats = await getBotBidStats(NftTracker, YoloNFT)
  const tokenIndex = await getNftTokenIndex({ params: { senderAddress: address, index: 0 } }, {})

  const nftData = await getNftTrackerData({ params: { tokenIndex } }, {})
  const individualBidCount = nftData?.bidCount || 0
  const individualCumBidAmount = new BigNumber(nftData.cumulativeBidAmount || 0)
  const individualFraction = individualCumBidAmount.times(0.3).plus(new BigNumber(individualBidCount).times(0.7))
  const cumulativeStats = await axios.post(`${yoloApiBaseUrl}/get-bid-stats`, {})
  let data = JSON.parse(cumulativeStats.data.body)[0]

  const totalBidCount = +data.totalbidcount - botStats.botBidCount
  const cumulativeBidAmount = new BigNumber(data.cumulativebidamount).minus(botStats.botBidAmount)
  let bidsFraction = cumulativeBidAmount.times(0.3).plus(new BigNumber(totalBidCount).times(0.7))
  let yoloEarned = individualFraction.times(500000).dividedBy(bidsFraction).toFixed(0)
  // console.log('yoloEarned =>', yoloEarned)
  if (isNaN(yoloEarned)) {
    yoloEarned = '0'
  }
  const web3utils = getWeb3Utils()
  return web3utils.toWei(yoloEarned)
})

const connectWallet = createAsyncThunk(
  'wallet/connect',
  async ({ walletProviderId, fullConnection = true }, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    let txs = {}
    if (!walletProviderId) {
      const walletSelectorObj = {
        show: true,
        id: 'walletSelector',
        props: {
          fullConnection: false
        },
        backdropClose: false
      }
      dispatch(notificationActions.updateModal(walletSelectorObj))
      return
    }
    const updateAccount = (chainInfo, address) => {
      if (config.CHAIN_DICT[chainInfo?.network.toLowerCase()]?.chainId !== chainInfo.chainId) {
        dispatch(
          notificationActions.updateModal({
            id: 'changeNetwork',
            show: true,
            priority: 1,
            backdropClose: false
          })
        )
        return
      }
      // Check local TXS state
      if (chainInfo?.network) {
        const txs = localTxActions.getTxs(chainInfo.network)
        const txsArray = Object.values(txs || {})
        const pendingTxs = txsArray.filter((txInfo) => txInfo.isConfirmed === false)
        if (pendingTxs.length > 0) {
          const pendingTxHashes = pendingTxs.map((txInfo) => txInfo.hash)
          dispatch(walletReducerActions.updatePendingTxHashes(pendingTxHashes))
          dispatch(
            pullingTxInfo({
              onFailed: (txData) => {
                const state = getState()
                const txHash = txData.hash
                // const bidId = `${gameHexId}-${bidRoundIndex}-${txHash}`
                const txInfo = state.wallet?.txs?.[chainInfo.network]?.[txHash]
                const updatedTxInfo = { ...txInfo, status: 'failed' }

                const payload = { [txHash]: { ...updatedTxInfo } }
                localTxActions.updateTx(chainInfo.network, payload)
                dispatch(walletReducerActions.updateTx(payload))
              }
            })
          )
        }
      }
      dispatch(notificationActions.clearModal('all'))
      fullConnection && dispatch(updateTokenInfo())
      dispatch(updateAddress({ address }))
      dispatch(updateNftInfo({ address, useClaimBanner: fullConnection }))
      dispatch(updateBalance({ address }))
      dispatch(updateYoloEarnings({ address }))
      dispatch(walletReducerActions.setChainInfo(chainInfo))
    }
    const providerEventListenerObj = {
      onAccountChanged: ({ chainInfo, address, balance }) => {
        address && updateAccount(chainInfo, address)
        !address && dispatch(walletReducerActions.clearConnection())
      },
      onChainChanged: ({ chainInfo, address, balance }) => {
        updateAccount(chainInfo, address)
      },
      onDisconnect: (code, reason) => {}
    }
    try {
      const res = await connectWalletWith(walletProviderId)
      if (!res.chainInfo?.networkType) {
        console.error('ERROR: Connection fails, non valid chain info returned')
      }
      if (res.address) {
        const { chainInfo, address } = res
        updateAccount(chainInfo, address)
        txs = localTxActions.getTxs()
      }
      const isInstalled = res.isInstalled
      const isCompatible = res.isCompatible
      //TODO - ACZ: dispatch here the notification to show the corresponding modal

      // Register connection state in localstorge
      const walletSessionInfo = { walletProviderId }
      window.localStorage.setItem(LOCAL_WALLET_ID, JSON.stringify(walletSessionInfo))
      const isTestnet = res.chainInfo?.networkType === 'testnet' || true
      walletProviderSubscribe(providerEventListenerObj)
      return { providerInfo: res.providerInfo, txs }
    } catch (err) {
      //ACZ: We can dispatch some notification (toast?) to inform about the failure here
      console.error(`ERROR: "connectWallet" action in Redux fails: ${err}`)
      throw `ERROR: "connectWallet" action in Redux fails: ${err}`
    }
  }
)

/*Actions helpers for manage store on trackTx dispatch*/
const removePendingTxHash = (txHash) => async (dispatch, getState) => {
  const state = getState()
  const pendingTxHashes = state.wallet?.pendingTxHashes || []
  const updatedTxHashes = pendingTxHashes.filter((item) => item !== txHash)
  dispatch(walletReducerActions.updatePendingTxHashes(updatedTxHashes))
}

const updateTxInfo = (txInfo, confirmations) => async (dispatch, getState) => {
  const state = getState()
  const network = state.wallet.chainInfo?.network
  const gameId = state.gameData?.gameId
  const minConfirmations = config.MIN_CONFIRMATIONS
  const { hash: txHash } = txInfo
  let status, isConfirmed
  if (network && gameId) {
    if (confirmations >= minConfirmations) {
      status = 'confirmed'
      isConfirmed = true
    }
    const txInfo = state.wallet?.txs?.[network]?.[txHash]
    const payload = { [txInfo.hash]: { ...txInfo, confirmations, gameId, status, isConfirmed } }
    localTxActions.updateTx(network, payload)
    dispatch(walletReducerActions.updateTx(payload))
  }
}

const pullingTxInfo = createAsyncThunk('wallet/updateTxsInfo', async (eventCB = {}, thunkAPI) => {
  const { dispatch, getState } = thunkAPI
  const state = getState()
  const pendingTxHashes = state.wallet.pendingTxHashes || []
  let prevConfirmations = 0
  const trackTx = (txHash, eventCB) => {
    const minConfirmations = config.MIN_CONFIRMATIONS
    const { onConfirmation, onConfirmed, onFailed } = eventCB
    setTimeout(async () => {
      try {
        const currentBlock = getState().priceFeed.currentBlock
        const txInfo = await getTxInfo(txHash).catch((err) => {
          throw err
          console.log('ACZ ERROR -->', err)
        })
        const txBlockNumber = txInfo?.blockNumber || null
        const txConfirmations = txBlockNumber === null ? 0 : currentBlock - txBlockNumber
        if (txConfirmations > prevConfirmations) {
          dispatch(updateTxInfo(txInfo, txConfirmations))
          onConfirmation && onConfirmation(txInfo, txConfirmations)
          prevConfirmations = txConfirmations
        }
        if (txConfirmations >= minConfirmations) {
          dispatch(removePendingTxHash(txHash))
          onConfirmed && onConfirmed(txHash)
          return
        }
        if (txInfo?.status === false) {
          dispatch(removePendingTxHash(txHash))
          onFailed && onFailed(txInfo)
          return
        }
        // Recursive call
        return trackTx(txHash, eventCB)
      } catch (err) {
        dispatch(removePendingTxHash(txHash))
        if (!onFailed) {
          throw new Exception('4050', `'pullingTxInfo' has failed`)
        } else {
          onFailed && onFailed()
          return
        }
      }
    }, config.TX_PULLING_TIMEOUT)
  }
  pendingTxHashes.map((txHash) => trackTx(txHash, eventCB))
})

export const walletExtraReducer = {
  connectWallet,
  updateAddress,
  updateTokenInfo,
  updateNftInfo,
  updateBalance,
  updateYoloEarnings,
  pullingTxInfo
}
