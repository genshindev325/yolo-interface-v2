import { icons } from 'common'
import { getSmartContractsInfo } from './smartContracts.config'

export const DEFAULT_GAME_ID = 'ETH_USD_70'

export const CARDS_ROUND_OFFSET = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]

const defaultGameParameters = {
  FIAT_DECIMAL_SHOW_DIGITS: 2,
  FIAT_MAX_DECIMALS_DIGITS: 1000000,
  GAME_BLOCK_LENGTH: 70,
  AVRG_BLOCK_MINT_TIME: 2.5 * 1000,
  ROUND_ALMOST_END_TIME: 20 * 1000,
  FEE: 0.03,
  hasGameHours: false
}

const GAMES_PARAMETERS = {
  ETH_USD_70: {
    ...defaultGameParameters,
    gId: 'ETH_USD_70',
    name: 'ETH/USD', //just to notice in the UI this is other than ETH/USD
    icon: icons.EthBlueIcon,
    tokenColor: 'rgba(135, 187, 250, 1)',
    brightness: 'brightness(30%)'
  },
  DOGE_USD_70: {
    ...defaultGameParameters,
    gId: 'DOGE_USD_70',
    name: 'DOGE/USD', //just to notice in the UI this is other than ETH/USD
    icon: icons.DogecoinIcon,
    tokenColor: 'rgba(135, 187, 250, 1)',
    brightness: 'brightness(30%)',
    FIAT_DECIMAL_SHOW_DIGITS: 5
  },
  TSLA_USD_70: {
    ...defaultGameParameters,
    gId: 'TSLA_USD_70',
    name: 'TESLA',
    icon: icons.TeslaIcon,
    tokenColor: 'rgba(232, 30, 36, 1.0) ',
    hasGameHours: true,
    openTimeUtc: '14:30:00',
    closeTimeUtc: '21:00:00'
  }
}

export const getGameParameters = (gameId) => {
  if (!gameId) return defaultGameParameters
  const gameParameter = GAMES_PARAMETERS[gameId]
  if (gameParameter) {
    const [gameContract] = getSmartContractsInfo([gameId]) || {}
    const cardsRoundOffset = CARDS_ROUND_OFFSET
    Object.assign(gameParameter, { gameContract, cardsRoundOffset })
    return gameParameter
  }
}
