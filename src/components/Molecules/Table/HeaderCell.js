import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'

export const HeaderCell = ({ hData, sortBy, onSortClick }) => {
  const [isSortUp, setIsSortUp] = useState(sortBy.isSortUp)

  const hideHeader = ['button'].includes(hData.dataType)

  const onIconClick = () => {
    onSortClick({ fieldId: hData.id, isSortUp: !isSortUp })
    setIsSortUp(!isSortUp)
  }
  useEffect(() => {
    if (hData.id === sortBy.fieldId) {
      setIsSortUp(sortBy.isSortUp)
    }
  }, [sortBy, hData.id])

  const sortByMe = useMemo(() => {
    if (hData.id === sortBy.fieldId) {
      return true
    } else return false
  }, [sortBy, hData.id])

  return (
    <HeaderCellWrapper onClick={onIconClick} sortByMe={sortByMe}>
      {!hideHeader && (
        <>
          <Caption>{hData.caption}</Caption>
          <SortBy>
            <SortIcon isUp={isSortUp} />
          </SortBy>
        </>
      )}
    </HeaderCellWrapper>
  )
}
const HeaderCellWrapper = styled.div`
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 12px;
  border-top: 1px solid ${({ sortByMe }) => (sortByMe ? '#2A6DFF' : 'transparent')};
  &:hover {
    //border-top: 1px solid #2a6dff;
    background: rgba(255, 255, 255, 0.1);
  }
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: none;
  }
`
const Caption = styled.strong`
  font-weight: 600;
  margin: 0 3px 0 0;
`
const SortBy = styled.div`
  margin: 0 0 0 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 6px;
`
const SortIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5px 5px 5px;
  border-color: transparent transparent #fff transparent;
  transform: ${({ isUp }) => (isUp ? 'rotate(0deg)' : 'rotate(180deg)')};
`
