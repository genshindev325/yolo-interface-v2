import React from 'react'
import styled from 'styled-components'

import { GridLines } from './GridLines'
import { StrikeCursor } from './StrikeCursor'
import { PriceCursor } from './PriceCursor'

export const PriceGauge = ({ gameId, currentPrice, strikePrice, isEndRound, priceCursorY, ticksYPosition }) => {
  return (
    <GaugeWrapper>
      {/* ACZ - This is a component that is used to adjust the Strike Price cursor */}
      {/* <Strikeref id='strikeRef' /> */}
      <StrikeCursor gameId={gameId} strikePrice={strikePrice} />
      <PriceCursor
        gameId={gameId}
        currentPrice={currentPrice}
        strikePrice={strikePrice}
        isEndRound={isEndRound}
        positionY={priceCursorY}
      />
      <GridLines ticksYPosition={ticksYPosition} />
    </GaugeWrapper>
  )
}

//gameId, currentPrice, strikePrice, isEndRound, positionY

const GaugeWrapper = styled.div`
  position: relative;
  align-self: stretch;
  display: grid;
  grid-template: 1fr / 1fr;
  margin: 20px 0;
`

/* ACZ - This is a component that is used to adjust the Strike Price cursor */
/* const Strikeref = styled.div`
  position: absolute;
  height: 6px;
  width: 100%;
  top: 50%;
  border: 1px solid orange;
  transform: translateY(-50%);
`
 */
