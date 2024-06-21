import { createSelector } from '@reduxjs/toolkit'
import { getGameParameters } from 'config/games.config'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * PriceFeed
 */
export const selectIsPriceFeedConnected = () => (state) => state.priceFeed.isPriceFeedConnected
export const selectLastUpdateTimestamp = () => (state) => state.priceFeed.lastUpdateTimestamp || 0
export const selectCurrentBlock = () => (state) => Number(state.priceFeed.currentBlock) || 0

export const selectGameIdCurrentRoundIndex = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.roundIndex || 0)
    }
  )(state, gameId)

//Selectors with Arguments
export const selectLiveStartBlock = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.startBlock || 0)
    }
  )(state, gameId)

export const selectLiveEndBlock = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const startBlock = Number(data[gameId]?.startBlock || 0)
      const { GAME_BLOCK_LENGTH } = getGameParameters(gameId || state.gameData.gameId)
      return startBlock + GAME_BLOCK_LENGTH
    }
  )(state, gameId)

export const selectStrikePrice = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.strikePrice || 0)
    }
  )(state, gameId)

export const selectCurrentPrice = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.currentPrice || 0)
    }
  )(state, gameId)

export const selectGraphData = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return gameIdData?.graphData || []
    }
  )(state, gameId)

export const selectSettlementPrice = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Number(gameIdData?.selectSettlementPrice || 0)
    }
  )(state, gameId)

export const selectIsRoundEnded = (gameId) => (state) =>
  createSelector(
    (state) => state.priceFeed.data,
    (state, gameId) => gameId || state.gameData.gameId,
    (data, gameId) => {
      const gameIdData = data[gameId]
      return Boolean(gameIdData?.isRoundEnded || false)
    }
  )(state, gameId)
