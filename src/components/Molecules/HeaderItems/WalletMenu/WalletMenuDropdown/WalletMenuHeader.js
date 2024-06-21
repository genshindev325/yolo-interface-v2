import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'

import { useConvertAmount } from 'utils/hooks'

import { selectWalletBalance, selectBalanceStatus, selectHasPendingTx } from 'redux/selectors'

import { DotLoader } from 'components/Atoms/Loaders'
import { IconLib } from 'components/Atoms/IconLib'

export const WalletMenuHeader = ({ menuIsOpen }) => {
  const { totalBalance } = useSelector(selectWalletBalance())
  const hasPendingTx = useSelector(selectHasPendingTx())
  const balanceStatus = useSelector(selectBalanceStatus())
  const convert = useConvertAmount()

  const isBalanceLoading = useMemo(() => (balanceStatus === 'loading' ? true : false), [balanceStatus])

  const balanceInUsd = convert(totalBalance, 'YOLO', 'USD')

  return (
    <ShowWalletWithBalanceWrapper>
      <IconContainer>
        <DollarIcon />
        <DollarIcon animated={hasPendingTx} />
      </IconContainer>
      <BalanceContainer>
        <BalanceInUSD>{!isBalanceLoading ? balanceInUsd : <DotLoader sizeInRem={0.6} />}</BalanceInUSD>
        <AnimatedBalanceInUSD animated={hasPendingTx}>{!isBalanceLoading ? balanceInUsd : ''}</AnimatedBalanceInUSD>
      </BalanceContainer>
    </ShowWalletWithBalanceWrapper>
  )
}

const ShowWalletWithBalanceWrapper = styled.button`
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

const IconContainer = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
  margin: 0 5px 0 0;
  ${({ theme }) => theme.breakPoints['425px']} {
    display: none;
  }
`
const BalanceContainer = styled.div`
  position: relative;
`
const pendingAnim = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
}
100%{
  transform: scale(3);
  opacity:.1;
  
  `
const IconPulseAnimation = css`
  animation: 1s ${pendingAnim} ease-in infinite;
  background: ${({ theme }) => theme.themeColors.txPending};
`
const BalancePulseAnimation = css`
  animation: 1s ${pendingAnim} ease-in infinite;
  color: ${({ theme }) => theme.themeColors.txPending};
`

const DollarIcon = styled(IconLib).attrs({
  collection: 'crypto',
  name: 'dollarCircle',
  masking: true
})`
  position: absolute;
  width: 14px;
  height: 14px;
  ${({ animated }) => (animated ? IconPulseAnimation : '')};
`
const BalanceInUSD = styled.div`
  ${({ animated }) => (animated ? BalancePulseAnimation : '')};
`
const AnimatedBalanceInUSD = styled.div`
  display: none;
  ${({ theme }) => theme.breakPoints['425px']} {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    ${({ animated }) => (animated ? BalancePulseAnimation : '')};
  }
`
