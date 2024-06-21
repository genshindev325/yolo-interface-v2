import Web3 from 'web3'
import { isSafari, isMobileSafari } from 'react-device-detect'

export const walletInfo = {
  id: 'metamask',
  name: 'MetaMask',
  iconProps: { collection: 'crypto', name: 'metamask' },
  url: 'https://metamask.io/',
  props: {
    isEnableOnMobile: false,
    canUiSwitchChain: true
  }
}

const isWalletInstalled = () => Boolean(window.ethereum && window.ethereum.isMetaMask)

const connect = async () => {
  let web3Provider = {
    isInstalled: false,
    isCompatible: !(isSafari || isMobileSafari)
  }
  if (isWalletInstalled()) {
    window.yoloWeb3 = new Web3(window.ethereum)
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      return {
        ...web3Provider,
        isInstalled: true
      }
    } catch (err) {
      //TODO:: (ACZ) - define error Status and responses
      console.error(err)
    }
  }
  return web3Provider
}

const switchChain = async (chainId) => {
  if (isWalletInstalled) {
    const ethereum = window.ethereum
    const chainHex = `0x${chainId.toString(16)}`
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }]
      })
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: chainHex, rpcUrl: 'https://...' /* ... */ }]
          })
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }
}

export const metamaskService = {
  walletInfo,
  isWalletInstalled,
  connect,
  switchChain
}
