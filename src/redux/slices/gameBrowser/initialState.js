import { getLocalStorage } from 'utils/localStorage'
import { SELECTED_RIBBON_GAMES } from 'utils/constants'
import { getGameParameters } from 'config/games.config'

const DEFAULT_SELECTION = ['ETH_USD_70', 'DOGE_USD_70', 'TSLA_USD_70']

const setInitialSelectedGamesIds = () => {
  const localSelectedGamesIds = getLocalStorage(SELECTED_RIBBON_GAMES) || []
  const testedGamesId = localSelectedGamesIds.map((gameId) => getGameParameters(gameId)?.gId)
  const trimmedGameIdArray = testedGamesId.filter((e) => e != null)
  return trimmedGameIdArray.length < 1 ? DEFAULT_SELECTION : trimmedGameIdArray
}

export const gameBrowserInitialState = {
  registeredGamesIds: [],
  selectedGamesIds: DEFAULT_SELECTION //setInitialSelectedGamesIds()
}
