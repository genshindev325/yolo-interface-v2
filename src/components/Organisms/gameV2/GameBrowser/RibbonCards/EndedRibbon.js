import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { gameDataActions } from 'redux/actions'
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

export const EndedRibbon = ({ className, gId, cardRoundOffset }) => {
  const dispatch = useDispatch()
  const gameId = useSelector(selectActiveGameId())
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex(gId))
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const isGameClosed = useSelector(selectIsGameClosed(gId)) //ACZ: Waiting for the Closed state design

  const convert = useConvertAmount()

  // Local state management
  //const [payoutAmount, setPayoutAmount] = useState(1.51)

  // Memoize some data
  const myGameData = useMemo(() => ({ gameId: gId, activeCardRoundOffset: cardRoundOffset }), [gId, cardRoundOffset])
  const ownCardRoundIdx = useMemo(
    () => gameIdCurrentRoundIndex + cardRoundOffset,
    [cardRoundOffset, gameIdCurrentRoundIndex]
  )

  const { total, winDirection, payoutUp, payoutDown } = useSelector(selectGamePool(gId, ownCardRoundIdx)) || {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const poolAmount = useMemo(() => convert(total || 0, 'YOLO', 'USD', { number: true }), [total])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const payoutAmount = useMemo(() => {
    const payout = winDirection === 'up' ? payoutUp : payoutDown
    return payout === Infinity ? 'MAX' : payout ? `${payout}X` : LONGDASH
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winDirection])

  const isActive = cardRoundOffset === activeCardRoundOffset && gId === gameId

  const onClickPast = () => {
    dispatch(gameDataActions.setMyGame(myGameData))
  }

  useEffect(() => {
    isActive && dispatch(gameDataActions.setMyGame(myGameData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownCardRoundIdx])

  return (
    <RibbonWrapper className={className} isActive={isActive} onClick={onClickPast}>
      <LeftWrapper>
        <GameStatusLeft>
          <strong>Payout</strong>
          <DataWrapLeft>
            {payoutAmount !== LONGDASH ? <Payout isUp={winDirection === 'up'}>{payoutAmount}</Payout> : LONGDASH}
          </DataWrapLeft>
        </GameStatusLeft>
      </LeftWrapper>
      <CenterWrapper>
        <GameStatusCenter className='yolo'>
          <strong>ENDED</strong>
          <Round>ROUND {Math.max(ownCardRoundIdx, 0)}</Round>
        </GameStatusCenter>
      </CenterWrapper>
      <RightWrapper>
        <GameStatusRight>
          {poolAmount ? (
            <>
              <IconArrow
                masking
                rotate={winDirection === 'up' ? 'down' : 'up'}
                isUp={winDirection === 'up'}
              ></IconArrow>
              <DataWrapRight>
                <IconTime></IconTime>
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

const RibbonWrapper = styled(RibbonCardBase)`
  background-color: rgba(64, 74, 94, 0.6);
  margin-bottom: 4px;

  ${({ isActive }) =>
    isActive &&
    `  opacity: 1;
    border: 1px solid rgba(42, 109, 255, 0.2);
    box-shadow: 0 0 50px 0 rgb(0 0 0 / 70%);
    z-index: 2;
  `}
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
    background: linear-gradient(
      38deg,
      rgba(42, 109, 255, 0.5) 0%,
      rgba(42, 109, 255, 0.75) 25%,
      rgba(42, 109, 255, 0.85) 50%,
      rgba(42, 109, 255, 0.75) 75%,
      rgba(42, 109, 255, 0.5) 100%
    );
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
    font-weight: 600;
  }
`
const Payout = styled(Amount)`
  color: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
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
  font-size: 0.7rem;
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
const GameStatusLeft = styled(GameStatus)`
  & strong {
    margin-left: 0;
    font-weight: 600;
  }
`
const GameStatusCenter = styled(GameStatus)`
  line-height: 140%;
  font-weight: 600;
  white-space: nowrap;
  flex-direction: row;
  display: flex;
  align-items: center;

  & strong {
    font-size: 0.75rem;
    color: #01a812;
    color: #fff;
    font-weight: 800;
    margin-right: 5px;
    line-height: 140%;
    white-space: nowrap;
  }
`
const GameStatusRight = styled(GameStatus)`
  display: flex;
  align-items: center;

  & strong {
    margin-left: 0;
  }
`
const DataWrapLeft = styled(DataWrap)`
  padding: 0 0 0 0;
`
const DataWrapRight = styled(DataWrap)`
  justify-content: center;
`
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp' })`
  width: 12px;
  height: 12px;
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const Round = styled(Amount)`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;
`
const IconTime = styled.div``
const PoolAmount = styled(Amount)`
  line-height: 100%;
  padding: 2px 0 0 0;
`
