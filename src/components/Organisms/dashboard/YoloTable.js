import React, { useState } from 'react'
import styled from 'styled-components'

import { Card } from 'components/Atoms/Card'
import { Grid } from 'components/Atoms/Grid'
import { Cell } from 'components/Atoms/Grid/Cell'
import { HeaderCell } from 'components/Atoms/Grid/HeaderCell'
import { IconLib } from 'components/Atoms/IconLib'

import { Dropdown } from 'components/Atoms/Dropdown'
import { tableData } from 'datasource/dashboard'

export const YoloTable = () => {
  const [sortBy, setSortBy] = useState({ fieldId: tableData.sortOptions[0].id, isSortUp: false })
  const [timePeriod, setTimePeriod] = useState({ fieldId: tableData.timeOptions[0].id, isSortUp: false })

  return (
    <Container>
      <YoloCard>
        <Menu>
          <SortDropdown label='Sort by' options={tableData.sortOptions} onChange={setSortBy} value={sortBy} />
          <TimeDropdown
            label='Time period'
            options={tableData.timeOptions}
            onChange={setTimePeriod}
            value={timePeriod}
          />
        </Menu>
        <GridContainer>
          <Grid>
            {tableData.tableHeader.map((headerText, index) => (
              <HeaderCell text={headerText} key={index} />
            ))}
            {tableData.tableData.map((rowData, index) => {
              return (
                <>
                  <DateCell key={`a-${index}`}>{rowData[0]}</DateCell>
                  <TotalYoloEarningsCell key={`b-${index}`}>{rowData[1]}</TotalYoloEarningsCell>
                  <FeesEarnedCell key={`c-${index}`}>
                    <div>{rowData[2]}</div>
                  </FeesEarnedCell>
                  <YoloVolumeCell key={`d-${index}`}>
                    <div>{rowData[3]}</div>
                  </YoloVolumeCell>
                  <PercentageOfPoolCell key={`e-${index}`}>
                    <div>{rowData[4]}</div>
                  </PercentageOfPoolCell>
                </>
              )
            })}
          </Grid>
        </GridContainer>
      </YoloCard>
    </Container>
  )
}

const Container = styled.div`
  margin: 5px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: default;
  grid-template-areas: 'card1 card2';
  grid-gap: 5px;

  @media only screen and (min-width: 750px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin-top: 10px;
  }

  @media (max-width: 576px) {
    margin: 5px 0;
  }
`

const YoloCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const Menu = styled.div`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const SortDropdown = styled(Dropdown)`
  display: none;
  margin-right: 30px;

  @media (max-width: 480px) {
    &:nth-child(1) {
      margin-right: 0;
    }
  }
`

const TimeDropdown = styled(Dropdown)`
  display: flex;

  @media (max-width: 480px) {
    &:nth-child(1) {
      margin-right: 0;
    }
  }
`

const GridContainer = styled.div`
  width: 100%;
`

const DateCell = styled(Cell)`
  background: rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`

const TotalYoloEarningsCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {
    &:before {
      content: 'Total YOLO earnings';
    }
  }
`

const FeesEarnedCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {
    &:before {
      content: 'Fees earned';
    }
  }
`

const YoloVolumeCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {
    &:before {
      content: 'YOLO volume';
    }
  }
`

const PercentageOfPoolCell = styled(Cell)`
  @media only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {
    &:before {
      content: '% of Pool / Token balance';
    }
  }
`

const IconSort = styled(IconLib).attrs({ collection: 'general', name: 'arrow', rotate: 'up' })`
  width: 12px;
  height: 8px;
  background: #fff;
`
