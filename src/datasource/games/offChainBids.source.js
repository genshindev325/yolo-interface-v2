import { weiToCrypto } from 'utils'
import { config } from 'config'

import axios from 'axios'
import { getSmartContractsInfo } from 'config/smartContracts.config'

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

const getRoundBidsAndWinnerLoserRows = async (gameId, allGameIdRoundsIndex) => {
  const postInput = {
    bidRoundIndex: `{${allGameIdRoundsIndex.join()}}`,
    gameId
  }

  const [gameContractInfo] = getSmartContractsInfo([gameId])
  const gameContractAddress = gameContractInfo.address

  const offChainRoundBids = await axios.post(`${yoloApiBaseUrl}/get-multi-round-bids`, postInput)
  const gameRoundsBidRows = JSON.parse(offChainRoundBids.data.body).rows || []
  const winnerLosers = await axios.post(`${yoloApiBaseUrl}/get-multi-rounds-winners-losers`, postInput)
  const winnerLoserBody = (!!winnerLosers.data.body && JSON.parse(winnerLosers.data.body)) || []
  const winnerLoserRows = winnerLoserBody.filter((row) => row.roundsettleddata?.address === gameContractAddress)
  return { gameRoundsBidRows, winnerLoserRows }
}

export const transformRoundDataToReduxStore = (roundData, myAddress) => {
  const oBids = [],
    mBids = []

  let up = 0,
    down = 0

  const rawPlayersUp = []
  const rawPlayersDown = []

  const { bids: allBids, winDirection, ...rest } = roundData

  allBids.length > 0 &&
    allBids.map((item) => {
      if (!item.txhash) return true
      let bid = item.bid
      const bidOwnAddress = bid.txInfo.from
      const amount = weiToCrypto(bid.amount)
      const direction = bid.isUp ? 'up' : 'down'
      const builtBid = {
        amount,
        direction,
        id: bid.txInfo.hash,
        player: { id: bidOwnAddress },
        confirmations: bid.txInfo.confirmations,
        txType: 'BID',
        username: '',
        isPending: false,
        bidRoundIndex: bid.bidRoundIndex,
        winDirection
      }
      if (direction === 'up') {
        up += parseFloat(amount) // this is not good, will be floating point errors - only use as last step to display fiat if needed - use bignumber library
        rawPlayersUp.push(bid.address)
      } else {
        down += parseFloat(amount)
        rawPlayersDown.push(bid.address)
      }

      if (bidOwnAddress === myAddress) {
        mBids.push(builtBid)
      }
      oBids.push(builtBid)
      return true
    })

  const total = up + down
  const payoutUp = Number((total / up || 0).toFixed(2))
  const payoutDown = Number((total / down || 0).toFixed(2))
  const playersUp = rawPlayersUp.length
  const playersDown = rawPlayersDown.length
  const players = playersUp + playersDown

  const reduxStoreRow = {
    timestamp: Date.now(),
    bids: { othersBids: oBids, myBids: mBids },
    ...rest,
    winDirection,
    total,
    up,
    down,
    payoutUp,
    payoutDown,
    players,
    playersUp,
    playersDown
  }

  return reduxStoreRow
}

export const getMultiPoolData = async ({ myAddress, roundsOffset, gamesData }) => {
  const multiPoolArray = await Promise.all(
    gamesData.map(async (game) => {
      const gameId = game.gameId
      const liveRoundIndex = game.liveRoundIndex
      const allGameIdRoundsIndex = roundsOffset.map((roundOffset) => liveRoundIndex + roundOffset)
      const { gameRoundsBidRows, winnerLoserRows } = await getRoundBidsAndWinnerLoserRows(gameId, allGameIdRoundsIndex)

      const gamePoolByRoundIndex = allGameIdRoundsIndex.map((roundIdx) => {
        const roundSettledData = winnerLoserRows.find((row) => Number(row.roundindex) === Number(roundIdx))
        const returnValues = roundSettledData?.roundsettleddata?.returnValues || []
        const startBlock = returnValues['finalGameInfo']?.[0] || 0
        const endBlock = returnValues['finalGameInfo']?.[1] || 0
        const strikePrice = returnValues['finalGameInfo']?.[2] || 0
        const settlementPrice = returnValues['finalGameInfo']?.[3] || 0
        const winDirection = settlementPrice > strikePrice ? 'up' : 'down'

        const roundData = {
          bids: gameRoundsBidRows.filter((row) => Number(row.roundid) === Number(roundIdx)),
          startBlock,
          endBlock,
          strikePrice,
          settlementPrice,
          winDirection
        }
        const reduxStoreRow = transformRoundDataToReduxStore(roundData, myAddress)
        return { [gameId]: { [roundIdx]: { ...reduxStoreRow } } }
      })
      const multiGameIdPool = gamePoolByRoundIndex.reduce((obj, item) => {
        return (obj[gameId] = { [gameId]: { ...obj[gameId], ...item[gameId] } })
      })
      return multiGameIdPool
    })
  ).catch()

  const multiPool = await multiPoolArray.reduce((obj, item) => ({ ...obj, ...item }))
  return multiPool
}
