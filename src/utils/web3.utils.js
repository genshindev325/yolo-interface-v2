import { get } from 'lodash'
import Web3 from 'web3'
import { CHAIN_DICT } from 'config/network.config'
import { Exception } from 'utils'

const EMPTY_CHAIN = { name: '', shortName: '', currency: '', network: 'ethereum', chainId: 0 }

/* prettier-ignore */
/* export const CHAIN_DICT = {
  1: {
    name: 'Ethereum Mainnet',
    shortName: 'eth',
    currency: 'ETH',
    network: 'Ethereum',
    chainId: 1,
    networkType: 'mainnet',
    scannerTemplate: 'https://etherscan.io/tx/[hashAddress]'
  },
  3: {
    name: 'Ethereum Testnet Ropsten',
    shortName: 'rop',
    currency: 'ETH',
    network: 'Ethereum',
    chainId: 3,
    networkType: 'testnet',
    scannerTemplate: '[hashAddress]'
  },
  42: {
    name: 'Ethereum Testnet Kovan',
    shortName: 'kov',
    currency: 'ETH',
    network: 'Ethereum',
    chainId: 42,
    networkType: 'testnet',
    scannerTemplate: '[hashAddress]'
  },
  4: {
    name: 'Ethereum Testnet Rinkeby',
    shortName: 'rin',
    currency: 'ETH',
    network: 'Ethereum',
    chainId: 4,
    networkType: 'testnet',
    scannerTemplate: '[hashAddress]'
  },
  5: {
    name: 'Ethereum Testnet Goerli',
    shortName: 'ogor',
    currency: 'ETH',
    network: 'Ethereum',
    chainId: 5,
    networkType: 'testnet',
    scannerTemplate: 'https://goerli.etherscan.io/tx/[hashAddress]'
  },

  80001: {
    name: 'Matic Testnet Mumbai',
    shortName: 'maticmum',
    currency: 'MATIC',
    network: 'Polygon',
    chainId: 80001,
    networkType: 'testnet',
    scannerTemplate: 'https://mumbai.polygonscan.com/tx/[hashAddress]'
  },
  137: {
    name: 'Matic Mainnet',
    shortName: 'matic',
    currency: 'MATIC',
    network: 'Polygon',
    chainId: 137,
    networkType: 'mainnet',
    scannerTemplate: 'https://polygonscan.com/tx/[hashAddress]'
  }
} */

export const chainInfoSelector = (chainId) => {
  let id = chainId
  if (typeof chainId === 'string' && chainId.substr(0, 2) === '0x') {
    id = parseInt(chainId)
  }

  return CHAIN_DICT[id] || EMPTY_CHAIN
}

export const getWeb3 = () => {
  const web3 = window.yoloWeb3
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    return web3
  }
  throw new Exception(4001, 'connect a wallet to continue')
}
export const getDefaultAddress = () => {
  const web3 = getWeb3()
  return web3.eth.defaultAccount
}

const web3Utils = new Web3().utils

export const weiToCrypto = (amountInWei) => web3Utils.fromWei(`${amountInWei}`)
export const cryptoToWei = (amountInCrypto) => web3Utils.toWei(`${amountInCrypto}`)
export const soliditySha3 = web3Utils.soliditySha3
export const getWeb3Utils = () => web3Utils

export const getTxInfo = async (txHash) => {
  try {
    const web3 = getWeb3() //new Web3('https://rpc-mumbai.matic.today') //
    if (web3 && web3.eth) {
      const txInfo = await web3.eth.getTransaction(txHash)
      const txReceipt = await web3.eth.getTransactionReceipt(txHash)
      const status = txReceipt?.status
      return { ...txInfo, status, receipt: txReceipt }
    } else {
      throw new Exception(4001, 'connect a wallet to continue')
    }
  } catch (err) {
    console.error(`ERROR: "getTxInfo" fails: ${err}`)
    throw err
  }
}
