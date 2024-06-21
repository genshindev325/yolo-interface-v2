import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { reduxWalletActions } from 'redux/actions'
import { selectWalletConnectionState } from 'redux/selectors'

import { LOCAL_WALLET_ID } from 'utils/constants'
import { useLocalStorage } from 'utils/hooks'

import { WalletConnect } from './WalletConnect'
import { WalletConnectedMenu } from './WalletConnectedMenu'

export const WalletManager = () => {
  const dispatch = useDispatch()
  const isConnected = useSelector(selectWalletConnectionState())

  const [LUWID] = useLocalStorage(LOCAL_WALLET_ID)

  useEffect(() => {
    !!LUWID?.walletProviderId &&
      dispatch(reduxWalletActions.connectWallet({ walletProviderId: LUWID?.walletProviderId }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <WalletWrapper>{!isConnected ? <WalletConnect /> : <WalletConnectedMenu />}</WalletWrapper>
}

const WalletWrapper = styled.div`
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
    justify-content: center;
  }
`
