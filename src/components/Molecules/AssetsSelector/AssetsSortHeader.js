import React from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
export const AssertsSortHeader = ({ onClick }) => {
  return (
    <AssetsMenuHeader id='show_sort_placeholder_future_feature'>
      <SortForm>
        <SortFieldWrapper>
          <strong>Sort by</strong>
          <DropDown id='sort_dropdown_placeholder_future_feature'>
            Highest price
            <ArrowIcon />
          </DropDown>
        </SortFieldWrapper>
        <SortFieldWrapper>
          <strong>Round length</strong>
          <DropDown id='sort_dropdown_placeholder_future_feature'>
            <CubeIcon />
            70
            <ArrowIcon />
          </DropDown>
        </SortFieldWrapper>
      </SortForm>
    </AssetsMenuHeader>
  )
}

const AssetsMenuHeader = styled.div`
  padding: 15px 20px 15px 20px;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  ${({ theme }) => theme.breakPoints['425px']} {
    padding: 10px;
  }
`
const SortForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: nowrap;
`
const SortFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.8rem;
  &:first-child {
    padding: 0 10px 0 0;
  }
  strong {
    padding: 0 10px 0 0;
    display: flex;
  }
  ${({ theme }) => theme.breakPoints['425px']} {
    flex-direction: column;
    align-items: flex-start;
    strong {
      padding: 0 5px;
    }
  }
`
const DropDown = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 5px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const ArrowIcon = styled(IconLib).attrs((props) => ({
  collection: 'general',
  name: 'arrow',
  rotate: 'up',
  dimension: '10px',
  masking: true
}))`
  margin: 0 0 0 15px;
`
const CubeIcon = styled(IconLib).attrs((props) => ({
  collection: 'crypto',
  name: 'block',
  dimension: '13px',
  masking: true
}))`
  margin: 0 5px 0 0;
`
