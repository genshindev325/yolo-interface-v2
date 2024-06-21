import React from 'react'
import styled, { css } from 'styled-components'

import { getGameParameters } from 'config/games.config'
import { currencyFormatter } from 'utils'

import { SharedBlur } from './shared-comps'

const MIN_Y_POSITION = 25

export const PriceCursor = React.memo(({ gameId, currentPrice, strikePrice, isEndRound, positionY }) => {
  const positionInRange = Math.max(positionY, MIN_Y_POSITION)
  const position = (currentPrice !== strikePrice && `${positionInRange}px`) || '50%'
  const isUp = currentPrice - strikePrice >= 0
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, name } = getGameParameters(gameId)

  return (
    <CursorWrapper id='cursorWrapper' position={position}>
      <Title>{isEndRound ? 'End Price' : 'Current Price'}</Title>
      <PriceText isUp={isUp}>
        {currencyFormatter(currentPrice || 0, { decimalDigits })}
        {/* <BlurEffect isUp={isUp} /> */}
      </PriceText>
      <GameIdText isUp={isUp}>{name}</GameIdText>
    </CursorWrapper>
  )
})

const cssUp = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphGlowUp},
    1px -1px 0 ${theme.themeColors.priceGraphGlowUp},
    -1px 1px 0 ${theme.themeColors.priceGraphGlowUp},
    1px 1px 0 ${theme.themeColors.priceGraphGlowUp}
    `};
  color: ${({ theme }) => theme.themeColors.priceGraphGlowUp};
`
const cssDown = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphGlowDown},
    1px -1px 0 ${theme.themeColors.priceGraphGlowDown},
    -1px 1px 0 ${theme.themeColors.priceGraphGlowDown},
    1px 1px 0 ${theme.themeColors.priceGraphGlowDown}
    `};
  color: ${({ theme }) => theme.themeColors.priceGraphGlowDown};
`

const CursorWrapper = styled.div.attrs((props) => {
  return {
    style: {
      top: props.position
    }
  }
})`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  right: 0;
  padding: 0px 30px;
  transform: translateY(-58%);
  transition: top 0.1s ease 0s;
  z-index: 1;
`
const Title = styled.label`
  font-family: 'Inter';
  font-size: 0.9rem;
  font-weight: 500;
`
const PriceText = styled.div`
  position: relative;
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
  background: none;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 3px 0 0 0;
  letter-spacing: -0.02em;
  line-height: 1em;
  color: rgba(255, 255, 255, 1);
  ${({ theme }) => theme.breakPoints['xs']} {
    font-size: 1.4rem;
  }
`
const GameIdText = styled.label`
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
  text-shadow: none;
  margin: 5px 0 0 0;
  font-size: 0.7rem;
  font-weight: 600;
`
const BlurEffect = styled(SharedBlur)`
  ${({ isUp }) => (isUp ? cssUp : cssDown)}
  background:${({ isUp, theme }) =>
    isUp
      ? theme.utils.addOpacityToHexColor(theme.themeColors.priceGraphGlowUp, 60)
      : theme.utils.addOpacityToHexColor(theme.themeColors.priceGraphGlowDown, 60)};
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
`
