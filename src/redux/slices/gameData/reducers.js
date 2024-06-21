// The `reducers` object lets us define reducers and generate associated actions
export const gameDataReducers = {
  setActGame: (state, action) => {
    state.gameId = action.payload.gameId
    state.gameHexId = action.payload.gameHexId
    state.activeCardRoundOffset = action.payload.activeCardRoundOffset
    state.activeCardRoundIndex = action.payload.activeCardRoundIndex
    state.checkBidResult = action.payload.checkBidResult
  }
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const gameDataExtraReducer = {}
