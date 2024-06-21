import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectChainInfo ,selectWalletProviderInfo, selectWalletAddress } from 'redux/selectors'
import { reduxWalletActions, notificationActions } from 'redux/actions'

import { IconLib } from 'components/Atoms/IconLib'
import { Link } from 'components/Atoms/Link'
import { openNewURL } from 'utils'

import { config } from 'config';

const walletSelectorObj = {
  // this component will receive `closeModal` prop to close programmatically the modal
  show: true,
  id: 'walletSelector',
  backdropClose: false
}

export const WalletTop = () => {
  const dispatch = useDispatch()
  const providerInfo = useSelector(selectWalletProviderInfo())
  const address = useSelector(selectWalletAddress());
  const { scannerTemplate } = useSelector(selectChainInfo()) || {}
  const addressLink = useMemo(() => scannerTemplate? scannerTemplate.replace('tx/[hashAddress]', `address/${address}`) : '', [scannerTemplate, address]);

  const onChange = () => {
    dispatch(reduxWalletActions.disconnect())
    dispatch(notificationActions.updateModal(walletSelectorObj))
  }

  return (
    <WindowTop>
      <div>
        <WalletLink href={providerInfo.url}>{providerInfo.name} <WalletIcon {...providerInfo.iconProps} /></WalletLink>          
        <ChangeButton onClick={onChange}>Change</ChangeButton>
      </div>
      <div>
        <TxHistory href={addressLink}>Tx history</TxHistory>
      </div>
    </WindowTop>
  )
}

const WindowTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px 5px 5px;
  flex-wrap: wrap;

  & div {
    display: flex;
    align-items: center;
  }
`
const WalletLink = styled(Link)`
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin: 0 5px 0 0;
  display: flex;
  text-decoration: underline;
  text-decoration-color: rgba(255,255,255,.4);
  color: #fff;
  transition: all 0.3s;
  font-size: 13px;
  font-weight: 400;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`

const WalletIcon = styled(IconLib).attrs((props) => {
  return {
    collection: 'crypto',
    dimension: '20px',
    masking: false
  }
})`
  align-self: center;
  margin: 0 0 0 10px;
  display: flex;
`
const ChangeButton = styled.button`
  color: #fff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, .4);
  font-size: .7rem;
  line-height: 100%;
  margin-top: 2px;
  opacity: .6;

  &:hover {
    text-decoration: none;
  }
`
const TxHistory = styled(Link)`
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  text-decoration: none;
  align-items: center;
  -webkit-transition: all 0.3s;
  color: ${({ theme }) => theme.themeColors.white};

  font-size: .7rem;
  font-weight: 400;
	background: rgba(0, 0, 0, .15);
	border-radius: 8px;
	padding: 5px 10px;
	line-height: 100%;

  &:hover {
    color: #fff;
  }
`


