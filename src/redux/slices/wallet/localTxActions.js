import { mapValues } from 'lodash'

import { config } from 'config'

import { TRANSACTIONS } from 'utils/constants'

const LOCAL_PERSISTANCE = config.LOCAL_TX_PERSISTANCE

export const localTxActions = {
  getTxs: (network) => {
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const parsedTxs = JSON.parse(storedTxs)
    mapValues(parsedTxs, (txs, network) => {
      const newTxs = mapValues(txs, (tx, hash, array) => {
        const now = Date.now() / 1000
        const txTimeGap = now - tx.timestamp
        if (txTimeGap > LOCAL_PERSISTANCE) {
          localTxActions.clearTx(network, hash)
        }
        return tx
      })
      return newTxs
    })
    const newStoredTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const newParsedTxs = JSON.parse(newStoredTxs)
    const txs = network ? newParsedTxs[network] : newParsedTxs
    return txs
  },
  addTx: (network, { hash, txParams }) => {
    const newTx = {
      [hash]: {
        hash,
        confirmations: 0,
        isConfirmed: false,
        from: '',
        timestamp: Date.now() / 1000,
        txParams
      }
    }
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const TXS = JSON.parse(storedTxs)
    const TxsByNetwork = { ...TXS[network], ...newTx }
    const newTXS = { ...TXS, [network]: TxsByNetwork }
    window.localStorage.setItem(TRANSACTIONS, JSON.stringify(newTXS))
  },
  updateTx: (network, txInfo) => {
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const TXS = JSON.parse(storedTxs)
    const TxsByNetwork = { ...TXS[network], ...txInfo }
    const newTXS = { ...TXS, [network]: TxsByNetwork }
    window.localStorage.setItem(TRANSACTIONS, JSON.stringify(newTXS))
  },
  clearTx: (network, hash) => {
    const storedTxs = window.localStorage.getItem(TRANSACTIONS) || '{}'
    const TXS = JSON.parse(storedTxs)
    const TxsByNetwork = TXS[network]
    delete TxsByNetwork[hash]
    const newTXS = { ...TXS, [network]: TxsByNetwork }
    window.localStorage.setItem(TRANSACTIONS, JSON.stringify(newTXS))
  }
}

/* const objectMap = async (object) => {
  var teamList = await getTeamList()
  for (let i = 0; i < teamList.length; i++) {
    let team = teamList[i]
    team.players = await getPlayerList(team.teamId)
  }
  return teamList
}

getTeams().then((data) => {
  console.log('Array of teams with players!', data)
}) */
