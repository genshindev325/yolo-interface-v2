import React from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import {
  selectCurrentBlock,
  selectSettlementPrice,
  selectLiveEndBlock,
  selectActiveCardRoundOffset
} from 'redux/selectors'

import { useGameProgress } from 'utils/hooks'
import { LIVE_OFFSET } from 'utils/constants'

import { Typography } from 'components/Atoms/Typography'

export const SpinningClock = ({ className }) => {
  const currentBlock = useSelector(selectCurrentBlock())
  const settlementPrice = useSelector(selectSettlementPrice())
  const endBlock = useSelector(selectLiveEndBlock())
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())

  const { formattedTimeLeft } = useGameProgress()

  const startRotate = endBlock && !settlementPrice
  const isNext = activeCardRoundOffset > LIVE_OFFSET

  return (
    <ClockWrapper isBig={isNext} className={className}>
      <Container isBig={isNext}>
        <AnimatedCircle rot={startRotate} className='animated-circle' />
        {isNext && <TimeRemainLabel className='time-label'>Round Starts in</TimeRemainLabel>}
        <Labels className='time-slot'>
          <Typography variant='caption' size='1.9' spacing='-0.03' weight='700' height='100'>
            {formattedTimeLeft}
          </Typography>
        </Labels>
        {isNext && <RunningBlocks className='time-label'>{currentBlock}</RunningBlocks>}
      </Container>
    </ClockWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const ClockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`

const Container = styled.div`
  position: absolute;
  right: ${({ isBig }) => (isBig ? 'calc(50% - 90px)' : 0)};
  top: ${({ isBig }) => (isBig ? 'calc(50% - 180px)' : 0)};
  ${({ isBig }) =>
    isBig &&
    `
    position: relative;
    top: 0;
    right: 0;
    margin: 0 0 0 10px;
    .animated-circle {
      padding: 20px;
      width: 180px;
      height: 180px;
      @media (max-width: 430px) {
        width: 120px;
        height: 120px;
      }
    }
    .time-slot {
      width: 170px;
      height: 170px;
      justify-content: center;
      align-items: center;
      padding: 25px 0 0 0;
      h5 {
        font-size: 3.1rem;
        letter-spacing: -.05em;
        font-weight: 400;
      }
      @media (max-width: 430px) {
        width: 110px;
        height: 110px;
        padding: 30px 0 0 0;
        h5 {
          font-size: 1.8rem;
          letter-spacing: -.03em;
          font-weight: 500;
        }
      }
    }
    .time-label {
      top: 50px;
      font-size: .9rem;
      white-space: nowrap;
      @media (max-width: 430px) {
        display: block !important;
        font-size: .8rem;
        white-space: normal;
        top: 25px;
      }
    }
  `}

  ${({ theme }) => theme.breakPoints['xs']} {
    top: ${({ isBig }) => (isBig ? 'calc(50% - 70px)' : 0)};
  }
`
const AnimatedCircle = styled.div`
  animation: ${rotate} ${({ rot }) => (rot ? '1.4s' : '0s')} infinite ease-in both;
  background: linear-gradient(0deg, transparent, rgb(37, 87, 199));
  border-radius: 50%;
  padding: 20px;
  width: 120px;
  height: 120px;
  box-shadow: 0 0 70px 0 rgb(42 109 255 / 30%);
  ${({ theme }) => theme.breakPoints['xs']} {
    width: 76px;
    height: 76px;
  }
`
const TimeRemainLabel = styled.div`
  position: absolute;
  top: 25px;
  transform: translateX(-50%);
  left: 50%;
  font-size: 0.7rem;
  z-index: 1;
  text-align: center;
  line-height: 120%;
  opacity: 0.6;
  ${({ theme }) => theme.breakPoints['xs']} {
    display: none;
  }
`
const Labels = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background: #202e49;
  width: 114px;
  height: 114px;
  border-radius: 50%;
  display: flex;

  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0 0 10px 0;
  ${({ theme }) => theme.breakPoints['xs']} {
    width: 70px;
    height: 70px;
    h5 {
      font-size: 1.3rem;
    }
    padding: 0;
    .ended-label {
      font-size: 0.6rem;
    }
  }
`
const RunningBlocks = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`
