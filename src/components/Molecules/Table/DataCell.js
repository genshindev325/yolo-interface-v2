import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const DataCell = ({ sortBy, data, ranking, fieldId, beforeContent }) => {
  const icon = ranking < 2 ? <CrownIcon /> : <AwardStar ranking={ranking} />

  const sortByMe = useMemo(() => {
    if (sortBy && fieldId === sortBy.fieldId) {
      return true
    } else return false
  }, [sortBy, fieldId])

  return (
    <DataCellWrapper beforeContent={beforeContent} sortByMe={sortByMe}>
      {fieldId === 'userId' && ranking < 4 && icon}
      {data}
    </DataCellWrapper>
  )
}
export const DataCellWrapper = styled.div`
  display: flex;
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.breakPoints['1024px']} {
    flex-direction: row;
    padding: 0 8px;
    align-items: center;
    justify-content: flex-start;
    &:before {
      content: '${({ beforeContent }) => beforeContent}';
      white-space: nowrap;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      border-left: 1px solid ${({ sortByMe }) => (sortByMe ? '#2A6DFF' : 'transparent')};
      padding: 8px;
      background: rgba(255, 255, 255, 0.05);
      left: -8px;
      position: relative;
      min-width: 120px;
      text-align: left;
    }
  }
`
const CrownIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'leaderCrown'
})`
  width: 31px;
  height: 20px;
  display: flex;
  margin: 0 3px 0 -31px;
  ${({ theme }) => theme.breakPoints['1024px']} {
    margin: 0 3px 0 0px;
  }
`

const AwardStar = styled(IconLib).attrs({
  collection: 'general',
  name: 'awardStar',
  masking: true
})`
  background: ${({ ranking }) => (ranking < 3 ? '#ccc' : '#985400')};
  width: 18px;
  height: 16px;
  display: flex;
  margin: 0 5px 0 -18px;
  ${({ theme }) => theme.breakPoints['1024px']} {
    margin: 0 5px 0 0px;
  }
`
