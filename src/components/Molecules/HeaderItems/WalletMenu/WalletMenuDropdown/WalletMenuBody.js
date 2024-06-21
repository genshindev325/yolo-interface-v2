import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { WalletAccount } from 'components/Molecules/WalletAccount'

export const WalletMenuBody = ({ closeMenu }) => {
  return (
    <StyledMenu>
      <ModalTitle variant='caption' size='1.4' weight='600'>
        Wallet
      </ModalTitle>
      <WalletAccount />
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 15px;
  box-sizing: border-box;
  z-index: 2;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(40px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  width: 370px;
  box-shadow: 0 0 45px 20px rgb(33 38 47 / 90%);

  &:after {
    content: '';
    background: rgba(42,109,255,.2);
    -webkit-filter: blur(80px);
    filter: blur(80px);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;
  }

  ${({ theme }) => theme.breakPoints['xl']} {
    height: calc(100vh - 110px);
    overflow-y: auto;
    min-width: 370px;
    z-index: 3;
  }
`

const ModalTitle = styled(Typography)`
  font-weight: 600;
  padding: 7px 15px 10px 15px;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.1rem;
  white-space: nowrap;
`
