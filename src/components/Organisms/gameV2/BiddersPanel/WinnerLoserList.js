import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectActiveGameId, selectWalletAddress } from 'redux/selectors'
import { getGameParameters } from 'config/games.config'

import { UP, DOWN } from 'utils/constants'
import { IconLib } from 'components/Atoms/IconLib'
import { PlayerItem } from 'components/Molecules/gameV2/PlayerItem'

export const WinnerLoserList = ({ bidders, gaugeData, activeCardRoundIndex }) => {
  const gameId = useSelector(selectActiveGameId())
  const myAddress = useSelector(selectWalletAddress())
  const [players, setPlayers] = useState({ winners: [], loser: [] })
  const otherBidders = bidders.othersBids
  const myBids = bidders.myBids
  const gameParams = (gameId && getGameParameters(gameId)) || {}
  const gameName = gameParams?.name
  const gameIcon = gameParams?.icon

  useEffect(() => {
    if (otherBidders && gaugeData) {
      const { up: totalUp, down: totalDown } = gaugeData
      const winBids = otherBidders.filter((bid) => {
        return bid.direction === bid.winDirection
      })
      let winners = winBids.map((bid) => {
        const bidAmount = parseFloat(bid.amount);
        const bidDirection = bid.direction;
        const fee = 0.97
        let winAmount = 0;
        if (bidDirection === UP) {
          winAmount = ((bidAmount / totalUp) * totalDown + bidAmount) * fee
        } else if (bidDirection === DOWN) {
          winAmount = ((bidAmount / totalDown) * totalUp + bidAmount) * fee
        }
        return { player: bid.player, amount: winAmount }
      })
      let loser = otherBidders.filter((bid) => {
        return bid.direction !== bid.winDirection
      })

      let myNetBid = 0;

      myBids.forEach((bid) => {
        const winDirection = bid.winDirection
        const bidAmount = parseFloat(bid.amount)
        const bidDirection = bid.direction
        const fee = 0.97
        if (winDirection === bid.direction && bidDirection === UP) {
          myNetBid += ((bidAmount / totalUp) * totalDown + bidAmount) * fee
        } else if (winDirection === bid.direction && bidDirection === DOWN) {
          myNetBid += ((bidAmount / totalDown) * totalUp + bidAmount) * fee
        } else {
          myNetBid -= bidAmount
        }
      })

      if (myNetBid > 0) winners.insert(0, { player: { id: myAddress }, amount: myNetBid, isMe: true })
      else if (myNetBid < 0) loser.insert(0, { player: { id: myAddress }, amount: Math.abs(myNetBid), isMe: true })
      setPlayers({ winners, loser })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidders, gaugeData])

  return (
    <Container>
      <Title>
        WINS AND LOSSES IN ROUND <strong>{activeCardRoundIndex}</strong>
      </Title>
      <ModuleBoxes>
        <Box>
          {players?.winners.length} <strong>TOTAL WINS</strong>
        </Box>
        <Box>
          {players?.loser.length} <strong>TOTAL LOSSES</strong>
        </Box>
      </ModuleBoxes>
      <BidderList>
        <BidColumn>
          <List isUp={false}>
            <ScrollList>
              {players?.winners.length > 0 ? (
                players?.winners.map((player, index) => <PlayerItem key={index} playerItem={player} />)
              ) : (
                <NoBids>No winners available</NoBids>
              )}
            </ScrollList>
          </List>{' '}
        </BidColumn>
        <BidColumn>
          <List isUp={true}>
            <ScrollList>
              {players?.loser.length > 0 ? (
                players?.loser.map((player, index) => <PlayerItem key={index} playerItem={player} />)
              ) : (
                <NoBids>No lossers available</NoBids>
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
