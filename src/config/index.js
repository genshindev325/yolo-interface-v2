import { localEnvConfig } from './env.config/local.env.config'
import { stagingEnvConfig } from './env.config/staging.env.config'
import { productionEnvConfig } from './env.config/production.env.config'
import { betaEnvConfig } from './env.config/beta.env.config'

const env = process.env.REACT_APP_BUILD_ENV || process.env.NODE_ENV || 'staging'
console.log('env =>', env)

function envswitch(vals) {
  const res = vals[env]
  if (res === undefined) throw new Error(`No valid specified for env '${env}' in ${JSON.stringify(vals)}`)
  return res
}

const yoloBaseApiUrlPrefix = 'https://uswx09e3ce.execute-api.us-west-2.amazonaws.com'

const { YOLO_API_URL_SUFFIX, ...restEnvConfig } = envswitch({
  production: productionEnvConfig,
  beta: betaEnvConfig,
  staging: stagingEnvConfig,
  development: stagingEnvConfig,
  local: localEnvConfig
})

export const config = {
  NODE_ENV: env,

  //URL'S
  YOLO_API_BASE_URL: `${yoloBaseApiUrlPrefix}${YOLO_API_URL_SUFFIX}`,

  /* prettier-ignore */
  YOLO_SOCIAL_LINKS: [
    { id:'twitter',  url: 'https://twitter.com/playyolorekt',                  icon: 'twitter',  label: 'Twitter' },
    { id:'medium',   url: 'https://medium.com/yolorekt',                       icon: 'medium',   label: 'Medium' },
    { id: 'telegram', url: 'https://t.me/joinchat/NBBv1hQmV26flFM_5MD4_w',     icon: 'telegram', label: 'Telegram' },
    { id:'discord',  url: 'https://discord.gg/yolorekt',                       icon: 'discord',  label: 'Discord' },
    { id:'email',    url: 'mailto:support@yolorekt.com?Subject=Hello%20again', icon: 'email',    label: 'Email' }
  ],

  //CRYPTO
  TX_PULLING_TIMEOUT: 3 * 1000, // 3 seconds (block creation average is 2.5s)
  MIN_CONFIRMATIONS: 3,
  UINT256_MAX: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  EXCHANGE_PULL_INTERVAL: 60 * 1000, //It should be 5 * 1000,
  EXCHANGE_PROVIDER: 'coingecko', //['coinbase', 'coingecko']
  LOCAL_TX_PERSISTANCE: 24 * 60 * 60,

  //AUTH
  IP_CHECK: 'https://luo4fq0r1j.execute-api.us-west-2.amazonaws.com/ip-check',

  //NOTIFICATION
  TOAST_TIMEOUT: 5 * 1000, //10sec

  //CHAT
  CHAT_SOCKET: 'wss://phjbq8vavi.execute-api.us-west-2.amazonaws.com/production',
  CHAT_API: 'https://luo4fq0r1j.execute-api.us-west-2.amazonaws.com/chat',

  ...restEnvConfig
}
