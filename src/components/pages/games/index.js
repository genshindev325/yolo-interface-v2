import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'

import { notificationActions, priceFeedActions, gameDataActions } from 'redux/actions'
import {
  selectSelectedGameIds,
  selectActiveGameId,
  selectGameIdCurrentRoundIndex,
  selectGamePool,
  selectWalletConnectionState,
  selectWalletAddress,
  selectUsername,
  selectCheckBidResult
} from 'redux/selectors'
import { usePrevious } from 'utils/hooks'
import { DOWN, UP, WINNER, LOSER, PUSH } from 'utils/constants'

import { GameLayout } from 'components/Layouts/Game.layout'

import { Footer as FooterNew } from 'components/Organisms/Footer'
import { GameHeader } from 'components/Organisms/GameHeader'
import { ChatWindow } from 'components/Organisms/Message/ChatWindow'
import { BiddersPanel } from 'components/Organisms/gameV2/BiddersPanel'
import { GameBrowser } from 'components/Organisms/gameV2/GameBrowser'
import { GamePlayArea } from 'components/Organisms/gameV2/GamePlayArea'

export const GamePage = () => {
  const dispatch = useDispatch()
  const gameId = useSelector(selectActiveGameId())
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex())
  const selectedGameIds = useSelector(selectSelectedGameIds())
  const pastGamePool = useSelector(selectGamePool(gameId, gameIdCurrentRoundIndex - 1)) || {}
  const isConnected = useSelector(selectWalletConnectionState())
  const address = useSelector(selectWalletAddress())
  const username = useSelector(selectUsername())
  const checkBidResult = useSelector(selectCheckBidResult())
  const prevGameId = usePrevious(gameId)
  const [activeHeaderItem, setActiveHeaderItem] = useState({ id: 'game' })

  const getResultModalObj = (variant, resultObj) => ({
    // this component will receive `closeModal` prop to close programmatically the modal
    show: true,
    id: 'bidResult',
    props: { variant, resultObj }
  })

  // TODO: get specific round, this is error prone
  const getPastBids = async () => {
    const offChainMyBids = pastGamePool.bids?.myBids || []
    const offChainOtherBids = pastGamePool.bids?.othersBids || []
    const roundIndex = gameIdCurrentRoundIndex - 1

    const upBids = []
    const downBids = []
    const myBids = []

    const totalUpBids = pastGamePool.up
    const totalDownBids = pastGamePool.down

    offChainMyBids.forEach((bid) => {
      const isMine = bid.player.id === address
      isMine && myBids.push({ ...bid, isMine, username })
    })

    const allOffChainBids = [...offChainMyBids, ...offChainOtherBids]

    allOffChainBids.forEach((bid) => {
      const amount = parseFloat(bid.amount)
      if (bid.direction === UP) {
        let amountInUSD = (amount * 0.035).toFixed(2) //TODO:: ACZ - This will be replaced for the convert function
        const editedBid = { ...bid, bidAmountInUSD: amountInUSD }
        upBids.push(editedBid)
      } else {
        let amountInUSD = (amount * 0.035).toFixed(2) //TODO:: ACZ - This will be replaced for the convert function
        const editedBid = { ...bid, bidAmountInUSD: amountInUSD }
        downBids.push(editedBid)
      }
    })

    const allPlayers = {
      up: upBids,
      down: downBids
    }

    return { myBids, allPlayers, roundIndex, totalUpBids, totalDownBids }
  }

  // TODO: this should be go to past card in the gamebrowser
  const amIaWinner = async () => {
    const { myBids, allPlayers, roundIndex, totalUpBids, totalDownBids } = await getPastBids()
    const { strikePrice, settlementPrice } = pastGamePool;
    const myBidsLength = myBids.length
    let myNetBid = 0
    let winDirection

    if (totalUpBids !== 0 && totalDownBids !== 0) {
      myBids.forEach((bid) => {
        // TODO: still have to remove this value from each list item and make single
        winDirection = bid.winDirection

        // TODO: all this with BN lib and get dynamic fee value from each game contract
        const bidAmount = parseFloat(bid.amount)
        const bidDirection = bid.direction
        const fee = 0.97
        if (winDirection === bid.direction && bidDirection === UP) {
          myNetBid += ((bidAmount / totalUpBids) * totalDownBids + bidAmount) * fee
        } else if (winDirection === bid.direction && bidDirection === DOWN) {
          myNetBid += ((bidAmount / totalDownBids) * totalUpBids + bidAmount) * fee
        } else {
          myNetBid -= bidAmount
        }
      })

      if (myBidsLength && winDirection && myNetBid > 0) {
        const amountInUSD = (myNetBid * 0.035).toFixed(2)
        const winnerModalObj = getResultModalObj(WINNER, {
          gameId,
          roundIndex,
          amount: amountInUSD,
          strikePrice,
          settlementPrice,
          allPlayers,
          winDirection
        })
        dispatch(notificationActions.updateModal(winnerModalObj))
      } else if (myBidsLength && winDirection && myNetBid <= 0) {
        console.log('ACZ LOSER myNetBid-->', myNetBid)
        const absNetBid = Math.abs(myNetBid)
        const amountInUSD = (absNetBid * 0.035).toFixed(2)
        const loserModalObj = getResultModalObj(LOSER, {
          gameId,
          roundIndex,
          amount: amountInUSD,
          strikePrice,
          settlementPrice,
          allPlayers,
          winDirection
        })
        dispatch(notificationActions.updateModal(loserModalObj))
      }
    } else if (myBidsLength) {
      myBids.forEach((bid) => {
        winDirection = bid.winDirection
        const bidAmount = parseFloat(bid.amount)
        myNetBid += bidAmount
      })
      // TODO: show a returned funds modal when bids in only one direction
      console.log('ACZ PUSH myNetBid-->', myNetBid)
      const amountInUSD = (myNetBid * 0.035).toFixed(2)
      const pushModalObj = getResultModalObj(PUSH, {
        roundIndex,
        amount: amountInUSD,
        allPlayers,
        winDirection
      })
      dispatch(notificationActions.updateModal(pushModalObj))
    }
    if (isConnected) {
      //dispatch(reduxWalletActions.updateBalance())
    }
  }

  useEffect(() => {
    const firstSelectedGameId = selectedGameIds[0]
    dispatch(
      gameDataActions.setMyGame({
        gameId: firstSelectedGameId,
        activeCardRoundOffset: 0
      })
    )
    dispatch(priceFeedActions.priceFeedOpenSocket())
    return () => {
      dispatch(priceFeedActions.priceFeedCloseSocket())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const settlementPrice = pastGamePool.settlementPrice
    if (gameIdCurrentRoundIndex && prevGameId === gameId) {
      checkBidResult && settlementPrice && amIaWinner()
      dispatch(gameDataActions.setMyGame({ gameId, activeCardRoundOffset: 0, checkBidResult: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIdCurrentRoundIndex, pastGamePool.settlementPrice])

  return (
    <GameLayout>
      <GameHeader gridArea='header' onItemClick={setActiveHeaderItem} />
      <GameBrowser gridArea='gameSelector' onTap={setActiveHeaderItem} />
      <PlayLayout id='playArea' gridArea='playArea'>
        <ChatWrapper id='chatWrapper' isActive={activeHeaderItem.id === 'chat'}>
          <ChatWindow />
        </ChatWrapper>
        <GameWrapper id='gameWrapper' isActive={activeHeaderItem.id === 'game'}>
          <GamePlayArea />
        </GameWrapper>
        <StatWrapper id='statWrapper' isActive={activeHeaderItem.id === 'stats'}>
          <BiddersPanel />
        </StatWrapper>
      </PlayLayout>
      <FooterNew gridArea='footer' />
    </GameLayout>
    /* This TabBar is shown in mobile version */
    /* <GameTabBar tabIndex={tabIndex} onChangeTab={(index) => setTabIndex(index)} /> */
  )
}

const showOnePanel = css`
  grid-template: 1fr /100vw;
`
const panelsWrappers = css`
  display: block;
  @media (max-width: 1024px) {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  }
`

const PlayLayout = styled.div`
  ${({ gridArea }) => ({ gridArea })}
  display: grid;
  grid-template: 1fr /20vw 50vw 30vw;
  position: relative;

  @media (max-width: 1024px) {
    ${showOnePanel}
  }
`
const ChatWrapper = styled.div`
  ${panelsWrappers}
  z-index: 1;
`
const GameWrapper = styled.div`
  ${panelsWrappers}
  padding-left: 30px;
  padding-right: 30px;
  z-index: 0;
`
const StatWrapper = styled.div`
  ${panelsWrappers}
  z-index: 1;
`
