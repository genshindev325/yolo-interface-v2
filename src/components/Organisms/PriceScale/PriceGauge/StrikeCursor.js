import React from 'react'
import styled, { css } from 'styled-components'

import { getGameParameters } from 'config/games.config'
import { currencyFormatter } from 'utils'

import { SharedBlur } from './shared-comps'

const CURSOR_Y_TRIMMER = 0 // in px

export const StrikeCursor = React.memo(({ gameId, strikePrice }) => {
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, name } = getGameParameters(gameId)
  return (
    <CursorWrapper id='newStrikeCirsor'>
      <Line />
      <TextBox>
        <Title>Strike Price</Title>
        <PriceText>
          {currencyFormatter(strikePrice || 0, { decimalDigits })}
          {/* <BlurEffect /> */}
        </PriceText>
        <GameIdText>{name}</GameIdText>
      </TextBox>
    </CursorWrapper>
  )
})

const cssStrike = css`
  text-shadow: ${({ theme }) =>
    `
    -1px -1px 0 ${theme.themeColors.priceGraphStrike},
    1px -1px 0 ${theme.themeColors.priceGraphStrike},
    -1px 1px 0 ${theme.themeColors.priceGraphStrike},
    1px 1px 0 ${theme.themeColors.priceGraphStrike}
    `};
  color: ${({ theme }) => theme.themeColors.priceGraphStrike};
`

const CursorWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  top: 50%;
  transform: translateY(-67%);
  margin: 0 0 0 30px;
  z-index: 1;
`
const TextBox = styled.div``
const Title = styled.label`
  font-family: 'Inter';
  font-size: 0.9rem;
  font-weight: 500;
`
const PriceText = styled.div`
  position: relative;
  ${cssStrike}
  color: ${({ theme }) => theme.themeColors.white};
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 10px;
  letter-spacing: -0.02em;
  line-height: 1em;
  ${({ theme }) => theme.breakPoints['xs']} {
    font-size: 1.4rem;
  }
`
const GameIdText = styled.label`
  ${cssStrike}
  text-shadow: none;
  margin: 5px 0 0 0;
  font-size: 0.7rem;
  font-weight: 600;
`

const Line = styled.div`
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
  top: 50%;
  bottom: 0;
  border-bottom: none;
  background: -webkit-linear-gradient(right, rgba(42, 109, 255, 0) 0%, rgba(42, 109, 255, 1) 100%);
  height: 4px;
  //border: 1px solid red;
  display: block;
  ::after {
    content: '';
    width: 100%;
    position: absolute;
  }
`
const BlurEffect = styled(SharedBlur)`
  background: rgba(42, 109, 255, 0.8);
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
`
