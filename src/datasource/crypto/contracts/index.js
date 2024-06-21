import axios from 'axios'
import BigNumber from 'bignumber.js'

import { config } from 'config'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { getWeb3, Exception, getWeb3Utils, getDefaultAddress } from 'utils'
import { TX_TYPE } from 'utils/constants'

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

const { MIN_CONFIRMATIONS, UINT256_MAX } = config

// TX event listener functions
// const onTransactionHash = (from, hash, txParams, txType, eventListenersCb) => {
//   const onTransactionHash = get(eventListenersCb, 'onTransactionHash', null)
//   onTransactionHash && onTransactionHash({ from, hash, txParams, txType })
// }
// const onConfirmation = async (confirmationNumber, receipt, txParams, txType, eventListenersCb) => {
//   const web3 = getWeb3()
//   if (web3 && web3.eth) {
//     const onConfirmation = get(eventListenersCb, 'onConfirmation', null)
//     const { transactionHash, from, blockNumber } = receipt
//     const txBlockInfo = await web3.eth.getBlock(blockNumber)
//     const payload = {
//       hash: transactionHash,
//       from,
//       confirmations: confirmationNumber,
//       isConfirmed: confirmationNumber >= MIN_CONFIRMATIONS,
//       status: confirmationNumber >= MIN_CONFIRMATIONS ? 'confirmed' : 'pending',
//       timestamp: txBlockInfo?.timestamp,
//       txParams,
//       txType
//     }
//     onConfirmation && onConfirmation(payload)
//   }
// }
// const onError = async (error, txParams, txType, eventListenersCb) => {
//   const web3 = getWeb3()
//   const receipt = error.receipt
//   if (web3 && web3.eth && receipt) {
//     const onError = get(eventListenersCb, 'onError', null)
//     const { transactionHash, from, blockNumber } = receipt
//     const txBlockInfo = await web3.eth.getBlock(blockNumber)
//     const payload = {
//       hash: transactionHash,
//       from,
//       isConfirmed: false,
//       status: 'failed',
//       timestamp: txBlockInfo?.timestamp,
//       txParams,
//       txType
//     }
//     onError && onError(payload)
//   }
// }

export const getYoloBalance = async (address, eventsCB) => {
  //TODO - auto add token to metamask
  //TODO: store all values in wei in BN format until display
  try {
    const [YoloTokenContractInfo] = getSmartContractsInfo(['token'])
    const web3Utils = getWeb3Utils()
    if (YoloTokenContractInfo?.address) {
      const params = {
        address
      }
      const balanceInWei = await callContractMethod(
        {
          contractInfo: YoloTokenContractInfo,
          method: 'balanceOf',
          params,
          txType: TX_TYPE.GET_ADDRESS_TOKEN_BALANCE
        },
        eventsCB
      ).catch((err) => {
        throw err
      })
      const balance = web3Utils.fromWei(balanceInWei)
      return balance
    }
    return '0'
  } catch (err) {
    console.error(`ERROR: "getYoloBalance" fails: ${err}`)
    return '0'
  }
}

export const getUserBalance = async (address, eventsCB) => {
  //TODO - auto add token to metamask
  //TODO: store all values in wei with BN format until display
  try {
    const [UsersContractInfo] = getSmartContractsInfo(['users'])
    const web3Utils = getWeb3Utils()
    if (UsersContractInfo?.address) {
      const params = {
        address
      }
      const balanceInWei = await callContractMethod(
        {
          contractInfo: UsersContractInfo,
          method: 'userBalances',
          params,
          txType: TX_TYPE.GET_ADDRESS_TOKEN_BALANCE
        },
        eventsCB
      ).catch((err) => {
        throw err
      })
      const balance = web3Utils.fromWei(balanceInWei)
      return balance
    }
    return '0'
  } catch (err) {
    console.error(`ERROR: "getUserBalance" fails: ${err}`)
    return '0'
  }
}

