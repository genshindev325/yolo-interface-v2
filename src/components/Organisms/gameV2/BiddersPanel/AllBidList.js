import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { PlayerItem } from 'components/Molecules/gameV2/PlayerItem'
import { IconLib } from 'components/Atoms/IconLib'

export const AllBidList = ({ bidders, activeCardRoundIndex }) => {
  const [players, setPlayers] = useState({ up: [], down: [] })
  const [playerCount, setPlayerCount] = useState(0)
  useEffect(() => {
    if (bidders) {
      const up = bidders.filter((bid) => {
        return bid.direction === 'up'
      })
      const down = bidders.filter((bid) => {
        return bid.direction === 'down'
      })
      const playerArray = bidders.map((bid) => bid.player.id)
      const uniquePlayerArray = playerArray.filter((item, pos, self) => {
        return self.indexOf(item) == pos
      })
      setPlayers({ up, down })
      setPlayerCount(uniquePlayerArray?.length)
    }
  }, [bidders])

  return (
    <Container>
      <Title>
        Bids in round <strong>{activeCardRoundIndex}</strong>
      </Title>
      <ModuleBoxes>
        <Box>
          {bidders?.length} <strong>Total bids</strong>
        </Box>
        <Box>
          {playerCount} <strong>Players</strong>
        </Box>
      </ModuleBoxes>
      <BidderList>
        <BidColumn>
          <BidTitle>
            <Number isUp={false}> {players?.down.length} </Number>
            <IconArrow isUp={false} masking></IconArrow>
          </BidTitle>
          <List isUp={false}>
            <ScrollList>
              {players?.down.length > 0 ? (
                players?.down.map((player, index) => <PlayerItem key={index} playerItem={player} />)
              ) : (
                <NoBids>No down bids available</NoBids>
              )}
            </ScrollList>
          </List>{' '}
        </BidColumn>
        <BidColumn>
          <BidTitle>
            <Number isUp={true}> {players?.up.length} </Number>
            <IconArrow isUp={true} masking></IconArrow>
          </BidTitle>
          <List isUp={true}>
            <ScrollList>
              {players?.up.length > 0 ? (
                players?.up.map((player, index) => <PlayerItem key={index} playerItem={player} />)
              ) : (
                <NoBids>No up bids available</NoBids>
              )}
            </ScrollList>
          </List>
        </BidColumn>
      </BidderList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
`
const Title = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.9rem;
  text-align: center;
  border-radius: 10px;

  strong {
    font-weight: 600;
    padding-left: 5px;
  }
`
const BidderList = styled.div`
  flex 1 1 auto;
  display: grid;
  grid-template: 100% /1fr 1fr;
  width: 100%;
  background: rgba(152, 183, 253, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 0px 0px 45px -1px rgb(23 27 34 / 31%);
  
  ${({ theme }) => theme.breakPoints['xl']} {
    padding-bottom: 10px;
    border-radius: 10px;
  }
`
const BidColumn = styled.div`
  overflow: hidden;
  margin-top: 20px;

  ${({ theme }) => theme.breakPoints['xl']} {
    margin-top: 10px;
  }
`
const BidTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  line-height: 100%;
  flex-direction: row;
  width: 100%;
  font-size: 0.9rem;
  padding: 0 20px 0 30px;
`
const ModuleBoxes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 0 6px 0;
`
const Box = styled.div`
  width: 50%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 1.7rem;
  font-weight: 200;
  margin: 0 6px 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  backdrop-filter: blur(5px);
  line-height: 100%;
  letter-spacing: -0.03em;

  & strong {
    font-weight: 600;
    font-size: 0.75rem;
    opacity: 0.4;
    text-transform: uppercase;
    padding: 0 0 0 10px;
    letter-spacing: 0;
    line-height: 120%;

    ${({ theme }) => theme.breakPoints['xl']} {
      line-height: 100%;
		  font-size: .7rem;
    }
  }

  &:last-child {
    margin-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${({ theme }) => theme.breakPoints['xl']} {
    font-size: 1.3rem;
		padding: 12px 20px 10px 20px;
    &:last-child {
      border-radius: 10px;
    }
  }
`
const Number = styled.div`
  font-weight: 600;
  padding: 0 10px 0 0;
  font-size: 0.9rem;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;

  color: ${({ isUp }) => (isUp ? '#00c213 !important' : '#e20e55 !important')};
`
const IconArrow = styled(IconLib).attrs(({ isUp }) => {
  return {
    collection: 'general',
    name: 'arrow',
    dimension: '16px',
    rotate: isUp ? 'up' : 'down'
  }
})`
  margin-right: 8px;
  background: ${({ isUp }) => (isUp ? `rgba(0,194,19,1.0)` : `rgba(226,14,85,1.0)`)};
  display: flex;
`
const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ isUp }) => isUp ? '0 15px 0 15px': '0px 15px 0 30px'};
  ${({ isUp }) => isUp ? 'margin: 0 15px 0 0;': ''}
  height: 100%;

  ${({ theme }) => theme.breakPoints['xl']} {
    padding: ${({ isUp }) => isUp ? '0 10px 0 20px': '0px 15px 0 20px'};
    ${({ isUp }) => isUp ? 'margin: 0 10px 0 0;': ''}
  }
`
const ScrollList = styled.div`
  flex: 1 0 1px;
  overflow-y: auto;
`

const NoBids = styled.div`
  overflow-y: auto;
  font-weight: 400;
  font-size: 0.8rem;
`
