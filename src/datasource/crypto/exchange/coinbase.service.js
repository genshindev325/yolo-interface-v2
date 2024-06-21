import CoinbasePro from 'coinbase-pro'

const publicClient = new CoinbasePro.PublicClient()

export const coinsMarket = async () => {
  const ethUsd = await publicClient.getProductTicker('ETH-USD')
  const maticUsd = await publicClient.getProductTicker('MATIC-USD')
  const exchangeInfo = [
    {
      network: 'Ethereum',
      currentPrice: ethUsd.price,
      symbol: 'eth'
    },
    {
      network: 'Polygon',
      currentPrice: maticUsd.price,
      symbol: 'matic'
    }
  ]
  return exchangeInfo
}

export const coinBaseService = { coinsMarket }
