import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectActiveCardRoundOffset } from 'redux/selectors'
import { useGameProgress } from 'utils/hooks'

import { LIVE_OFFSET } from 'utils/constants'

import { Typography } from 'components/Atoms/Typography'
import { CircleProgress } from 'components/Molecules/gameV2/CircleProgress'
import { Cube3d } from 'components/Atoms/Cube3d'

export const ProgressClock = ({ className }) => {
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())

  const { progress, formattedTimeLeft, blocksLeft } = useGameProgress()
  const isNext = activeCardRoundOffset > LIVE_OFFSET

  return (
    <Container isBig={isNext} className={className}>
      {isNext && <RoundStartLabel className='starts-label'>Round starts in</RoundStartLabel>}
      <Content className='content'>
        <RunningTime variant='caption' size={isNext ? 3.1 : 1.9} spacing='-0.03' weight='700' height='100'>
          {formattedTimeLeft}
        </RunningTime>
        <RunningBlocks className='time-label'>
          <CubeIcon rotate={blocksLeft > 0} />
          {blocksLeft > 0 ? blocksLeft : 0}
        </RunningBlocks>
      </Content>
      <CircleProgress completed={progress} />
    </Container>
  )
}

// TODO: ACZ --> improve this definition using css utils from styledComponent to have two definition,
// one for isBigCss and other for is NotBigCss
const Container = styled.div`
  width: ${({ isBig }) => (isBig ? 178 : 120)}px;
  height: ${({ isBig }) => (isBig ? 178 : 120)}px;
  position: relative;
  top: 0;
  right: 0;
  ${({ theme }) => theme.breakPoints['xs']} {
    width: ${({ isBig }) => (isBig ? 120 : 96)}px;
    height: ${({ isBig }) => (isBig ? 120 : 96)}px;
  }
  .content {
    width: ${({ isBig }) => (isBig ? 170 : 114)}px;
    height: ${({ isBig }) => (isBig ? 170 : 114)}px;
    padding: ${({ isBig }) => (isBig ? `0 0 0 0` : '0 0 10px 0')};
    ${({ theme }) => theme.breakPoints['xs']} {
      width: ${({ isBig }) => (isBig ? 112 : 90)}px;
      height: ${({ isBig }) => (isBig ? 112 : 90)}px;
      padding: ${({ isBig }) => (isBig ? `30px 0 0 0` : '25px 0 0 0')};
      align-items: ${({ isBig }) => (isBig ? `center` : 'flex-start')};
      h5 {
        line-height: 100%;
        font-size: ${({ isBig }) => (isBig ? 2.1 : 1.6)}rem;
        letter-spacing: ${({ isBig }) => (isBig ? -0.05 : -0.03)}em;
      }
    }
  }
  .time-label {
    ${({ theme }) => theme.breakPoints['xs']} {
      ${({ isBig }) => isBig && `display: none;`}
    }
  }
  .starts-label {
    ${({ isBig }) =>
      isBig &&
      `font-size: .7rem;
      white-space: normal;
      top: 25px;`}
  }
`
const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #202e49;
  border-radius: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 100%;
  z-index: 3;
`
const RunningTime = styled(Typography)`
  padding: 0 0 10px 0;
`

const RunningBlocks = styled.div`
  display: flex;
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  z-index: 9;
  ${({ theme }) => theme.breakPoints['xs']} {
    bottom: 24px;
  }
`
const CubeIcon = styled(Cube3d)`
  margin: 0 5px 0 0;
`
const RoundStartLabel = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  text-align: center;
  line-height: 120%;
  opacity: 0.6;
  font-size: 0.9rem;
  white-space: nowrap;
  display: flex;
  z-index: 4;
  top: 45px;
`