export const checkHasNFTWaitlistId = async (address, eventsCB) => {
  try {
    const [YoloNftInfo] = getSmartContractsInfo(['yoloNft'])
    if (YoloNftInfo?.address) {
      const params = {
        address
      }
      const NftBalance = await callContractMethod(
        {
          contractInfo: YoloNftInfo,
          method: 'balanceOf',
          params,
          txType: TX_TYPE.GET_NFT_BALANCE
        },
        eventsCB
      ).catch((err) => {
        throw err
      })
      const waitlistResponse = await axios.post(`${yoloApiBaseUrl}/addtowaitlist`, {
        address,
        checkInWaitList: true
      })
      const { waitlistId, total } = JSON.parse(waitlistResponse.data.body) || {}
      if (NftBalance > 0) {
        return { hasNFT: true, waitlistInfo: { waitlistId: waitlistId > 0 ? waitlistId : null, total } }
      } else {
        return { hasNFT: false, waitlistInfo: { waitlistId: waitlistId > 0 ? waitlistId : null, total } }
      }
    }
  } catch (err) {
    console.error(`ERROR: "checkHasNFTWaitlistId" fails: ${err}`)
    return { hasNFT: false, waitlistId: null }
  }
}

export const getUsername = async (address, eventsCB) => {
  try {
    const [UsersContractInfo] = getSmartContractsInfo(['users'])
    const web3Utils = getWeb3Utils()
    if (UsersContractInfo?.address) {
      if (!address) {
        throw new Exception('-32602', 'address is not defined')
      }
      const params = {
        address: address.toLowerCase()
      }
      const hexUsername = await callContractMethod(
        {
          contractInfo: UsersContractInfo,
          method: 'userNames',
          params,
          txType: TX_TYPE.GET_USERNAME
        },
        eventsCB
      ).catch((err) => {
        throw err
      })
      const isHexUsernameEmpty = hexUsername === '0x0000000000000000000000000000000000000000000000000000000000000000'
      const username = (!isHexUsernameEmpty && web3Utils.hexToAscii(hexUsername)) || ''
      return username.replace(/\0/g, '') // remove null characters
    }
    return ''
  } catch (err) {
    console.error(`ERROR: "getUsername" fails: ${err}`)
    return ''
  }
}

/**
 * This Function checks if the token you are trying to use in Polygon is Approved
 * @param {*} tokenContractInfo {abi, address}
 * @param {number} amountInCrypto
 * @returns boolean
 */
export const isPolygonTokenApproved = async (tokenContractInfo, spenderAddress, amountInCrypto = 0, eventsCB) => {
  try {
    const from = getDefaultAddress()
    if (from) {
      const params = { from, spender: spenderAddress }
      const amountAllowed = await callContractMethod(
        {
          contractInfo: tokenContractInfo,
          method: 'allowance',
          params,
          txType: TX_TYPE.CHECK_ALLOWANCE
        },
        eventsCB
      ).catch((err) => {
        throw err
      })
      if (!amountAllowed) {
        return false
      }
      return Boolean(amountInCrypto < amountAllowed)
    }
    return false
  } catch (err) {
    console.error(`ERROR: "isPolygonTokenApproved" fails: ${err}`)
    return false
  }
}

export const getBotBidStats = async (NftTracker, YoloNFT) => {
  const botAddresses = [
    '0x12b20AE1451141E03eD9c226F3234c2caeFd5C94',
    '0xC7f8FB66853200e5aF2E46B005845aFb5151e5Ba',
    '0x1bD9a12DB9a220a8C25585257f2D32C014622281',
    '0x02A47022e479427b97De27a6Dc4cDCc18F539F6F',
    '0x39706F7E75Ff0d993117D49B5A2dDD086DB300eA',
    '0x8498471336D2e8A0221d97104fb2D205a8D257b3',
    '0xdD9289af5E6356cCBdf30DE9A458Ca447F853B81',
    '0x5bECea4D93745317E44d8032409504aae103aD1a',
    '0xA7123594D420c927F3098D2EEF5cFfF371B349b7',
    '0x22dbd6A571Ee4442C94b1b961bECfa2D3461C309'
  ]

  let totalBidCount = 0
  let totalBidAmount = new BigNumber(0)

  for (let i = 0; i < botAddresses.length; i++) {
    const botAddr = botAddresses[i]
    const tokenIndex = await getNftTokenIndex({ params: { senderAddress: botAddr, index: 0 } }, {})

    const nftData = await getNftTrackerData({ params: { tokenIndex } }, {})

    // console.log('NFT DAta =>', nftData)

    totalBidCount += +nftData?.bidCount || 0
    totalBidAmount = totalBidAmount.plus(new BigNumber(nftData.cumulativeBidAmount || 0))
  }

  // console.log('Total Bot Bid Count =>', totalBidCount)
  // console.log('totalBidAmount =>', totalBidAmount.toString())

  return { botBidCount: totalBidCount, botBidAmount: totalBidAmount }
}

