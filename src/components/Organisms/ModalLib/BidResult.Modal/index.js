import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { currencyFormatter } from 'utils'
import { gameDataActions, priceFeedActions, reduxWalletActions } from 'redux/actions'

import { selectWalletAddress } from 'redux/selectors'
import { Typography } from 'components/Atoms/Typography'
import { CoinRains } from './CoinRains'
import { getGameParameters } from 'config/games.config'

import { getThreeDotAddress, capitalizeFirst } from 'utils'
import { UP, DOWN, WINNER, LOSER, PUSH } from 'utils/constants'

export const BidResultModal = ({ closeModal, variant = WINNER, resultObj }) => {
  const dispatch = useDispatch()
  const { gameId, roundIndex, amount, strikePrice, settlementPrice, allPlayers = [], winDirection } = resultObj
  const loseDirection = winDirection === UP ? DOWN : UP
  const { FIAT_DECIMAL_SHOW_DIGITS: decimalDigits, FIAT_MAX_DECIMALS_DIGITS } = getGameParameters(gameId);
  const address = useSelector(selectWalletAddress())

  const onBidNextClick = () => {
    dispatch(gameDataActions.bidOnNext())
    closeModal({ unupdatePriceScale: true })
  }

  useEffect(() => {
    dispatch(priceFeedActions.pauseUpdate(true))
    dispatch(reduxWalletActions.updateBalance())
    return () => dispatch(priceFeedActions.pauseUpdate(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container id='resultModalContainer' isLoser={variant === LOSER}>
      {variant === WINNER && <CoinRains />}
      <YouWonLost>{variant === WINNER ? 'You Won!' : variant === LOSER ? 'You Lost' : 'You Pushed'}</YouWonLost>
      <Amount>{currencyFormatter(amount)}</Amount>
      {variant === WINNER && <Notes>Your winnings will appear shortly in your Wallet</Notes>}
      {variant === LOSER && <Notes>Your losses will reflect shortly in your Wallet</Notes>}
      {variant === PUSH && <Notes>Your bid(s) have been returned and will appear shortly in your Wallet</Notes>}
      <WhichRound>Round {roundIndex}</WhichRound>

      <PriceWrap>
        <Price>
          <strong>Strike </strong>
          {currencyFormatter(strikePrice / FIAT_MAX_DECIMALS_DIGITS, { decimalDigits })}
        </Price>
        <Price>
          <strong>Settlement </strong>
          {currencyFormatter(settlementPrice / FIAT_MAX_DECIMALS_DIGITS, { decimalDigits })}
        </Price>
      </PriceWrap>

      <BidGameButton onClick={onBidNextClick}>BID IN NEXT ROUND</BidGameButton>
      <ListWrapper>
        <List direction={winDirection}>
          <Typography variant='caption'>
            {variant !== PUSH ? 'Winners' : ''}
            <strong>{`Bid ${capitalizeFirst(winDirection)}`}</strong>
          </Typography>
          <Grid>
            <GridHead>
              <strong>User</strong>
            </GridHead>
            <GridHead>
              <strong>Total Bids</strong>
            </GridHead>
            {/* TODO:: this should be in a separate or common component to be note redundant */}
            {allPlayers[winDirection].length > 0 &&
              allPlayers[winDirection].map((player, index) => {
                const username = player.username || getThreeDotAddress(player.player.id)
                const isMe = player.player.id.toLowerCase() === address.toLowerCase();
                const amountInUSD = (parseFloat(player.amount) * 0.035).toFixed(2)

                return (
                  <React.Fragment key={index}>
                    <GridCell isMe={isMe}>{isMe? 'Your Bid' : username}</GridCell>
                    <GridCell isMe={isMe}>
                      {winDirection === UP ? <UpIcon /> : <DownIcon />}
                      {currencyFormatter(amountInUSD)}
                    </GridCell>
                  </React.Fragment>
                )
              })}
            {/**********************************************************/}
          </Grid>
        </List>
        <List direction={loseDirection}>
          <Typography variant='caption'>
            {variant !== PUSH ? 'Losers' : ''}
            <strong>{`Bid ${capitalizeFirst(loseDirection)}`}</strong>
          </Typography>
          <Grid>
            <GridHead>
              <strong>User</strong>
            </GridHead>
            <GridHead>
              <strong>Total Bids</strong>
            </GridHead>
            {/* TODO:: this should be in a separate or common component to be note redundant */}
            {allPlayers[loseDirection].length > 0 &&
              allPlayers[loseDirection].map((player, index) => {
                const username = player.username || getThreeDotAddress(player.player.id)
                const isMe = player.player.id.toLowerCase() === address.toLowerCase();
                const amountInUSD = (parseFloat(player.amount) * 0.035).toFixed(2)

                return (
                  <React.Fragment key={index}>
                    <GridCell isMe={isMe}>{isMe? 'Your Bid' : username}</GridCell>
                    <GridCell isMe={isMe}>
                      {loseDirection === UP ? <UpIcon /> : <DownIcon />}
                      {currencyFormatter(amountInUSD)}
                    </GridCell>
                  </React.Fragment>
                )
              })}
            {/**********************************************************/}
          </Grid>
        </List>
      </ListWrapper>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(33, 38, 47, .6);
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: 800;
  flex-direction: column;
  &:before {
    position: absolute;
    background: ${({ isLoser }) => isLoser? 'linear-gradient(180deg, rgba(23,60,139,0.15) 0%, rgba(10,25,58,0.35) 60%, rgba(10,25,58,0.35) 85%, rgba(23,60,139,0.15) 100%)'
                                          : 'linear-gradient(180deg, rgba(23, 60, 139, 0.15) 0%, rgba(10, 25, 58, 0.95) 60%, rgba(10, 25, 58, 0.85) 85%, rgba(23, 60, 139, 0.15) 100%)'};
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    content: '';
    transform: translateZ(-50%);
  }
`

const YouWonLost = styled(Typography)`
  font-size: 5.8rem;
  font-weight: 200;
  position: relative;
  z-index: 9;
  letter-spacing: -0.05em;
  margin: 0;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 4.3rem;
  }
`
const Amount = styled(Typography)`
  font-size: 3.1rem;
  font-weight: 800;
  position: relative;
  z-index: 9;
  letter-spacing: -0.03em;
  margin: 20px 0 5px 0;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 2.7rem;
		letter-spacing: -.02em;
		margin: 5px 0;
  }
`
const WhichRound = styled.div`
  z-index: 9;
  padding: 20px 0 10px 0;
  font-size: 1.3rem;
  font-weight: 800;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 5px 0;
  }
`
const PriceWrap = styled.div`
  position: relative;
  z-index: 9;
	background: rgba(0, 0, 0, .3);
	border-radius: 10px;
	padding: 15px 30px;
	margin: 0;
	text-align: center;

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 15px 30px;
		margin: 5px 0;
  }
`
const Price = styled.div`
  font-size: 1rem;
	font-weight: 300;
	padding: 0 0 0 0;
`
const Notes = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 300;
  position: relative;
  z-index: 9;
  text-align: center;
  opacity: .6;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 0.7rem;
		max-width: 350px;
		opacity: .6;
  }
`
const BidGameButton = styled.button`
  background: rgba(36, 89, 202, 1.0);
  border-radius: 15px;
  padding: 8px 24px;
  text-transform: uppercase;
  font-size: 1.0rem;
  font-weight: 600;
  text-decoration: none;
  margin: 10px 0 0 0;
  position: relative;
  z-index: 9;
  color: rgba(255, 255, 255, 1.0);

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    padding: 8px 24px;
		font-size: .9rem;
  }
`
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
  position: relative;
  z-index: 8;
  ${({ theme }) => theme.breakPoints['480px']} {
    flex-direction: row;
		margin: 15px 0 0 0;
  }
`
const List = styled.div`
  display: flex;
  max-width: 500px;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  max-height: 250px;
  min-width: 240px;
  h5 {
    font-size: 1rem;
    font-weight: 800;
    padding: 12px;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: rgba(255, 255, 255, 1.0);
    strong {
      display: block;
      text-transform: none;
      font-weight: 500;
      color: ${({ direction }) => direction === 'up' ? 'rgba(0, 194, 19, 1)' : 'rgba(178, 5, 58, 1)'};
      ${({ theme }) => theme.breakPoints['480px']} {
        display: inline-block;
        padding: 0 0 0 6px;
      }
    }
    ${({ theme }) => theme.breakPoints['480px']} {
      font-size: .9rem;
    }
  }
  ${({ theme }) => theme.breakPoints['480px']} {
    max-height: 200px;
    min-width: 180px;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`
const GridCell = styled.span`
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ isMe }) => isMe ? 'background: rgba(0,0,0,.2);' : ''}

  &:last-child, &:nth-last-child(2) {
    border-bottom: 0;
  }
`
const GridHead = styled(GridCell)`
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  strong {
    font-weight: 600;
    margin: 0 3px 0 0;
  }

  &:hover {
    background: rgba(255, 255, 255, .1);
    cursor: pointer;
  }

  ${({ theme }) => theme.breakPoints['xs']} {
    padding: 6px 12px;
  }
`
const DownIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: #9b0030 transparent transparent transparent;
  margin-right: 5px;
`
const UpIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent #01a812 transparent;
  margin-right: 5px;
`
