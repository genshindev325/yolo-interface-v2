import React from 'react'

import { GenericErrorToast } from './GenericError.toast'
import { ApprovalToast } from './Approval.toast'
import { LiveToast } from './Live.toast'
import { NftReadyToast } from './NftReady.toast'
import { NftClaimToast } from './NftClaim.toast'
import { NftClaimPendingToast } from './NftClaimPending.toast'
import { TokenPendingToast } from './TokenPending.toast'
import { TokenReadyToast } from './TokenReady.toast'
import { UsernamePendingToast } from './UsernamePending.toast'
import { UsernameReadyToast } from './UsernameReady.toast'

const TOAST_DICT = {
  error: <GenericErrorToast />,
  approval: <ApprovalToast />,
  live: <LiveToast />,
  nftReady: <NftReadyToast />,
  nftClaim: <NftClaimToast />,
  nftClaimPending: <NftClaimPendingToast />,
  tokenPending: <TokenPendingToast />,
  tokenReady: <TokenReadyToast />,
  usernamePending: <UsernamePendingToast />,
  usernameReady: <UsernameReadyToast />
}

export const ToastLib = ({ toastId, ...toastProps }) => {
  const selectedToast = TOAST_DICT[toastId] || null
  const composedToast = selectedToast && React.cloneElement(selectedToast, { ...toastProps })

  return composedToast
}
