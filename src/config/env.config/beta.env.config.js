import { PROD_CHAIN_DICT } from '../network.config'

export const betaEnvConfig = {
  IS_DEV: false,
  IS_STAGING: false,
  IS_PROD: false,
  IS_TEST: false,
  IS_BETA: true,

  DISABLED_CONSOLE_MSG: true,
  YOLO_API_URL_SUFFIX: '/YOLOAPI',
  YOLO_BASE_URL: 'https://www.yolorekt.finance',

  // CRYPTO
  APPROVED_CHAINS_IDS: [137],
  CHAIN_DICT: PROD_CHAIN_DICT,

  //GAMES
  BACKEND_SOCKET: 'https://beta.yolorekt.finance',
  CONTRACTS_VERSION: '24'
}
