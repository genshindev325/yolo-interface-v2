// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * GameData
 */
export const selectActiveGameId = () => (state) => state.gameData.gameId
export const selectActiveGameHexId = () => (state) => state.gameData.gameHexId
export const selectActiveCardRoundOffset = () => (state) => Number(state.gameData.activeCardRoundOffset) || 0
export const selectActiveCardRoundIndex = () => (state) => Number(state.gameData.activeCardRoundIndex) || 0
export const selectCheckBidResult = () => (state) => state.gameData.checkBidResult
