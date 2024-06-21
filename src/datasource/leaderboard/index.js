import axios from 'axios'
import BigNumber from 'bignumber.js'

import { config } from 'config'
import { getSmartContractsInfo } from 'config/smartContracts.config'
import { getBotBidStats } from 'datasource/crypto/contracts'

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

const fetchDataFromDB = async () => {
  const leaderTableDataResponse = await axios.post(`${yoloApiBaseUrl}/get-cached-leaderboard`).catch((err) => {
    throw err
  })
  const leaderTableData = JSON.parse(leaderTableDataResponse.data.body)
  return leaderTableData
}

const calcRanking = (rawLeaderData) => {
  //ACZ --> The biggest earning with the lowest game played goes first
  const rankedData = rawLeaderData
    .sort((a, b) => {
      const itemA = Number(a.totalYoloEarned)
      const itemB = Number(b.totalYoloEarned)
      if (itemA < itemB) return 1
      if (itemA > itemB) return -1
      const itemA2 = Number(a.totalGames)
      const itemB2 = Number(b.totalGames)
      if (itemA2 < itemB2) return -1
      if (itemA2 > itemB2) return 1
      return 0
    })
    .map((item, idx) => ({ ...item, ranking: idx + 1 }))
  return rankedData
}

const getYoloEarned = async (rawLeaderData) => {
  const totalYoloAvailableForBeta = 500000
  const [NftTracker, YoloNFT] = getSmartContractsInfo(['NftTracker', 'yoloNft'])
  const cumulativeStats = await axios.post(
    'https://uswx09e3ce.execute-api.us-west-2.amazonaws.com/YOLOAPI/get-bid-stats',
    {}
  )
  let data = JSON.parse(cumulativeStats.data.body)[0]

  const dataWithEarned = rawLeaderData.map((nftData) => {
    const individualBidCount = nftData?.totalGames || 0
    const individualCumBidAmount = new BigNumber(nftData.cumulativeBidAmount || 0)
    const individualFraction = individualCumBidAmount.times(0.3).plus(new BigNumber(individualBidCount).times(0.7))
    const totalBidCount = +data.totalbidcount
    const cumulativeBidAmount = new BigNumber(data.cumulativebidamount)
    let bidsFraction = cumulativeBidAmount.times(0.3).plus(new BigNumber(totalBidCount).times(0.7))
    let totalYoloEarned = individualFraction.times(totalYoloAvailableForBeta).dividedBy(bidsFraction).toFixed(0)
    if (isNaN(totalYoloEarned)) {
      totalYoloEarned = '0'
    }
    return { ...nftData, totalYoloEarned: Number(totalYoloEarned) }
  })
  return dataWithEarned
}

export const getLeaderTableData = async () => {
  const rawLeaderData = await fetchDataFromDB()
  const rawDataWithEarned = await getYoloEarned(rawLeaderData)
  const rankedData = calcRanking(rawDataWithEarned)
  return rankedData
}
