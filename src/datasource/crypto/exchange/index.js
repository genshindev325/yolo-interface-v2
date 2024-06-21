import { config } from 'config'
import { coinGeckoService } from './coingecko.service'
import { coinBaseService } from './coinbase.service'

const SELECTED_SERVICE = config.EXCHANGE_PROVIDER
const POLLING_INTERVAL = config.EXCHANGE_PULL_INTERVAL

export const exchanger = { coingecko: coinGeckoService, coinbase: coinBaseService }[SELECTED_SERVICE]

export const pollingCoinsMarketTT = (onTimer, interval) => {
  let markets
  const pollingTimer = setInterval(async () => {
    markets = await exchanger.coinsMarket()
    onTimer && onTimer({ markets, timerRef: pollingTimer })
  }, interval || POLLING_INTERVAL)
  return pollingTimer
}
