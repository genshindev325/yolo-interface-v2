import { gameBrowserReducerActions } from './index'

import { setLocalStorage } from 'utils/localStorage'
import { LIVE_OFFSET, SELECTED_RIBBON_GAMES } from 'utils/constants'

const { setSelectedRibbonGame, setRegisteredGamesIds } = gameBrowserReducerActions

const updateRegisteredGamesIds = () => (dispatch, getState) => {
  const state = getState()
  const dataFromBackend = state.priceFeed.data
  const gameIdsFromBackend = Object.keys(dataFromBackend)
  dispatch(setRegisteredGamesIds(gameIdsFromBackend))
}

const updateSelectedGamesIds =
  ({ gameId, isChecked }) =>
  (dispatch, getState) => {
    const state = getState()
    const { selectedGamesIds } = state.gameBrowser
    const selectedGameIndex = selectedGamesIds.indexOf(gameId)
    const newArray = [...selectedGamesIds]
    if (isChecked) {
      if (selectedGameIndex >= LIVE_OFFSET) {
        return
      }
      newArray.push(gameId)
    } else {
      if (selectedGameIndex < 0 || newArray.length === 1) {
        return
      }
      newArray.splice(selectedGameIndex, 1)
    }
    setLocalStorage(SELECTED_RIBBON_GAMES, newArray)
    dispatch(setSelectedRibbonGame(newArray))
  }

export const gameBrowserActions = {
  updateRegisteredGamesIds,
  updateSelectedGamesIds
}
