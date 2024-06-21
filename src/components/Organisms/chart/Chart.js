import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

require('highcharts/modules/exporting')(Highcharts)
require('highcharts/highcharts-more')(Highcharts)

export const Chart = ({ options, className, getRef }) => {
  const highchartRef = useRef(null)

  useEffect(() => {
    getRef(highchartRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper id='graphWrapper' className={className} isUp={options.isUp}>
      <HighchartsReact ref={highchartRef} highcharts={Highcharts} options={options} containerProps={{ className }} />
    </Wrapper>
  )
}

const downGlow = css`
  filter: ${({ theme }) => `drop-shadow(0 0 1rem ${theme.themeColors.priceGraphGlowDown})`};
`
const upGlow = css`
  filter: ${({ theme }) => `drop-shadow(0 0 1rem ${theme.themeColors.priceGraphGlowUp})`};
`

const Wrapper = styled.figure`
  rect.highcharts-background {
    fill: transparent;
  }
  .highcharts-root text.highcharts-credits {
    display: none !important;
  }
  .highcharts-container ul {
    display: none !important;
  }
  .highcharts-exporting-group {
    display: none;
  }
  .highcharts-legend {
    display: none;
  }
  .highcharts-series {
    width: 50%;
  }
  path.highcharts-graph {
    ${({ isUp }) => (isUp ? upGlow : downGlow)}
  }
`
