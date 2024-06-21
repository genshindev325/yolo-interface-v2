import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { NETWORKS_RPC } from 'config/network.config'

export const walletInfo = {
  id: 'trustWallet',
  name: 'Trust',
  iconProps: { collection: 'crypto', name: 'trustWallet' },
  url: 'https://trustwallet.com/',
  props: {
    isEnableOnMobile: true,
    canUiSwitchChain: false
  }
}

const isWalletInstalled = () => Boolean(window.yoloWeb3 && window.yoloWeb3.currentProvider.wc)

const connect = async () => {
  let web3Provider = {
    isInstalled: false,
    isCompatible: true
  }
  const provider = new WalletConnectProvider({
    rpc: NETWORKS_RPC,
    qrcodeModalOptions: {
      mobileLinks: ['trust']
    }
  })
  window.yoloWeb3 = new Web3(provider)
  try {
    await provider.enable()
    return {
      ...web3Provider,
      isInstalled: true
    }
  } catch (err) {
    //TODO:: (ACZ) - define error Status and responses
    console.log('Yog 1 => ', err)
  }
  return web3Provider
}

export const trustWalletService = {
  walletInfo,
  isWalletInstalled,
  connect
}
