import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { notificationActions } from 'redux/actions'

import { WalletMenuHeader } from './WalletMenuDropdown/WalletMenuHeader'

export const WalletMenuModal = () => {
  const dispatch = useDispatch()

  const walletModalObj = {
    // this component will receive `closeModal` prop to close programmatically the modal
    show: true,
    id: 'wallet',
    backdropClose: false
  }

  const showWallet = () => {
    dispatch(notificationActions.updateModal(walletModalObj))
  }

  return (
    <WalletModalWrapper onClick={showWallet}>
      <WalletMenuHeader />
    </WalletModalWrapper>
  )
}
const WalletModalWrapper = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 12px;
  height: 40px;
  margin-left: 2px;
  text-decoration: underline;
  text-decoration: underline;
  text-decoration-color: #666;
  text-decoration-color: #666;
  text-underline-position: under;
  color: #fff;
  white-space: nowrap;
  &:hover {
    text-decoration: none;
    text-decoration-color: #666;
  }
`
