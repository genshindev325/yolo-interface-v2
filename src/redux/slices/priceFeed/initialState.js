export const priceFeedInitialState = {
  isPriceFeedConnected: false,
  pauseUpdate: false,
  lastUpdateTimestamp: 0,
  currentBlock: 0,
  data: {}
}

// ETH_USD: {
//   roundIndex: 0,
//   startBlock: 0,
//   strikePrice: 0,
//   currentPrice: 0,
//   graphData: []
// },
// TSLA_USD: {
//   // All this values have to be replace by backend info
//   roundIndex: 30,
//   startBlock: 123400,
//   strikePrice: 100,
//   currentPrice: 235.05,
//   graphData: []
// },
// JPY_USD: {
//   // All this values have to be replace by backend info
//   roundIndex: 5,
//   startBlock: 123000,
//   strikePrice: 150,
//   currentPrice: 140.05,
//   graphData: []
// }
