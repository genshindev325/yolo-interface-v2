import { YOLO } from 'utils/constants'
import { config } from 'config'
import { walletsInfo } from 'datasource/crypto/wallets/'

export const HARD_CURRENCY = {
  YOLO: { network: 'Polygon', currentPrice: 0.035, symbol: 'yolo' },
  ETH: { network: 'Polygon', currentPrice: 3500, symbol: 'eth' }
}
export const walletInitialState = {
  approvedNetworkIds: config.APPROVED_CHAINS_IDS,
  availableWalletsInfo: walletsInfo,
  connectionStatus: 'idle',
  isConnected: false,
  chainInfo: null,
  providerInfo: {},
  pendingTxStatus: 'idle',
  pendingTxHashes: [],
  //lastBidTxHash: null,
  txs: {},
  addressStatus: 'idle',
  address: '',
  username: '',
  tokenStatus: 'idle',
  isTokenApproved: null,
  nftStatus: 'idle',
  hasNFT: null,
  claimExpirationTime: null,
  waitlistInfo: {},
  balanceStatus: 'idle',
  tokenBalance: { [YOLO]: 0 },
  userBalance: { [YOLO]: 0 },
  yoloEarningStatus: 'idle',
  yoloEarnings: null
}
