import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { reduxWalletActions } from 'redux/actions'
import { selectWalletAddress } from 'redux/selectors'

import { WalletTop } from 'components/Molecules/WalletAccount/WalletTop'
import { WalletBids } from 'components/Molecules/WalletAccount/WalletBids'
import { WalletWinLoss } from 'components/Molecules/WalletAccount/WalletWinLoss'
import { WalletEarnings } from 'components/Molecules/WalletAccount/WalletEarnings'
import { WalletBalance } from 'components/Molecules/WalletAccount/WalletBalance'

import { ShowText } from 'components/Atoms/ShowText'

export const WalletAccount = ({ closeModal }) => {
  const dispatch = useDispatch()

  const onSignOut = () => {
    dispatch(reduxWalletActions.disconnect())
    closeModal && closeModal()
  }
  const address = useSelector(selectWalletAddress());

  return useMemo(
    () => (
      <Container>
        <WalletTop />
        <WindowAccount>
          <ShowText text={address} ></ShowText>
          <WalletBids />
          <WalletWinLoss />
          <WalletEarnings />
          <WalletBalance />
          <BottomLinks>
            <li className="denote">All currencies are shown in $USD, unless otherwise noted as YOLO</li>
            <li><DisconnectButton onClick={onSignOut}>Disconnect Wallet</DisconnectButton></li>
          </BottomLinks>
        </WindowAccount>
      </Container>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address]
  )
}

const Container = styled.div`
  width: 100%;
`
const WindowAccount = styled.div`
  display: flex;
  flex-direction: column;
`
const BottomLinks = styled.ul`
  display: flex;
  justify-content: center;
  padding: 10px 10px 0 10px;
  list-style: none;
  flex-direction: column;
  text-align: center;

  li {
    text-align: center;
    justify-content: center;
    display: flex;
  }
  li.denote {
    font-size: .7rem;
    padding: 0 20px;
    display: flex;
  }

`
const DisconnectButton = styled.button`
  outline: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  justify-content: center;
  align-items: center;

  background: rgba(0,0,0,.2);
  border-radius: 10px;
  padding: 5px 10px;
  line-height: 100%;
  margin: 10px 0 0 0;
  font-size: .7rem;
  display: flex;
  color: white;
`