import { createSelector } from '@reduxjs/toolkit'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * Wallet
 */

export const selectUsername = () => (state) => state.wallet.username
export const selectWalletAddress = () => (state) => state.wallet.address
export const selectWalletConnectionState = () => (state) => state.wallet.isConnected
export const selectWalletProviderInfo = () => (state) => state.wallet.providerInfo
export const selectYoloEarning = () => (state) => state.wallet.yoloEarnings
export const selectChainInfo = () => (state) => state.wallet.chainInfo
export const selectWalletHasNFT = () => (state) => state.wallet.hasNFT
export const selectTokenApproval = () => (state) => state.wallet.isTokenApproved
export const selectAvailableNetworkIds = () => (state) => state.wallet.approvedNetworkIds
export const selectBalanceStatus = () => (state) => state.wallet.balanceStatus
export const selectClaimExpirationTime = () => (state) => state.wallet.claimExpirationTime
export const selectHasPendingTx = () =>
  createSelector(
    (state) => state.wallet.pendingTxHashes,
    (pendingTxHashes) => !!pendingTxHashes.length
  )
export const selectWalletTxs = () =>
  createSelector(
    (state) => state.wallet.txs,
    selectChainInfo(),
    (txs, chainInfo) => {
      const { network, scannerTemplate } = chainInfo || {}
      const selectedTxs = txs[network] || {}
      const txList = Object.values(selectedTxs).map((item) => {
        return {
          ...item,
          txScanUrl: scannerTemplate.replace('[hashAddress]', item.hash)
        }
      })
      return txList.sort((a, b) => b.timestamp - a.timestamp)
    }
  )
export const selectWaitListInfo = () => (state) =>
  createSelector(
    (state) => state.wallet.waitlistInfo.waitlistId,
    (state) => state.wallet.waitlistInfo.total,
    (waitlistId, total) => ({ waitlistId, total })
  )(state)

//Selectors with Arguments
export const selectWalletsInfo = (id) => (state) =>
  createSelector(
    (state) => state.wallet.availableWalletsInfo,
    (state, id) => id,
    (availableWalletsInfo, idd) => {
      if (idd) {
        return availableWalletsInfo.filter((walletInfo) => walletInfo.id === id)
      }
      return availableWalletsInfo
    }
  )(state, id)
export const selectWalletBalance = (token) => (state) =>
  createSelector(
    (state) => state.wallet.tokenBalance,
    (state) => state.wallet.userBalance,
    (_, token) => token || 'YOLO',
    (tknBalance, usrBalance, token) => {
      const tokenBalance = tknBalance[token]
      const userBalance = usrBalance[token]
      const totalBalance = tokenBalance + userBalance
      return { totalBalance, tokenBalance, userBalance }
    }
  )(state, token)
