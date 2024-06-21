import { priceFeedInitialState } from './initialState'



// Helper functions for reducers
const getGamesData = (payload) => {
  delete payload.globals
  const gamesIds = Object.keys(payload)

  gamesIds.forEach((gameId) => {
    const graphData = payload[gameId].graphData
    const settlementPrice = payload[gameId].settlementPrice
    const isRoundEnded = !!settlementPrice
    payload[gameId].settlementPrice = settlementPrice
    payload[gameId].isRoundEnded = isRoundEnded

    //ACZ - This should be uncomment once the core settlement price PR is merged
    /* if (settlementPrice) {
      const graphData = payload[gameId].graphData
      const strikePrice = payload[gameId].strikePrice
      const settlementDeltaPrice = settlementPrice - strikePrice
      const settlementGraphPoint = [settlementPrice, [Date.now(), settlementDeltaPrice]]
      graphData.push(settlementGraphPoint)
      payload[gameId].graphData = graphData
    } */
  })
  return payload
}

// The `reducers` object lets us define reducers and generate associated actions
export const priceFeedReducers = {
  connect: (state) => {
    state.isPriceFeedConnected = true
  },
  disconnect: (state) => {
    state.isPriceFeedConnected = priceFeedInitialState.isPriceFeedConnected
    state.lastUpdateTimestamp = priceFeedInitialState.lastUpdateTimestamp
    state.data = priceFeedInitialState.data
  },
  updateGames: (state, action) => {
    state.isPriceFeedConnected = true
    state.lastUpdateTimestamp = Date.now()
    state.currentBlock = action.payload.globals.currentBlock ?? state.currentBlock
    state.data = getGamesData(action.payload)
  },
  pauseUpdate: (state, action) => {
    state.pauseUpdate = action.payload
  },
  resetGames: (state, action) => priceFeedInitialState
}
