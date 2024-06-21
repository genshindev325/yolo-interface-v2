import CoinGecko from 'coingecko-api'

const CoinGeckoClient = new CoinGecko()

const ping = async () => {
  let data = await CoinGeckoClient.ping()
  return data
}

const coinsMarket = async () => {
  let exchangeInfo = []
  const response = await CoinGeckoClient.coins.markets({ ids: ['ethereum', 'matic-network'] })
  const data = response.data
  data.map((item) => {
    exchangeInfo.push({
      network: item.name,
      currentPrice: item.current_price,
      symbol: item.symbol
    })
    return true
  })
  return exchangeInfo
}

export const coinGeckoService = { coinsMarket }
