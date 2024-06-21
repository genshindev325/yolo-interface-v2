import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectActiveGameId,
  selectStrikePrice,
  selectCurrentPrice,
  selectSettlementPrice,
  selectIsPriceFeedConnected,
  selectGraphData,
  selectUpdatePriceScaled,
  selectModalShow
} from 'redux/selectors'
import { config } from 'config'

import { PriceGauge } from './PriceGauge'
import { BackgroundChart } from './PriceGauge/BackgroundChart'
import { getGameParameters } from 'config/games.config'

const getPlotData = (array) => {
  const plotValues = array.map((item) => item[1][1])
  const minMaxArray = plotValues.map((item) => Math.abs(item))
  const max = Math.max(...minMaxArray)
  const min = max * -1
  return { plotValues, min, max }
}

export const PriceScale = () => {
  const gameId = useSelector(selectActiveGameId())
  const strikePrice = useSelector(selectStrikePrice())
  const currentPrice = useSelector(selectCurrentPrice())
  const settlementPrice = useSelector(selectSettlementPrice())
  const isConnected = useSelector(selectIsPriceFeedConnected())
  const graphData = useSelector(selectGraphData(gameId))
  const updatePriceScaled = useSelector(selectUpdatePriceScaled())
  const isModalVisible = useSelector(selectModalShow())

  const [plotData, setPlotData] = useState()
  const [lastPoint, setLastPoint] = useState()
  const [priceCursorY, setPriceCursorY] = useState()
  const [ticksYPosition, setTicksYPosition] = useState()
  const gameGraphData = graphData || []

  const showPriceScale = !!(currentPrice && strikePrice && isConnected)
  const getLastPointY = (Y) => setPriceCursorY(Y)
  const getTicksYPosition = (ticksY) => setTicksYPosition(ticksY)

  // const graphResolution = useMemo(() => {
  //   if (gameId) {
  //     const { AVRG_BLOCK_MINT_TIME, GAME_BLOCK_LENGTH } = getGameParameters(gameId)
  //     return (AVRG_BLOCK_MINT_TIME * GAME_BLOCK_LENGTH) / 1000
  //   }
  // }, [gameId])

  useEffect(() => {
    //if (graphData.length && graphData.length <= graphResolution) {
    if (graphData.length) {
      const lastPoint = gameGraphData.length && gameGraphData[gameGraphData.length - 1][0]
      const plotData = getPlotData(gameGraphData)
      isModalVisible || (updatePriceScaled && setLastPoint(lastPoint))
      isModalVisible || (updatePriceScaled && setPlotData(plotData))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData])

  return useMemo(
    () => (
      <PriceScaleWrapper>
        {showPriceScale && (
          <PriceGauge
            gameId={gameId}
            currentPrice={settlementPrice || lastPoint || strikePrice}
            strikePrice={strikePrice}
            isEndRound={!!settlementPrice}
            priceCursorY={priceCursorY}
            ticksYPosition={ticksYPosition}
          />
        )}
        {showPriceScale && (
          <BackgroundChart
            gameId={gameId}
            plotData={plotData}
            strikePrice={strikePrice}
            getLastPointY={getLastPointY}
            getTicksYPosition={getTicksYPosition}
          />
        )}
      </PriceScaleWrapper>
    ),
    [graphData.length]
  )
}

const PriceScaleWrapper = styled.div`
  position: relative;
  align-self: stretch;
  justify-self: stretch;
  display: grid;
  height: 100%;
  ${({ theme }) => theme.breakPoints['xl']} {
    padding: 60px 50px;
  }
  ${({ theme }) => theme.breakPoints['1024px']} {
    padding: 20px 0;
  }
`
