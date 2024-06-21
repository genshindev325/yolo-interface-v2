import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { getAvailableNetworksInfo } from 'config/network.config'

import { selectAvailableNetworkIds } from 'redux/selectors'

import { IconLib } from 'components/Atoms/IconLib'

export const NetworkSelector = React.memo(() => {
  const approvedNetworkIds = useSelector(selectAvailableNetworkIds())

  const onNetworkSelectClick = () => {
    /*     if (wallet.providerInfo.props.canUiSwitchChain) {
      setOpenNetworkDlg(!openNetworkDlg)
    } */
  }

  return (
    <Container>
      {getAvailableNetworksInfo(approvedNetworkIds).map((networkInfo, idx) => {
        return (
          <NetworkButton networkColor={networkInfo.chainColor} key={`NB-${idx}`}>
            <NetworkIcon networkColor={networkInfo.chainColor} {...networkInfo.iconProps} masking />
            {networkInfo.network}
          </NetworkButton>
        )
      })}
    </Container>
  )
})

const NetworkButton = styled.button`
  padding: 0 12px;
  height: 34px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  border: 1px solid ${({ networkColor }) => networkColor};
  color: ${({ networkColor }) => networkColor};
  background: rgba(19, 24, 31, 1);
  &:hover {
    filter: brightness(1.5);
  }
`
const NetworkIcon = styled(IconLib)`
  width: 15px;
  height: 15px;
  margin: 0 5px 0 0;
  background: ${({ networkColor }) => networkColor};
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  flex-direction: row;
  border-radius: 0;
  z-index: 9;
  & ${NetworkButton}:not(:first-child,:last-child) {
    border-radius: 0;
    border-left: none;
    border-right: 1px solid #666 !important;
  }
  & ${NetworkButton}:first-child {
    border-radius: 10px 0 0 10px;
    border-right: 1px solid #666 !important;
  }
  & ${NetworkButton}:last-child {
    border-radius: 0 10px 10px 0;
    border-left: none;
  }
  & ${NetworkButton}:only-child {
    border-radius: 10px;
    border: 1px solid ${({ networkColor }) => networkColor} !important;
  }
`
