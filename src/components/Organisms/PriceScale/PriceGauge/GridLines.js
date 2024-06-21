import React, { useCallback, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { scaleLinear } from 'd3'
import { useViewport } from 'contexts/viewport/useViewport'

export const GridLines = ({ ticksYPosition }) => {
  const yPosArray = ticksYPosition || []

  const lineWrapperRef = useRef()
  const { width: wpWidth } = useViewport()

  const opacityInterpolator = useCallback(() => {
    const max = Math.max(...ticksYPosition)
    const min = Math.min(...ticksYPosition)
    const areaGap = max - min
    const domainArray = [0, 0.25, 0.5, 0.75, 1].map((factor) => min + areaGap * factor)
    const rangeArray = [0, 0.1, 0.2, 0.1, 0]
    return scaleLinear().domain(domainArray).range(rangeArray).clamp(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticksYPosition?.length])

  const xOffset = useMemo(() => {
    const { left } = lineWrapperRef.current?.getBoundingClientRect() || {}
    return -left
  }, [lineWrapperRef.current, wpWidth])

  return useMemo(
    () => (
      <GridLinesWrapper ref={lineWrapperRef}>
        {yPosArray.map((yPos, idx) => (
          <Line key={`Line-${idx}`} yPos={yPos} xOffset={xOffset} yOpacity={opacityInterpolator()(yPos)} />
        ))}
      </GridLinesWrapper>
    ),
    [ticksYPosition?.length]
  )
}

const GridLinesWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`
const Line = styled.div.attrs((props) => ({
  style: {
    background: props.theme.themeColors.priceGraphScale,
    top: `${props.yPos}px`,
    left: `${props.xOffset}px`,
    opacity: props.yOpacity
  }
}))`
  position: absolute;
  width: 100vw;
  height: 2px;
`
