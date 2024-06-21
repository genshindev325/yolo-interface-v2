import { useState, useEffect, useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { scaleLinear } from 'd3'

import Highcharts from 'highcharts'

import { getGameParameters } from 'config/games.config'

import { Chart } from 'components/Organisms/chart/Chart'

const SHOW_GRID_LINE_LABEL = false
const LINE_THICKNESS = 3

const interpolator = scaleLinear().domain([0, 10]).range([16, 36]).clamp(true)

const calcLines = (maxDelta) => {
  let interpolatedLines = Math.round(interpolator(maxDelta))
  if (!(interpolatedLines % 2)) interpolatedLines += 1
  return interpolatedLines
}

export const BackgroundChart = ({ gameId, plotData, strikePrice, getLastPointY, getTicksYPosition }) => {
  const [highchartRef, setHighchartRef] = useState([])
  const [nLines, setNLines] = useState(16)
  const theme = useContext(ThemeContext)

  const graphResolution = useMemo(() => {
    const { AVRG_BLOCK_MINT_TIME, GAME_BLOCK_LENGTH } = getGameParameters(gameId)
    //return (AVRG_BLOCK_MINT_TIME * GAME_BLOCK_LENGTH) / 1000
    return (AVRG_BLOCK_MINT_TIME * 10) / 1000
  }, [gameId])

  const lastPoint = plotData?.plotValues.length && plotData.plotValues[plotData.plotValues.length - 1]

  useEffect(() => {
    if (highchartRef.current && lastPoint) {
      const { plotValues, min, max } = plotData
      plotValues.shift()
      const plotValuesFilled = plotValues.concat(
        Array(graphResolution - plotValues.length >= 0 ? graphResolution - plotValues.length : 0).fill(lastPoint)
      )
      const chart = highchartRef.current.chart
      chart.yAxis[0].setExtremes(min, max)
      chart.series[0].setData(plotValuesFilled, true, false, true)
      const nLines = calcLines(max)
      const graphPath = chart.series[0].graphPath
      const lastPlotPoint = graphPath[graphPath.length - 1]
      const yAxisVals = []
      const yAxisTick = chart.yAxis.map((axis) => axis.ticks)
      yAxisTick.forEach((item, idx) => {
        yAxisVals[idx] = []
        Highcharts.objectEach(item, (tick) => yAxisVals[idx].push(tick.gridLine.pathArray[0][2]))
      })

      getTicksYPosition(yAxisVals[0])
      getLastPointY(lastPlotPoint?.[2])
      setNLines(nLines * 2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plotData])

  const chartOptions = {
    isUp: !!(lastPoint > 0),
    chart: {
      type: 'spline',
      marginTop: 15,
      marginBottom: 65,
      marginLeft: 0,
      marginRight: 30,
      width: null,
      height: null
    },
    xAxis: {
      visible: false,
      crossing: 0,
      opposite: true,
      margin: 20
    },
    yAxis: [
      {
        visible: true,
        endOnTick: true,
        startOnTick: true,
        title: false,
        gridLineColor: 'transparent',
        gridLineWidth: 0.5,
        tickAmount: nLines,
        labels: {
          enabled: SHOW_GRID_LINE_LABEL,
          align: 'left',
          x: 0,
          y: 0,
          staggerLines: 4,
          formatter: function () {
            const labelValue = Number(this.axis.defaultLabelFormatter.call(this))
            if (!labelValue) return ''
            const newLabel = (strikePrice + Number(labelValue)).toFixed(2)
            return newLabel
          }
        }
      },
      {}
    ],
    rangeSelector: {
      selected: 1
    },
    title: {
      text: ''
    },
    plotOptions: {
      animation: false,
      spline: {
        enableMouseTracking: false,
        lineWidth: LINE_THICKNESS,

        marker: {
          enabled: false
        }
      },
      line: {
        enableMouseTracking: false,
        lineWidth: LINE_THICKNESS,
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Current',
        animation: false,
        color: lastPoint > 0 ? theme.themeColors.priceGraphUp : theme.themeColors.priceGraphDown
      }
    ]
  }

  return (
    <Container id='containerGraph'>
      <StyledLineChart id='lineChart' options={chartOptions} getRef={setHighchartRef} />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  display: block;
  height: 100%;
  width: 100%;
`
const StyledLineChart = styled(Chart)`
  position: absolute;
  margin: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
