import { createAsyncThunk } from '@reduxjs/toolkit'

import { getMultiPoolData } from 'datasource/games'

import { CARDS_ROUND_OFFSET, getGameParameters } from 'config/games.config'
import { getIsGameOpen } from 'utils'

import { gamePoolReducerActions } from '.'

// The `reducers` object lets us define reducers and generate associated actions
export const gamePoolReducers = {
  updatePriceScale: (state, action) => {
    state.updatePriceScale = action.payload
  },
  addClosedGames: (state, action) => {
    const closedGameId = action.payload
    const closedGames = state.closedGames
    if (!closedGames.includes(closedGameId)) {
      const newClosedGames = [...state.closedGames, closedGameId]
      state.closedGames = newClosedGames
    }
  },
  removeClosedGames: (state, action) => {
    const openGameId = action.payload
    const closedGames = [...state.closedGames]
    if (closedGames.includes(openGameId)) {
      const gameIdIndex = closedGames.indexOf(openGameId)
      closedGames.splice(gameIdIndex, 1)
      state.closedGames = closedGames
    }
  }
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

const getGamePool = createAsyncThunk('gamePool/fetchGamePool', async (_, thunkAPI) => {
  const state = thunkAPI.getState()
  const dispatch = thunkAPI.dispatch
  const myAddress = state.wallet.address
  const priceFeedData = state.priceFeed.data
  const selectedGamesIds = state.gameBrowser?.selectedGamesIds || []
  const runningGamesIds = Object.keys(priceFeedData)
  const filteredSelectedGameId = selectedGamesIds.filter((gameId) => runningGamesIds.includes(gameId))

  const gamesData = filteredSelectedGameId.map((gameId) => {
    const { hasGameHours, openTimeUtc, closeTimeUtc } = getGameParameters(gameId)
    const isGameClosed = hasGameHours && !getIsGameOpen(openTimeUtc, closeTimeUtc)
    if (isGameClosed) {
      dispatch(gamePoolReducerActions.addClosedGames(gameId))
    } else {
      dispatch(gamePoolReducerActions.removeClosedGames(gameId))
    }
    return {
      gameId,
      liveRoundIndex: Number(priceFeedData[gameId]?.roundIndex)
    }
  })

  const queryObject = {
    myAddress,
    roundsOffset: CARDS_ROUND_OFFSET,
    gamesData
  }

  const multiGamesPools = getMultiPoolData(queryObject)
  return multiGamesPools
})

export const gamePoolExtraReducer = { getGamePool }
