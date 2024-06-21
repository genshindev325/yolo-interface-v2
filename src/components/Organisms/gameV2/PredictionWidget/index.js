import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectActiveCardRoundOffset, selectGamePool, selectActiveGameId } from 'redux/selectors'
import { useGameProgress } from 'utils/hooks'
import { currencyFormatter } from 'utils'
import { UP, DOWN } from 'utils/constants'
import { useConvertAmount } from 'utils/hooks'

import { PredictView } from './PredictView'
import { NextPredictView } from './NextPredictView'
import { getGameParameters } from 'config/games.config'

export const PredictionWidget = () => {
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const gameId = useSelector(selectActiveGameId())
  const gamePool = useSelector(selectGamePool())

  const { progress } = useGameProgress()

  const FEE = getGameParameters(gameId).FEE

  const convert = useConvertAmount()

  const [myBids, setMyBids] = useState([])

  const livePastPotentialGain = (direction, fiatAmount = '') => {
    //Payout Amount = Payout Ratio × Value Locked / Cohort (Your Side) Total × (1 — Treasury Fee)
    const amountInCrypto = convert(fiatAmount, 'USD', 'YOLO', { number: true })
    let rawGain = 0
    if (direction === UP && gamePool) {
      rawGain = gamePool.up !== 0 ? amountInCrypto * gamePool.payoutUp * (1 - FEE) : 0
    } else if (direction === DOWN && gamePool) {
      rawGain = gamePool.down !== 0 ? amountInCrypto * gamePool.payoutDown * (1 - FEE) : 0
    }
    const fiatGain = rawGain !== 0 ? convert(rawGain, 'YOLO', 'USD', { number: true }) : 0
    return currencyFormatter(fiatGain)
  }

  const getMyBids = () => {
    const { bids } = gamePool
    const offChainMyBids = bids?.myBids || []
    return offChainMyBids.map((bid) => {
      const amount = convert(bid.amount, 'YOLO', 'USD', { number: true })
      return { ...bid, amount }
    })
  }

  useEffect(() => {
    if (gamePool) {
      setMyBids(getMyBids())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePool])

  const endedGamesProps = {
    potentialGain: livePastPotentialGain,
    myBids,
    gamePool
  }

  const liveGameProps = {
    potentialGain: livePastPotentialGain,
    myBids,
    gamePool
  }

  const nextGamesProps = {
    gamePool
  }

  const getContentToShow = () =>
    activeCardRoundOffset < 0 ? (
      <PredictView {...endedGamesProps} />
    ) : activeCardRoundOffset > 0 ? (
      <NextPredictView {...nextGamesProps} />
    ) : (
      <PredictView {...liveGameProps} />
    )

  return getContentToShow()
}
