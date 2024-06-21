import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import { gameDataActions, priceFeedActions } from 'redux/actions'
import { useGameProgress, useConvertAmount } from 'utils/hooks'
import {
  selectActiveGameId,
  selectGameIdCurrentRoundIndex,
  selectActiveCardRoundOffset,
  selectCurrentPrice,
  selectStrikePrice,
  selectGamePool,
  selectIsGameClosed
} from 'redux/selectors'
import { currencyFormatter } from 'utils'
import { getGameParameters } from 'config/games.config'
import { LONGDASH } from 'utils/constants'
import { IconLib } from 'components/Atoms/IconLib'

import { RibbonCardBase, GameStatus, DataWrap, Amount } from './shared-comps'

export const LiveRibbon = ({ className, gId, cardRoundOffset, emptyAmountSymbol }) => {
  const dispatch = useDispatch()
  const gameId = useSelector(selectActiveGameId())
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex(gId))
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const currentPrice = useSelector(selectCurrentPrice(gId))
  const strikePrice = useSelector(selectStrikePrice(gId))
  const isGameClosed = useSelector(selectIsGameClosed(gId)) //ACZ: Waiting for the Closed state design

  const convert = useConvertAmount()
  const direction = useMemo(() => (currentPrice >= strikePrice ? 'up' : 'down'), [currentPrice])
  const { ROUND_ALMOST_END_TIME } = getGameParameters(gId)
  const { blocksLeft, msTimeLeft } = useGameProgress(gId, 0)

  // Memoize some data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ownCardRoundIdx = useMemo(() => gameIdCurrentRoundIndex, [gameIdCurrentRoundIndex])

  const myGameData = useMemo(
    () => ({ gameId: gId, activeCardRoundOffset: cardRoundOffset, checkBidResult: false }),
    [gId, cardRoundOffset]
  )
  const { total, winDirection } = useSelector(selectGamePool(gId, ownCardRoundIdx)) || {}
  const poolAmount = useMemo(() => convert(total || 0, 'YOLO', 'USD', { number: true }), [total])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const shouldFlash = useMemo(() => (msTimeLeft === 0 ? false : msTimeLeft <= ROUND_ALMOST_END_TIME), [msTimeLeft])

  const isActive = cardRoundOffset === activeCardRoundOffset && gId === gameId

  const onClickLive = () => {
    dispatch(priceFeedActions.resetGames())
    dispatch(gameDataActions.setMyGame(myGameData))
  }

  useEffect(() => {
    isActive && dispatch(gameDataActions.setMyGame(myGameData))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownCardRoundIdx])

  return (
    <RibbonWrapper className={className} shouldFlash={shouldFlash} isActive={isActive} onClick={onClickLive}>
      <LeftWrapper>
        <BlockTimeWrap>
          <IconBlock masking></IconBlock>
          <BlockValue>{poolAmount ? blocksLeft : LONGDASH}</BlockValue>
        </BlockTimeWrap>
      </LeftWrapper>
      <CenterWrapper isActive={isActive}>
        <strong>LIVE</strong> ROUND {Math.max(ownCardRoundIdx, 0)}
      </CenterWrapper>
      <RightWrapper>
        <GameStatusRight>
          {poolAmount ? (
            <>
              <IconArrow masking rotate={direction === 'up' ? 'down' : 'up'} isUp={direction === 'up'}></IconArrow>
              <DataWrapRight>
                <PoolAmount>{currencyFormatter(poolAmount)}</PoolAmount>
              </DataWrapRight>
            </>
          ) : (
            LONGDASH
          )}
        </GameStatusRight>
      </RightWrapper>
    </RibbonWrapper>
  )
}

const blink = keyframes`
  50% {
    border-color: rgba(42,109,255,.8);
    -webkit-box-shadow: 0 1px 19px 0px rgb(42 109 255 / 90%);
    opacity: 1;
  }
`

const RibbonWrapper = styled(RibbonCardBase)`
  animation: ${blink} 1s linear infinite alternate;
  animation: ${({ shouldFlash }) => !shouldFlash && 'none'};
  -webkit-box-shadow: 0 1px 49px 0px rgb(42 109 255 / 0%);
  margin-bottom: 4px;

  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1.0;
    background: rgba(0,0,0,.3);
    border: 1px solid rgba(255,255,255,.2);
    box-shadow: 0 0 50px 0 rgb(0 0 0 / 70%);
    position: relative;
    z-index: 2;`}
  #title {
    strong {
      font-weight: 600;
    }
  }
  height: 38px;
  position: relative;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: linear-gradient(38deg, rgba(226, 14, 85, 1) 0%, rgba(135, 92, 255, 1) 20%, rgba(42, 109, 255, 1) 88%);
    border-radius: 10px;
    z-index: -1;
  }
`
const LeftWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 22%;
  padding: 0 0 0 0;
  font-weight: 600;

  & strong {
    margin-left: 0;
    font-weight: 600;
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
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp' })`
  width: 12px;
  height: 12px;
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const PoolAmount = styled(Amount)`
  line-height: 100%;
  padding: 2px 0 0 0;
`
const BlockTimeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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
  display: flex;
  margin: 0 4px 0 0;
  font-weight: 700;
  font-size: 0.9rem;
`
