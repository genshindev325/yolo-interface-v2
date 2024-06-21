export const NETWORKS_RPC = {
  137: 'https://rpc-mainnet.matic.network',
  80001: process.env.REACT_APP_RPC_MUMBAI || 'https://matic-mumbai.chainstacklabs.com'
}

export const CHAIN_DICT = {
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    shortName: 'eth',
    currency: 'ETH',
    network: 'Ethereum',
    networkType: 'mainnet',
    scannerTemplate: 'https://etherscan.io/tx/[hashAddress]'
  },
  3: {
    chainId: 3,
    name: 'Ethereum Testnet Ropsten',
    shortName: 'rop',
    currency: 'ETH',
    network: 'Ethereum',
    networkType: 'testnet',
    scannerTemplate: '[hashAddress]'
  },
  42: {
    chainId: 42,
    name: 'Ethereum Testnet Kovan',
    shortName: 'kov',
    currency: 'ETH',
    network: 'Ethereum',
    networkType: 'testnet',
    scannerTemplate: '[hashAddress]'
  },
  4: {
    chainId: 4,
    name: 'Ethereum Testnet Rinkeby',
    shortName: 'rin',
    currency: 'ETH',
    network: 'Ethereum',
    networkType: 'testnet',
    scannerTemplate: '[hashAddress]'
  },
  5: {
    chainId: 5,
    name: 'Ethereum Testnet Goerli',
    shortName: 'ogor',
    currency: 'ETH',
    network: 'Ethereum',
    networkType: 'testnet',
    scannerTemplate: 'https://goerli.etherscan.io/tx/[hashAddress]'
  },

  80001: {
    chainId: 80001,
    name: 'Mumbai',
    shortName: 'maticmum',
    currency: 'MATIC',
    network: 'Polygon',
    networkType: 'testnet',
    scannerTemplate: 'https://mumbai.polygonscan.com/tx/[hashAddress]',
    chainColor: '#8246e4',
    iconProps: { collection: 'crypto', name: 'polygon' }
  },
  137: {
    chainId: 137,
    name: 'Polygon',
    shortName: 'matic',
    currency: 'MATIC',
    network: 'Polygon',
    networkType: 'mainnet',
    scannerTemplate: 'https://polygonscan.com/tx/[hashAddress]',
    chainColor: '#8246e4',
    iconProps: { collection: 'crypto', name: 'polygon' }
  },

  //ACZ --> These are here for testing propose
  T1: {
    chainId: 400, // ACZ --> totally invented
    name: 'Matic Mainnet',
    shortName: 'matic',
    currency: 'wETH',
    network: 'Solana',
    networkType: 'mainnet',
    scannerTemplate: 'https://polygonscan.com/tx/[hashAddress]',
    chainColor: '#20d5de',
    iconProps: { collection: 'crypto', name: 'chain' }
  },
  T2: {
    chainId: 137,
    name: 'Matic Mainnet',
    shortName: 'matic',
    currency: 'MATIC',
    network: 'Polygon',
    networkType: 'mainnet',
    scannerTemplate: 'https://polygonscan.com/tx/[hashAddress]',
    chainColor: '#8549e7',
    iconProps: { collection: 'crypto', name: 'network' }
  },
  T3: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    shortName: 'eth',
    currency: 'ETH',
    network: 'Ethereum',
    networkType: 'mainnet',
    scannerTemplate: 'https://etherscan.io/tx/[hashAddress]',
    chainColor: '#70aefa',
    iconProps: { collection: 'crypto', name: 'ethereum' }
  }
}

export const getAvailableNetworksInfo = (chainIdsArray) => chainIdsArray.map((chainId) => CHAIN_DICT[chainId])

export const PROD_CHAIN_DICT = {
  polygon: CHAIN_DICT[137]
}
export const DEV_CHAIN_DICT = {
  polygon: CHAIN_DICT[80001]
}
