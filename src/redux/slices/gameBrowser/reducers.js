// The `reducers` object lets us define reducers and generate associated actions

export const gameBrowserReducers = {
  setSelectedRibbonGame: (state, action) => {
    state.selectedGamesIds = action.payload
  },
  setRegisteredGamesIds: (state, action) => {
    state.registeredGamesIds = action.payload
  }
}
