import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectGameIdCurrentRoundIndex } from 'redux/selectors'

import { BetsGauge } from './BetsGauge'
import { YourBids } from './YourBids'
import { AllBidList } from './AllBidList'
import { WinnerLoserList } from './WinnerLoserList'
import { TotalWonLost } from './TotalWonLost'

export const BiddersBoard = ({ className, data }) => {
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex())
  const gaugeData = data.gaugeValues
  const bidders = data.bidders
  const activeCardRoundIndex = data.activeCardRoundIndex
  return (
    <Container className={className}>
      <YourBids bids={bidders.myBids} />
      {useMemo(
        () => (
          activeCardRoundIndex < gameIdCurrentRoundIndex ? <WinnerLoserList bidders={bidders} gaugeData={gaugeData} activeCardRoundIndex={activeCardRoundIndex}/>
            : <AllBidList bidders={bidders.othersBids} activeCardRoundIndex={activeCardRoundIndex} />
        ),
        // eslint-disable-next-line
        [activeCardRoundIndex, gameIdCurrentRoundIndex, gaugeData, bidders.othersBids.length]
      )}
      {useMemo(
        () => (
          activeCardRoundIndex < gameIdCurrentRoundIndex ? <TotalWonLost data={gaugeData} winDirection={bidders.othersBids[0].winDirection}/> : <BetsGauge data={gaugeData} />
        ),
        // eslint-disable-next-line
        [activeCardRoundIndex, bidders.othersBids.length]
      )}
    </Container>
  )
}

const Container = styled.div`
  min-width: 250px;
  display: grid;
  grid-template: auto 1fr auto / 100%;
  position: relative;
  padding: 0 0 0 15px;
  ${({ theme }) => theme.breakPoints['xl']} {
    max-width: 100vw;
    width: 100vw;
    margin: 0;
    border-radius: 0;
    top: 0;
    position: relative;
    padding: 0 15px;
  }
`
