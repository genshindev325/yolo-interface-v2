import { get } from 'lodash'

import { chainInfoSelector } from 'utils'

import { getYoloBalance, getUserBalance } from '../contracts'
import { metamaskService } from './metamask.service'
import { walletConnectService } from './wallet-connect.service'
import { trustWalletService } from './trust-wallet.service'
import { getWeb3 } from '../../../utils/web3.utils'

const YOLO = 'YOLO'

const REGISTERED_PROVIDERS = {
  [metamaskService.walletInfo.id]: metamaskService,
  [trustWalletService.walletInfo.id]: trustWalletService,
  [walletConnectService.walletInfo.id]: walletConnectService
}

export const walletsInfo = [metamaskService.walletInfo, trustWalletService.walletInfo, walletConnectService.walletInfo]

export const isMetamaskInstalled = () => metamaskService.isWalletInstalled()

export const connectWalletWith = async (walletProvider) => {
  const provider = REGISTERED_PROVIDERS[walletProvider]
  const providerInfo = walletsInfo.find((wInfo) => wInfo.id === walletProvider)
  const { isInstalled, isCompatible } = await provider.connect()
  if (window.yoloWeb3) {
    window.yoloWeb3.yoloApp = {
      connectedWalletId: providerInfo.id
    }
  }

  const [address, chainInfo, balance] = await Promise.all([getAccount(), getChainInfo(), getYoloTokenContractBalance()])
  return {
    isInstalled,
    isCompatible,
    address,
    balance,
    providerInfo,
    ...chainInfo
  }
}

export const walletProviderSubscribe = async (eventListenerObj) => {
  const { onAccountChanged, onChainChanged, onDisconnect } = eventListenerObj
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const provider = web3.currentProvider
      provider.on('accountsChanged', async (accounts) => {
        const address = accounts[0]
        web3.eth.defaultAccount = address
        const balance = await getYoloTokenContractBalance()
        const { chainInfo } = await getChainInfo()
        onAccountChanged && onAccountChanged({ chainInfo, address, balance })
      })
      provider.on('chainChanged', async (chainId) => {
        const chainInfo = chainInfoSelector(chainId)
        const address = await getAccount()
        const balance = await getYoloTokenContractBalance()
        onChainChanged && onChainChanged({ chainInfo, address, balance })
      })
      provider.on('disconnect', (code, reason) => {
        onDisconnect && onDisconnect(code, reason)
      })
    } catch (err) {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.')
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getAccount = async (cb) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const accounts = await web3.eth.getAccounts()
      const defaultAccount = accounts[0]
      web3.eth.defaultAccount = defaultAccount
      cb && cb(defaultAccount)
      return defaultAccount
    } catch (err) {
      if (err.code === 4001) {
        console.warn(`Please connect to ${yoloAppInfo.connectedWalletId}.`)
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getYoloTokenContractBalance = async (address) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const { chainInfo } = await getChainInfo()
      const network = chainInfo.network
      const account = address || web3.eth.defaultAccount
      if (network === 'Polygon') {
        const balanceData = await getYoloBalance(account)
        return { [YOLO]: Number(balanceData) }
      }
      return { [YOLO]: 0 }
    } catch (err) {
      if (err.code === 4001) {
        console.log(`Please connect to ${yoloAppInfo.connectedWalletId}.`)
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getUserContractBalance = async (address) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const { chainInfo } = await getChainInfo()
      const network = chainInfo.network
      const account = address || web3.eth.defaultAccount
      if (network === 'Polygon') {
        const balanceData = await getUserBalance(account)
        return { [YOLO]: Number(balanceData) }
      }
      return { [YOLO]: 0 }
    } catch (err) {
      if (err.code === 4001) {
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const getChainInfo = async () => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const chainId = await web3.eth.net.getId()
      const chainInfo = chainInfoSelector(chainId)
      const newChainInfo = { chainInfo }
      return newChainInfo
    } catch (err) {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.')
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}

export const switchChain = async (chainId) => {
  const web3 = getWeb3()
  const walletProvider = get(web3, 'yoloApp.connectedWalletId', null)
  const provider = REGISTERED_PROVIDERS[walletProvider]
  console.log('SwitchChain => ', provider)
  if (walletProvider && provider?.walletInfo?.props?.canUiSwitchChain) {
    provider.switchChain(chainId)
  }
}

export const getTransactionInfo = async (txHash) => {
  const web3 = getWeb3()
  const yoloAppInfo = get(web3, 'yoloApp', null)
  if (yoloAppInfo) {
    try {
      const txInfo = await web3.eth.getTransaction(txHash)
      return txInfo
    } catch (err) {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.')
      } else {
        //TODO:: (ACZ) - define error Status and responses
        console.error(err)
      }
    }
  }
}
