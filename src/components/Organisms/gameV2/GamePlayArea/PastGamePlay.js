import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectActiveCardRoundIndex, selectActiveGameId, selectGamePool } from 'redux/selectors'
import { getGameParameters } from 'config/games.config'

import { currencyFormatter } from 'utils'
import { useWindowSize } from 'utils/hooks'

const RenderPastGamePlay = React.memo(
  ({ strikePrice, settlementPrice, cardRoundIndex, gameId, winDirection }) => {
    const { name, FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, FIAT_MAX_DECIMALS_DIGITS } = getGameParameters(gameId)

    const { width } = useWindowSize();
    const [lineWidth, setLineWidth] = useState();
    const priceRef = useRef();

    const defineOnWinDirection = useCallback(
      (upOption, downOption) => (winDirection === 'up' ? upOption : downOption),
      [winDirection]
    )
    
    const calcPriceType = useCallback((direction) => winDirection === direction ? 'strike' : winDirection, [winDirection]);
    const transformAmount = useCallback(
      (amount) => currencyFormatter(amount / FIAT_MAX_DECIMALS_DIGITS, { decimalDigits }),
      [decimalDigits, FIAT_MAX_DECIMALS_DIGITS]
    )

    useEffect(() => {
      if (!priceRef?.current) return;
      setLineWidth(priceRef.current.offsetWidth / 2);
    }, [priceRef?.current, strikePrice, width])

    return (
      <Container>
        <Round>
          <AssetRow>
            <GameWrap>
              <RoundType winDirection={winDirection}> {defineOnWinDirection('YOLO', 'REKT')} </RoundType>
              <RoundNumber>Round <div>{Math.max(cardRoundIndex, 0)}</div></RoundNumber>
            </GameWrap>
            <RoundStatus>This round has ended</RoundStatus>
          </AssetRow>
        </Round>
        <HighPrice>
          <label>{winDirection === 'down' ? 'Strike Price' : 'Settlement Price'}</label>
          <LivePrice type={calcPriceType('down')} ref={priceRef}>{transformAmount(winDirection === 'down' ? strikePrice : settlementPrice)}</LivePrice>
          <AssetName type={calcPriceType('down')}> {name} </AssetName>
          <Line type={calcPriceType('down')} lineWidth = {lineWidth ?? 0} />
          <PriceBlur type={calcPriceType('down')} />
        </HighPrice>
        <LowPrice>
          <label>{winDirection === 'up' ? 'Strike Price' : 'Settlement Price'}</label>
          <LivePrice type={calcPriceType('up')}>{transformAmount(winDirection === 'up' ? strikePrice : settlementPrice)}</LivePrice>
          <AssetName type={calcPriceType('up')}> {name} </AssetName>
          <Line type={calcPriceType('up')} lineWidth = {lineWidth ?? 0} />
          <PriceBlur type={calcPriceType('up')} />
        </LowPrice>
      </Container>
    )
  }
)

export const PastGamePlay = () => {
  const cardRoundIndex = useSelector(selectActiveCardRoundIndex())
  const gameId = useSelector(selectActiveGameId())
  const gamePool = useSelector(selectGamePool(gameId, cardRoundIndex))
  if (gamePool) {
    const { strikePrice, settlementPrice, players, startBlock, endBlock, winDirection } = gamePool

    const renderComponentProps = {
      strikePrice,
      settlementPrice,
      players,
      startBlock,
      endBlock,
      cardRoundIndex,
      gameId,
      winDirection
    }

    return <RenderPastGamePlay {...renderComponentProps} />
  }
  return null
}

const Container = styled.div`
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  display: flex;
  margin: 0 -30px 0 -30px;

  ${({ theme }) => theme.breakPoints['480px']} {
    height: calc(100% - 70px);
  }
`
const Round = styled.div`
  justify-content: center;
  margin: 0;
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`
const AssetRow = styled.div`
  display: flex;
  position: relative;
  padding: 0;
  margin: 0;
  border-bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const GameWrap = styled.div`
  margin: 0;
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0;
    flex-direction: column;
  }
`
const RoundType = styled.div`
  font-size: 2.1rem;
  justify-content: center;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 8px 16px;
  background: #1F2531;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-weight: 700;
  position: relative;
  border-radius: 10px;
  line-height: 100%;

  &:before, &:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 10px;
    background: ${({ winDirection }) => winDirection === 'up' ? 'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(0,194,19,1.0) 15%) center center / 400% 400%'
                                                              : 'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(178,5,58,1) 15%) center center / 400% 400%' };
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.6rem;
  }
