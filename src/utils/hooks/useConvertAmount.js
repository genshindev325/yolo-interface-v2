import { useState, useEffect } from 'react'

import { get } from 'lodash'
import { config } from 'config'

import { exchanger } from 'datasource/crypto/exchange'

const HARD_CODED_RATES = {
  YOLO: { network: 'Polygon', currentPrice: 0.035, symbol: 'yolo' },
  ETH: { network: 'Polygon', currentPrice: 3500, symbol: 'eth' }
}

const CURRENCIES = {
  fiats: ['USD', 'EUR'],
  cryptos: ['ETH', 'YOLO', 'MATIC']
}

export const useConvertAmount = () => {
  const [rates, setRates] = useState(HARD_CODED_RATES)
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const [timeGap, setTimeGap] = useState(0)

  useEffect(() => {
    const getNewRates = async () => {
      const { coinsMarket } = exchanger
      const rawMarkets = await coinsMarket()
      if (rawMarkets) {
        const newMarkets = rawMarkets.reduce((obj, cur, i) => ({ ...obj, [cur.symbol.toUpperCase()]: cur }), {})
        setRates({ ...HARD_CODED_RATES, ...newMarkets })
        setLastUpdate(Date.now())
      }
    }
    if (timeGap > config.EXCHANGE_PULL_INTERVAL) {
      getNewRates()
    }
  }, [timeGap])

  /**
   *
   * @param {*} amount
   * @param {*} from fromCurrency
   * @param {*} dest destinationCurrency
   * @param {*} options {format:boolean, number:boolean}
   * @returns
   */
  const convert = (amount, from, dest, options) => {
    const opt = options || {}
    const fiats = get(CURRENCIES, 'fiats')
    const cryptos = get(CURRENCIES, 'cryptos')
    const allCurrency = [...fiats, ...cryptos]
    if (!allCurrency.find((currency) => currency !== dest) && !allCurrency.find((currency) => currency !== from)) {
      console.error('Use some of the approved currencies')
      return 'NAN'
    }
    const amountIsFiat = !!fiats.find((currency) => currency === from?.toUpperCase())
    const formatOutput = opt.format !== false
    const formatNumber = opt.number
    const rate = rates[amountIsFiat ? dest : from]

    if (rate) {
      const exchangeRate = rate.currentPrice
      const conversion = amountIsFiat ? amount / exchangeRate : amount * exchangeRate
      if (formatNumber) {
        return conversion
      }
      if (formatOutput) {
        const formatInFiat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(conversion)
        const formatInCrypto = `${new Intl.NumberFormat('en-US').format(conversion)} ${rate.symbol.toUpperCase()}`
        return amountIsFiat ? formatInCrypto : formatInFiat
      }
      return rate ? new Intl.NumberFormat('en-US').format(conversion) : '0.00'
    }
    setTimeGap(Date.now() - lastUpdate)
  }

  return convert
}
