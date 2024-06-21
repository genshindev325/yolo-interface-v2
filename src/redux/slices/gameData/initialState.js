import { getWeb3Utils } from 'utils'

import { DEFAULT_GAME_ID } from 'config/games.config'

export const gameDataInitialState = {
  gameId: DEFAULT_GAME_ID,
  gameHexId: getWeb3Utils().soliditySha3(DEFAULT_GAME_ID),
  activeCardRoundOffset: 0,
  activeCardRoundIndex: 0,
  checkBidResult: true
}
