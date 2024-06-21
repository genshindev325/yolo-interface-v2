import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  selectActiveGameId,
  selectCurrentBlock,
  selectLiveStartBlock,
  selectLiveEndBlock,
  selectActiveCardRoundOffset
} from 'redux/selectors'
import { formatTimeStamp } from 'utils'
import { getGameParameters } from 'config/games.config'

export const useGameProgress = (gameIdentifier, cardRoundOffset) => {
  const gameId = useSelector(selectActiveGameId())
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const gId = gameIdentifier || gameId
  const roundOffset = cardRoundOffset || activeCardRoundOffset
  const currentBlock = useSelector(selectCurrentBlock())
  const startBlock = useSelector(selectLiveStartBlock(gId))
  const endBlock = useSelector(selectLiveEndBlock(gId))

  const [gameProgress, setGameProgress] = useState({})

  const calcProgressByBlock = () => {
    const { GAME_BLOCK_LENGTH, AVRG_BLOCK_MINT_TIME } = getGameParameters(gId)
    const blocksOffset = GAME_BLOCK_LENGTH * (roundOffset <= 1 ? 0 : roundOffset - 1)

    const min = 0
    const max = GAME_BLOCK_LENGTH + blocksOffset

    const newEndBlock = endBlock + blocksOffset

    const progressCursor = ((currentBlock - startBlock) / max) * 100
    const progress = Math.min(Math.max(progressCursor, 0), 100)

    const blocksPassed = Math.min(Math.max(currentBlock - startBlock, min), max)
    const blocksLeft = Math.min(Math.max(newEndBlock - currentBlock, min), max)

    const msTimePassed = blocksPassed * AVRG_BLOCK_MINT_TIME || 0
    const msTimeLeft = blocksLeft * AVRG_BLOCK_MINT_TIME || 0
    const formattedTimePassed = formatTimeStamp(msTimePassed, 'm:ss')
    const formattedTimeLeft = formatTimeStamp(msTimeLeft, 'm:ss')

    setGameProgress({
      progress,
      blocksPassed,
      blocksLeft,
      msTimePassed,
      msTimeLeft,
      formattedTimePassed,
      formattedTimeLeft
    })
  }

  useEffect(() => {
    calcProgressByBlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlock, gameIdentifier, gameId])

  return gameProgress
}
