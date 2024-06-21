import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { gameDataActions } from 'redux/actions'
import { useGameProgress } from 'utils/hooks'
import {
  selectActiveGameId,
  selectGameIdCurrentRoundIndex,
  selectActiveCardRoundOffset,
  selectGamePool,
  selectIsGameClosed
} from 'redux/selectors'
import { currencyFormatter } from 'utils'
import { LONGDASH } from 'utils/constants'
import { useConvertAmount } from 'utils/hooks'

import { IconLib } from 'components/Atoms/IconLib'
import { RibbonCardBase, GameStatus, DataWrap, Amount } from './shared-comps'

export const NextRibbon = ({ className, gId, cardRoundOffset }) => {
  const dispatch = useDispatch()
  const gameId = useSelector(selectActiveGameId())
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex(gId))
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const isGameClosed = useSelector(selectIsGameClosed(gId)) //ACZ: Waiting for the Closed state design

  const { blocksLeft } = useGameProgress(gId, cardRoundOffset)

  // Memoize some data
  const myGameData = useMemo(() => ({ gameId: gId, activeCardRoundOffset: cardRoundOffset }), [gId, cardRoundOffset])
  const ownCardRoundIdx = useMemo(
    () => gameIdCurrentRoundIndex + cardRoundOffset,
    [cardRoundOffset, gameIdCurrentRoundIndex]
  )

  const convert = useConvertAmount()

  const gamePool = useSelector(selectGamePool(gId, ownCardRoundIdx))
  const poolAmount = convert(gamePool?.total || 0, 'YOLO', 'USD', { number: true })

  const isActive = cardRoundOffset === activeCardRoundOffset && gId === gameId

  const onClickNext = () => {
    dispatch(gameDataActions.setMyGame(myGameData))
  }
  /* 
  useEffect(() => {
    isActive && dispatch(gameDataActions.setMyGame(myGameData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownCardRoundIdx]) */

  return (
    <RibbonWrapper className={className} isActive={isActive} onClick={onClickNext}>
      <LeftWrapper>
        <GameStatusLeft>
          <strong>Starts in</strong>
          <GameTime className='game-time' isActive={isActive}>
            <IconBlock masking className=''></IconBlock>
            <BlockValue>{poolAmount ? blocksLeft : LONGDASH}</BlockValue>
          </GameTime>
        </GameStatusLeft>
      </LeftWrapper>
      <CenterWrapper>
        <PredictBtn onClick={onClickNext} isActive={isActive}>
          bid in Round {Math.max(ownCardRoundIdx, 0)}
        </PredictBtn>
      </CenterWrapper>
      <RightWrapper>
        <GameStatusRight>
          <strong>Pool</strong>
          {poolAmount ? (
            <DataWrapRight>
              <PoolAmount>{currencyFormatter(poolAmount)}</PoolAmount>
            </DataWrapRight>
          ) : (
            LONGDASH
          )}
        </GameStatusRight>
      </RightWrapper>
    </RibbonWrapper>
  )
}
const RibbonWrapper = styled(RibbonCardBase)`
  background-color: rgba(42, 109, 255, 0.15);
  margin-bottom: 4px;
  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1.0;
    border: 1px solid rgba(42,109,255,.2);
    box-shadow: 0 0 50px 0 rgb(0 0 0 / 70%);
    z-index: 2;
  `}
  #title {
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
      color: #01a812;
    }
  }
  height: 38px;
  position: relative;
  &::after {
    ${({ isActive }) =>
      isActive &&
      `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(38deg, rgba(42,109,255,.5) 0%, rgba(42,109,255,.75) 25%, rgba(42,109,255,.85) 50%, rgba(42,109,255,.75) 75%, rgba(42,109,255,.5) 100%);
    border-radius: 10px;
    z-index: -1;`};
  }
`
const LeftWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 22%;
  padding: 0 0 0 5px;
  font-weight: 600;

  & strong {
    margin-left: 0;
    font-weight: 400;
  }
`
const CenterWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: 46%;
  color: rgba(255, 255, 255, 1);
  text-transform: uppercase;
  font-weight: ${({ isActive }) => (isActive ? `400` : `600`)};

  & strong {
    font-weight: 600;
    margin: 0 5px 0 0;
  }
`
const RightWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 22%;

  & strong {
    margin-left: 0;
  }
`
const GameStatusLeft = styled(GameStatus)``
const GameStatusRight = styled(GameStatus)`
  display: flex;
  align-items: center;

  & strong {
    margin-left: 0;
  }
`
const DataWrapRight = styled(DataWrap)`
  justify-content: center;
`
const PoolAmount = styled(Amount)`
  line-height: 100%;
  padding: 2px 0 0 0;
`
const GameTime = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 3px 4px;
  -webkit-filter: ${({ isActive }) => (isActive ? `brightness(100%)` : `brightness(60%)`)};

  ${({ theme }) => theme.breakPoints['600px']} {
    margin: 0 5px;
  }
`
const IconBlock = styled(IconLib).attrs({ collection: 'crypto', name: 'block', dimension: '10px' })`
  background: rgba(255, 255, 255, 1);
  width: 10px;
  height: 10px;
  display: block;
  -webkit-mask-size: 10px 10px;
  margin: 0 5px 0 0;
`
const BlockValue = styled.div`
  font-weight: 700;
  line-height: 100%;
  font-size: 0.75rem;

  ${({ theme }) => theme.breakPoints['600px']} {
    font-weight: 600;
    line-height: 0;
    font-size: 0.65rem;
    top: 0.1em;
    position: relative;
  }
`
const PredictBtn = styled.div`
  background: ${({ isActive }) => (isActive ? 'transparent' : 'rgba(135, 187, 250, 0.15)')};
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  display: inline-block;
  cursor: pointer;
  strong {
    font-weight: 800;
    padding-left: 4px;
  }
`