export const getNftTokenIndex = async (txData, eventsCB) => {
  const { params } = txData
  try {
    const [YoloNFTContractInfo] = getSmartContractsInfo(['yoloNft'])
    if (YoloNFTContractInfo?.address) {
      let index = null
      const params1 = { senderAddress: params.senderAddress }
      const NFTBalanceStr = await callContractMethod({
        contractInfo: YoloNFTContractInfo,
        method: 'balanceOf',
        params: params1,
        txType: TX_TYPE.GET_NFT_BALANCE
      }).catch((err) => {
        throw err
      })
      const NFTBalance = Number(NFTBalanceStr)
      if (NFTBalance) {
        index = await callContractMethod(
          {
            contractInfo: YoloNFTContractInfo,
            method: 'tokenOfOwnerByIndex',
            params,
            txType: TX_TYPE.GET_NFT_INDEX
          },
          eventsCB
        ).catch((err) => {
          throw err
        })
      }
      return index
    }
  } catch (err) {
    console.error(`ERROR: "getNftTokenIndex" fails: ${err}`)
    throw err
  }
}

export const getNftTrackerData = async (txData, eventsCB) => {
  const { params } = txData
  try {
    const [NftTrackerContractInfo] = getSmartContractsInfo(['NftTracker'])

    if (NftTrackerContractInfo?.address && txData.params?.tokenIndex) {
      let nftData = {}
      //const params = {}
      nftData = await callContractMethod(
        {
          contractInfo: NftTrackerContractInfo,
          method: 'nftTrackingMap',
          params,
          txType: TX_TYPE.GET_NFT_DATA
        },
        eventsCB
      ).catch((err) => {
        throw err
      })
      return nftData
    }
  } catch (err) {
    console.error(`ERROR: "getNftTrackerData" fails: ${err}`)
    throw err
  }
}

export const getClaimExpirationTime = async (address, eventsCB) => {
  try {
    const [nftClaimsContractInfo] = getSmartContractsInfo(['NftClaims'])
    const params = {
      address: address
    }
    const res = await callContractMethod(
      {
        contractInfo: nftClaimsContractInfo,
        method: 'claimeesRegister',
        params,
        txType: TX_TYPE.CLAIM_NFT
      },
      eventsCB
    ).catch((err) => {
      throw err
    })
    //SUGGESTION: ACZ - we can add here more info to the user in a toast
    return res
  } catch (err) {
    console.error(`ACZ ERROR: "registerForClaimNFT" action fails: ${err}`)
    throw err
  }
}

//generic Contract methods exec
export const callContractMethod = async (txData, eventsCB = {}) => {
  const { onReceipt, onError } = eventsCB
  try {
    const { contractInfo, method, params, txType } = txData
    const web3 = getWeb3()
    if (web3 && web3.eth) {
      const PolygonContract = new web3.eth.Contract(contractInfo.abi, contractInfo.address)
      const contractMethod = PolygonContract.methods[method]
      const methodParams = Object.values(params)
      const receipt = await contractMethod(...methodParams).call()
      onReceipt && onReceipt(receipt)
      return receipt
    }
  } catch (err) {
    onError && onError()
    if (!onError) {
      throw new Exception('4002', `${txData.txType} has failed`)
    }
  }
}

export const sendContractMethod = async (txData, eventsCB) => {
  const { onTransactionHash, onError } = eventsCB
  try {
    const { contractInfo, method, params, txType } = txData
    const web3 = getWeb3()
    if (web3 && web3.eth) {
      const PolygonContract = new web3.eth.Contract(contractInfo.abi, contractInfo.address)
      const from = web3.eth.defaultAccount.toLowerCase()
      const contractMethod = PolygonContract.methods[method]
      const methodParams = Object.values(params)
      Object.assign(params, { method, currency: 'YOLO' })

      const feeObject = await axios.get('https://gasstation-mainnet.matic.network/v2')
      let maxPriorityFeePerGas
      // Choosing fast gas fees by default for now.
      if (feeObject)
        maxPriorityFeePerGas = new BigNumber(feeObject.data.fast.maxPriorityFee).times(1000000000).toFixed(0)
      else maxPriorityFeePerGas = new BigNumber(40).times(1000000000).toFixed(0)

      const receipt = await contractMethod(...methodParams)
        .send({ from, maxPriorityFeePerGas })
        .on('transactionHash', async (hash) => {
          onTransactionHash && onTransactionHash({ from, hash, txParams: params, txType })
          return
        })
      return receipt
    }
  } catch (err) {
    onError && onError()
    if (!onError) {
      throw new Exception('4001', `${txData.txType} has failed`)
    }
  }
}
