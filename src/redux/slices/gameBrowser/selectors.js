// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// We need to define all the selector as closures in this case we can use them to pass externals parameters from the component

/**
 * GameBrowser
 */
export const selectSelectedGameIds = () => (state) => state.gameBrowser.selectedGamesIds
export const selectRegisteredGamesIds = () => (state) => state.gameBrowser.registeredGamesIds
