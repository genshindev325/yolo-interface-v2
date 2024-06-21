import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import { reduxWalletActions } from 'redux/actions'
import { selectWalletsInfo } from 'redux/selectors'

import { Pad } from 'components/Atoms/Pad'
import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const WalletSelector = ({ onSelect, fullConnection = true }) => {
  const dispatch = useDispatch()
  const availableWalletsInfo = useSelector(selectWalletsInfo())

  const connect = (walletId) => {
    dispatch(reduxWalletActions.connectWallet({ walletProviderId: walletId, fullConnection }))
    const walletInfo = availableWalletsInfo.find((wInfo) => walletId === wInfo.id)
    onSelect && onSelect(walletInfo)
  }
  return (
    <WalletsContainer>
      {availableWalletsInfo.map((wInfo, idx) => {
        if (isMobile && !wInfo.props.isEnableOnMobile) {
          return null
        }
        return (
          <WalletButton key={idx} onClick={() => connect(wInfo.id)} noBlur>
            <Typography variant='caption' size='0.9'>
              {wInfo.name}
            </Typography>
            {React.cloneElement(<IconLib {...wInfo.iconProps} />, {
              dimension: '20px'
            })}
          </WalletButton>
        )
      })}
    </WalletsContainer>
  )
}

const WalletsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2px 0 0 0;
`
const WalletButton = styled(Pad)`
  padding: 15px 25px;
  white-space: nowrap;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  margin: 0 0 5px 0;
  min-width: 260px;
`