`
const RoundNumber = styled.div`
  font-size: 1.4rem;
  margin: 2px 0 0 0;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & div {
    font-weight: 700;
    padding-left: 6px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.2rem;
  }
`
const RoundStatus = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  text-align: left;
  background: rgba(0,0,0,.2);
  padding: 20px 40px;
  line-height: 100%;
  border-radius: 20px;
  margin: 20px 0;
  width: 370px;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.3rem;
    margin: 20px 0;
    padding: 20px 30px;
    width: 295px;
  }
`
const HighPrice = styled.div`
  margin: 0 0 50px 0;
  position: relative;
  bottom: auto;
  align-items: center;
  right: 0;
  z-index: auto;
  justify-content: flex-end;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0;
  line-height: 100%;

  & label {
    font-size: .9rem;
    opacity: 1;
    font-weight: 500;

    ${({ theme }) => theme.breakPoints['480px']} {
      font-size: .9rem;
    }
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    margin: 0 0 40px 0;
  }
`
const LowPrice = styled.div`
  position: relative;
  top: auto;
  align-items: center;
  left: 0;
  z-index: auto;
  justify-content: flex-start;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  line-height: 100%;
  font-weight: 400;

  & label {
    font-size: .9rem;
    opacity: 1;
    font-weight: 500;

    ${({ theme }) => theme.breakPoints['480px']} {
      font-size: .9rem;
    }
  }
`
const LivePrice = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 3px 0 0 0;
  letter-spacing: -.02em;
  line-height: 1em;
  z-index: 7;
  color: rgba(255,255,255,1.0);
  text-shadow: ${({ type }) => type === 'strike' ? '-1px -1px 0 rgb(42 109 255), 1px -1px 0 rgb(42 109 255), -1px 1px 0 rgb(42 109 255), 1px 1px 0 rgb(42 109 255)' 
                            : (type === 'up' ? '-1px -1px 0 rgb(0 194 19), 1px -1px 0 rgb(0 194 19), -1px 1px 0 rgb(0 194 19), 1px 1px 0 rgb(0 194 19)'
                                            : '-1px -1px 0 rgba(226,14,85, 1.0), 1px -1px 0 rgba(226,14,85, 1.0), -1px 1px 0 rgba(226,14,85, 1.0), 1px 1px 0 rgba(226,14,85, 1.0)')};
  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.4rem;
    letter-spacing: -.01em;
    padding: 0;
  }
`
const AssetName = styled.div`
  display: none;
  color: ${({ type }) => type === 'strike' ? 'rgba(42,109,255,1.0)'
                      : (type === 'up' ? 'rgba(0,194,19,1.0)' : 'rgba(226,14,85,1.0)')};
  margin: 5px 0 0 0;
  font-size: .7rem;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
`
const Line = styled.div`
  width: calc(50% + ${({ lineWidth }) => `${lineWidth}px`});
  left: ${({ type }) => type === 'strike' ? 'auto': '0'};
  right: 0;
  top: ${({ type }) => type === 'strike' ? 'calc(50% + 14px)' : 'calc(50% + 44px)'};
  transform: translateY(-50%);
  position: absolute;
  font-size: 13px;

  &:after {
    content: "";
    background: ${({ type }) => type === 'strike' ? 'rgba(42,109,255,1.0)' 
                             : (type === 'up' ? 'rgba(0,194,19,1.0)' : 'rgba(226,14,85,1.0)')};
    display: block;
    height: 3px;
    width: 100%;
    position: absolute;
    bottom: ${({ type }) => type === 'strike' ? '0px' : '30px'};
  }
`
const PriceBlur = styled.div`
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  position: absolute;
  background: ${({ type }) => type === 'strike' ? 'rgba(42,109,255,1)' 
                           : (type === 'up' ? 'rgba(0,194,19,.6)' : 'rgba(226,14,85,.6)')};
  filter: ${({ type }) => type === 'strike' ? 'blur(70px)' : 'blur(80px)'};
  width: 200px;
  height: 100px;
  ${({ type }) => type === 'strike' ? 'top: calc(50% - 50px)' : 'bottom: calc(45% - 60px)'};
  ${({ type }) => type === 'strike' ? '' : 'right: 30px;'}
  content: '';
  border-radius: 50%;

  ${({ theme }) => theme.breakPoints['480px']} {
    filter: blur(40px);
    background: ${({ type }) => type === 'strike' ? 'rgba(42,109,255,.2)' 
                           : (type === 'up' ? 'rgba(0,194,19,.2)' : 'rgba(226,14,85,.2)')};
    ${({ type }) => type === 'strike' ? 'top: calc(45% - 40px)' : 'bottom: calc(45% - 60px)'};
  }
`