import { DEV_CHAIN_DICT } from '../network.config'

export const localEnvConfig = {
  IS_DEV: true,
  IS_STAGING: false,
  IS_PROD: false,
  IS_TEST: false,

  DISABLED_CONSOLE_MSG: false,
  YOLO_API_URL_SUFFIX: '/dev',
  YOLO_BASE_URL: 'https://www.yolorekt.finance',

  // CRYPTO
  APPROVED_CHAINS_IDS: [80001],
  CHAIN_DICT: DEV_CHAIN_DICT,

  //GAMES
  BACKEND_SOCKET: 'http://localhost:3570',
  CONTRACTS_VERSION: '23'
}
