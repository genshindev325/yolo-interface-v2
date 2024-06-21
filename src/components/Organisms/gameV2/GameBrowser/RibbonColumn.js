import React from 'react'
import styled from 'styled-components'
import { EndedRibbon, LiveRibbon, NextRibbon } from './RibbonCards'
import { LONGDASH } from 'utils/constants'

export const RibbonColumn = ({ data, onClick }) => {
  const columnRoundOffset = data[0].cardRoundOffset
  const ColumnCard =
    columnRoundOffset < 0 ? (
      <EndedRibbon className='ribbon' emptyAmountSymbol={LONGDASH} />
    ) : columnRoundOffset > 0 ? (
      <NextRibbon className='ribbon' emptyAmountSymbol={LONGDASH} />
    ) : (
      <LiveRibbon className='ribbon' emptyAmountSymbol={LONGDASH} />
    )

  return (
    <ColumnWrapper onClick={onClick}>
      {data.map((props, index) => React.cloneElement(ColumnCard, { key: index, ...props }))}
    </ColumnWrapper>
  )
}

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
