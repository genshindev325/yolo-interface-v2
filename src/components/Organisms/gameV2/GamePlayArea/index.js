import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectActiveGameId,
  selectActiveCardRoundOffset,
  selectIsPriceFeedConnected,
  selectIsRoundEnded,
  selectIsGameClosed
} from 'redux/selectors'

import { Loading } from 'components/Molecules/Loading'
import { MarketCloseAlert } from 'components/Molecules/MarketCloseAlert'
import { PredictionWidget } from 'components/Organisms/gameV2/PredictionWidget'
import { LiveGamePlay } from './LiveGamePlay'
import { PastGamePlay } from './PastGamePlay'
import { NextGamePlay } from './NextGamePlay'
import { getGameParameters } from 'config/games.config'

const getContentToShow = (activeCardRoundOffset) =>
  activeCardRoundOffset < 0 ? <PastGamePlay /> : activeCardRoundOffset > 0 ? <NextGamePlay /> : <LiveGamePlay />

export const GamePlayArea = () => {
  const gameId = useSelector(selectActiveGameId())
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const isConnected = useSelector(selectIsPriceFeedConnected())
  const isRoundEnded = useSelector(selectIsRoundEnded())
  const isActiveGameClosed = useSelector(selectIsGameClosed())

  const { name, openTimeUtc, closeTimeUtc } = getGameParameters(gameId)

  //const showLoading = useMemo(() => blocksLeft === 0 || !isConnected, [blocksLeft, isConnected])
  const showLoading = useMemo(() => isRoundEnded || !isConnected, [isRoundEnded, isConnected])

  return (
    <MainBoard id='playArea'>
      {!isActiveGameClosed && (
        <>
          {getContentToShow(activeCardRoundOffset)}
          {showLoading && <Loading reason={'Disconnected from backend'} />}
          <PredictionWidget />
        </>
      )}
      {isActiveGameClosed && (
        <MarketCloseAlert assetName={name} openTimeUtc={openTimeUtc} closeTimeUtc={closeTimeUtc} />
      )}
    </MainBoard>
  )
}

const MainBoard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`
