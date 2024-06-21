import { config } from 'config'

const version = config.CONTRACTS_VERSION

const Users = require(`./${version}/Users.json`)
const YoloEthereumUtilityTokens = require(`./${version}/YoloEthereumUtilityTokens.json`)
const YoloNFT = require(`./${version}/YoloNFT.json`)
const ETH_USD_70 = require(`./${version}/ETH_USD_70.json`)
const TSLA_USD_70 = require(`./${version}/TSLA_USD_70.json`)
const DOGE_USD_70 = require(`./${version}/DOGE_USD_70.json`)
const NftTracker = require(`./${version}/NftTracker.json`)
const NftClaims = require(`./${version}/NftClaims.json`)

const CONTRACT_DICT = {
  users: Users,
  token: YoloEthereumUtilityTokens,
  yoloNft: YoloNFT,
  ETH_USD_70,
  ETH_USD: ETH_USD_70,
  DOGE_USD_70,
  TSLA_USD_70,
  NftTracker,
  NftClaims
}

export const getSmartContractsInfo = (contractIdArray) => contractIdArray.map((contractId) => CONTRACT_DICT[contractId])
