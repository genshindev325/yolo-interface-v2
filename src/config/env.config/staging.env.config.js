import { DEV_CHAIN_DICT } from '../network.config'

export const stagingEnvConfig = {
  IS_DEV: false,
  IS_STAGING: true,
  IS_PROD: false,
  IS_TEST: false,

  DISABLED_CONSOLE_MSG: false,
  YOLO_API_URL_SUFFIX: '/dev',
  YOLO_BASE_URL: 'https://staging-8282.yolorekt.finance',

  // CRYPTO
  APPROVED_CHAINS_IDS: [80001],
  CHAIN_DICT: DEV_CHAIN_DICT,

  //GAMES
  BACKEND_SOCKET: 'https://staging-2828.yolorekt.finance',
  CONTRACTS_VERSION: '23'
}
