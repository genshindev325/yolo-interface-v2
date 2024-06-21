import { createSelector } from '@reduxjs/toolkit'

import { selectGameIdCurrentRoundIndex } from 'redux/selectors'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * GamePool
 */
export const selectUpdatePriceScaled = () => (state) => state.gamePool.updatePriceScale

//Selectors with Arguments

export const selectIsGameClosed = (gameId) => (state) =>
  createSelector(
    (state, gameId) => state.gamePool.closedGames,
    (state, gameId) => gameId || state.gameData.gameId,
    (closedGames, gameId) => closedGames.includes(gameId)
  )(state, gameId)

export const selectGamePool = (gameId, roundIndex) => (state) =>
  createSelector(
    (state, gameId, roundIndex) => state.gamePool.data,
    (state, gameId, roundIndex) => gameId || state.gameData.gameId,
    (state, gameId, roundIndex) => roundIndex || state.gameData.activeCardRoundIndex,
    (gamePool, gameId, roundIndex) => gamePool[gameId]?.[roundIndex]
  )(state, gameId, roundIndex)

const selectAllGamePoolByGameId = (gameId) => (state) =>
  createSelector(
    (state) => state.gamePool,
    (state, gameId) => gameId || state.gameData.gameId,
    (gamePool, gameId) => gamePool.data[gameId]
  )(state, gameId)

export const selectAllMyBidsFromLiveRoundIndex = () =>
  createSelector(
    selectAllGamePoolByGameId(),
    selectGameIdCurrentRoundIndex(),
    (allGamePoolByGameId, liveRoundIndex) => {
      if (!allGamePoolByGameId) return {}
      if (!liveRoundIndex) return {}
      const allGamePoolAsArray = Object.entries(allGamePoolByGameId)
      const gamePoolFromRoundIndex = allGamePoolAsArray.filter(([key, value]) => key >= liveRoundIndex)
      const allMyBidsFromLiveRoundIndex = gamePoolFromRoundIndex.map(([key, value]) => value.bids.myBids).flat()
      return allMyBidsFromLiveRoundIndex
    }
  )
