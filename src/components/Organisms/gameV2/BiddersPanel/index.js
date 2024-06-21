import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectUsername,
  selectWalletAddress,
  selectActiveGameId,
  selectGameIdCurrentRoundIndex,
  selectActiveCardRoundIndex,
  selectActiveCardRoundOffset,
  selectGamePool,
  selectAllMyBidsFromLiveRoundIndex,
  selectWalletTxs
} from 'redux/selectors'

import { TX_TYPE } from 'utils/constants'

import { useConvertAmount } from 'utils/hooks'
import { LIVE_OFFSET } from 'utils/constants'
import { weiToCrypto } from 'utils'

import { BiddersBoard } from './BiddersBoard'

const TOKEN = 'YOLO'
const FIAT = 'USD'

export const BiddersPanel = (props) => {
  const username = useSelector(selectUsername())
  const walletAddress = useSelector(selectWalletAddress())
  const activeGameId = useSelector(selectActiveGameId())
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex())
  const activeCardRoundIndex = useSelector(selectActiveCardRoundIndex())
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const gamePool = useSelector(selectGamePool())
  const allMyBidsFromLiveRoundIndex = useSelector(selectAllMyBidsFromLiveRoundIndex())
  const txs = useSelector(selectWalletTxs())

  const [exchangeRate, setExchangeRate] = useState([])
  const convert = useConvertAmount()

  const buildBiddersListOnNext = (offChainMyBids) => {
    if (txs && gameIdCurrentRoundIndex) {
      const walletTxs = Object.values(txs) || []

      const myBidsInWallet = walletTxs.filter((tx) => {
        const bidInfo = tx.txParams
        const isInGameId = tx.gameId === activeGameId
        const isBid = tx.txType === TX_TYPE.BID && bidInfo.bidRoundIndex >= gameIdCurrentRoundIndex

        return isInGameId && isBid
      })

      const myBids = myBidsInWallet.map((bidTx) => {
        const txHash = bidTx.hash
        const txStatus = bidTx.status
        const isHiddenInUi = !!bidTx.isHiddenInUi
        const subGraphBid = offChainMyBids.find((sgBid) => {
          return sgBid.id.includes(`${txHash}`)
        })
        const builtBid = {
          amount: weiToCrypto(bidTx.txParams.amount),
          direction: bidTx.txParams.isUp ? 'up' : 'down',
          gameId: bidTx?.gameId || '',
          id: bidTx.txParams.bidId,
          player: { id: walletAddress },
          confirmations: bidTx.confirmations,
          isPending: true,
          txType: 'BID',
          username: '',
          bidRoundIndex: bidTx.txParams.bidRoundIndex
        }
        const composedBid = {
          ...(subGraphBid || builtBid),
          txStatus,
          isHiddenInUi,
          walletTxInfo: bidTx
        }
        return composedBid
      })
      return myBids
    }
  }

  const calcBidders = () => {
    let myBids = []
    let othersBids = []
    if (gamePool) {
      const { othersBids: offChainOthersBids, myBids: offChainMyBids } = gamePool.bids
      const mBids =
        activeCardRoundOffset >= LIVE_OFFSET
          ? buildBiddersListOnNext(allMyBidsFromLiveRoundIndex) || []
          : offChainMyBids
      const oBids = offChainOthersBids || []
      if (mBids.length) {
        mBids.map((bid) => {
          const amount = (parseFloat(bid.amount) * exchangeRate).toFixed(2)
          const isMine = true
          const newBidder = { ...bid, amount, isMine, username }
          myBids.push(newBidder)
          return bid
        })
      }

      if (oBids.length) {
        oBids.map((bid) => {
          const amount = (parseFloat(bid.amount) * exchangeRate).toFixed(2)
          const isMine = bid.player.id === walletAddress
          const newBidder = { ...bid, amount, isMine }
          othersBids.push(newBidder)
          return bid
        })
      }
    }

    const bidders = { myBids, othersBids }
    return bidders
  }

  const calcGaugeValues = () => {
    let position = 50,
      totalBids = 0,
      up = 0,
      down = 0,
      playersUp = 0,
      playersDown = 0

    if (gamePool) {
      const { up: cryptoUp = 0, down: cryptoDown = 0, bids = [] } = gamePool
      up = cryptoUp * exchangeRate || 0
      down = cryptoDown * exchangeRate || 0
      totalBids = up + down

      const allBids = [...bids.myBids, ...bids.othersBids]
      if (up > down) {
        position = down !== 0 ? +(50 + (Math.log10(up / down) * 100 * 50) / 130).toFixed(0) : 100
        position = position > 95 ? 95 : position // 20 to 1 in log is 1.3 - beyond that meter is saturated
      } else if (up < down) {
        position = up !== 0 ? +(50 - (Math.log10(down / up) * 100 * 50) / 130).toFixed(0) : 0
        position = position < 5 ? 5 : position
      }
      const filteredPlayersByRound = allBids.filter((player) => Number(player.bidRoundIndex) === activeCardRoundIndex)
      playersUp = filteredPlayersByRound.filter((player) => player.direction === 'up').length
      playersDown = filteredPlayersByRound.length - playersUp
    }
    return {
      totalBids: totalBids.toFixed(2),
      position,
      up: up.toFixed(2),
      down: down.toFixed(2),
      playersUp,
      playersDown
    }
  }

  useEffect(() => {
    const exchangeRate = convert(1, TOKEN, FIAT, { number: true }) || 0
    setExchangeRate(exchangeRate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePool])

  return (
    <StyledBiddersBoard
      {...props}
      data={{
        bidders: calcBidders(),
        gaugeValues: calcGaugeValues(),
        activeCardRoundIndex,
        activeCardRoundOffset
      }}
    />
  )
}

const StyledBiddersBoard = styled(BiddersBoard)`
  width: 100%;
  height: 100%;
`
