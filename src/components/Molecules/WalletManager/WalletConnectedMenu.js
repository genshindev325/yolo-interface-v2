import React from 'react'
import styled from 'styled-components'

import { WalletMenu } from 'components/Molecules/HeaderItems/WalletMenu'
import { AccountMenu } from 'components/Molecules/HeaderItems/AccountMenu'
import { NetworkSelector } from 'components/Molecules/NetworkSelector'

export const WalletConnectedMenu = () => {
  return (
    <WalletMenuWrapper id='WalletConnectedMenu'>
      <AccountMenu />
      <NetworkSelector />
      <WalletMenu />
    </WalletMenuWrapper>
  )
}

const WalletMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
