import React from 'react'

import { MobileComingSoonModal } from './MobileComingSoon.Modal'
import { WalletSelectorModal } from './WalletSelector.Modal'
import { UserAccountModal } from './UserAccount.Modal'
import { LeaderboardModal } from './Leaderboard.Modal'
import { WalletModal } from './Wallet.Modal'
import { NFTNeedModal } from './NFTNeed.Modal'
import { ApprovalModal } from './Approval.Modal'
import { BidResultModal } from './BidResult.Modal'
import { InstallMetamaskModal } from './InstallMetamask.Modal'
import { IncompatibleBrowserModal } from './IncompatibleBrowser.Modal'
import { ChangeNetworkModal } from './ChangeNetwork.Modal'
import { BiddingModal } from './Bidding.Modal'

const MODAL_DICT = {
  mobileComingSoon: <MobileComingSoonModal />,
  leaderboard: <LeaderboardModal />,
  walletSelector: <WalletSelectorModal />,
  userAccount: <UserAccountModal />,
  wallet: <WalletModal />,
  nftNeeds: <NFTNeedModal />,
  tokenApproval: <ApprovalModal />,
  bidResult: <BidResultModal />,
  installMetamask: <InstallMetamaskModal />,
  incompatibleMetamask: <IncompatibleBrowserModal />,
  changeNetwork: <ChangeNetworkModal />,
  bidding: <BiddingModal />
}

export const ModalLib = ({ modalId, ...modalProps }) => {
  const selectedModal = MODAL_DICT[modalId] || null
  const composedModal = selectedModal && React.cloneElement(selectedModal, { ...modalProps })

  return composedModal
}
