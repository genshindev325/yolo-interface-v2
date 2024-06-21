import React from 'react'
import styled from 'styled-components'

import { WalletAccount } from 'components/Molecules/WalletAccount'
import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { ModalOverlay } from 'components/Atoms/ModalOverlay'

export const WalletModal = ({ closeModal }) => {
  return (
    <ModalOverlay>
      <Modal id='wallet_account_modal'>
        <CloseBotton name='close2' mask onClick={closeModal} />
        <ModalTitle variant='caption' size='1.4' weight='600'>
          Wallet
        </ModalTitle>
        <WalletAccount closeModal={closeModal} />
      </Modal>
    </ModalOverlay>
  )
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0 1px 49px 0px rgb(0 0 0 / 30%);
  backdrop-filter: blur(45px);
  :after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.1);
    -webkit-filter: blur(100px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 15px;
  }
`
const CloseBotton = styled(IconLib).attrs((props) => ({
  collection: 'general',
  name: 'close2',
  dimension: '20px',
  masking: true
}))`
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 15px;
  border-radius: 50%;
  z-index: 1;
`
const ModalTitle = styled(Typography)`
  font-weight: 600;
  padding: 7px 15px 15px 15px;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.4rem;
  white-space: nowrap;
`
