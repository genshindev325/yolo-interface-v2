import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { DataCell, DataCellWrapper } from './DataCell'
import { HeaderCell } from './HeaderCell'

export const Table = ({ sortBy, columns, data, onSort }) => {
  const [loading, setLoading] = useState(true)
  const onSortClick = ({ fieldId, isSortUp }) => {
    onSort({ fieldId, isSortUp })
  }
  const dataLength = useMemo(() => data.length, [data.length])
  const nColumns = useMemo(() => columns.length, [columns])
  const headerRow = columns.map((columnsData) => (
    <HeaderCell key={`hCell-${columnsData.id}`} hData={columnsData} sortBy={sortBy} onSortClick={onSortClick} />
  ))

  const dataRows = useCallback(() => {
    data.sort((a, b) => {
      const itemA = a[sortBy.fieldId]
      const itemB = b[sortBy.fieldId]
      if (itemA < itemB) return sortBy.isSortUp ? 1 : -1
      if (itemA > itemB) return sortBy.isSortUp ? -1 : 1
      return 0
    })
    return data.map((row) =>
      columns.map((item) => (
        <DataCell
          key={`dCell-${item.id}`}
          sortBy={sortBy}
          data={item.formatter ? item.formatter(row[item.id]) : row[item.id]}
          ranking={row.ranking}
          fieldId={item.id}
          beforeContent={item.caption}
        />
      ))
    )
  }, [sortBy, columns, dataLength])

  const Loading = () => <LoadingMoon id='loadingMoon' collection='yolorekt' name='LoadingMoon' masking />

  useEffect(() => {
    if (data.length) {
      setLoading(false)
    }
  }, [data])

  return useMemo(
    () => (
      <TableWrapper nColumns={nColumns}>
        {headerRow}
        {!loading ? dataRows() : <Loading />}
      </TableWrapper>
    ),
    [dataRows, headerRow, loading, nColumns, dataLength]
  )
}

const TableWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns:${({ nColumns }) => `repeat(${nColumns}, auto)`};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  width: 100%;
  ${({ theme }) => theme.breakPoints['1024px']} {
    grid-template-columns: 1fr;
    & ${DataCellWrapper}:nth-child(6n) {
      margin:  0 0 15px  0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
    & ${DataCellWrapper}:nth-child(6n+1) {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
}
    }
  }
`
const LoadingMoon = styled(IconLib)`
  position: absolute;
  top: 35vh;
  left: 50%;
  transform: translateX(-50%);
  height: 181px;
  width: 170px;
  background: white;
  z-index: 9;
`
