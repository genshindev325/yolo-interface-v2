import { socketConnect, socketDisconnect } from 'datasource/games'

import { gamePoolActions } from '../gamePool/actions'
import { gameBrowserActions } from '../gameBrowser/actions'
import { priceFeedReducerActions } from './index'

const { updateRegisteredGamesIds } = gameBrowserActions
const { getGamePool, updatePriceScale } = gamePoolActions
const { connect, disconnect, updateGames, pauseUpdate, resetGames } = priceFeedReducerActions

const fetchGamePool = (state, dispatch) => {
  const { gameData, gamePool, priceFeed, wallet } = state
  const { gameId } = gameData
  const { data, lastUpdateTimestamp } = priceFeed
  const settlementPrice = data[gameId]?.settlementPrice || null

  dispatch(updatePriceScale(!settlementPrice))

  /* 

  const getGamePoolParam = {
    state,
    gameId,
    queryRoundIndex: activeCardRoundIndex,
    myAddress: wallet.address
  } */

  const updateTimeInterval = 5 * 1000

  const fromLastUpdateTimestamp = Date.now() - gamePool.lastUpdateTimestamp

  // console.log('ACZ from last update -->', fromLastUpdateTimestamp)
  if (gamePool.gamePoolStatus !== 'loading') {
    if (fromLastUpdateTimestamp > updateTimeInterval) {
      dispatch(getGamePool({ state }))
    }
  }
}

// We can write thunks real actions, which may contain both sync and async logic.
const priceFeedOpenSocket = () => (dispatch, getState) => {
  socketConnect({
    connect: (id) => {
      dispatch(connect())
    },
    disconnect: (id) => {
      dispatch(disconnect())
    },
    broadcast: (data) => {
      const { priceFeed } = getState()
      if (!priceFeed.pauseUpdate) {
        dispatch(updateGames(data))
        dispatch(updateRegisteredGamesIds(data))
        const state = getState()
        fetchGamePool(state, dispatch)
      }
    }
  })
}

const priceFeedCloseSocket = () => (dispatch, getState) => {
  socketDisconnect()
  dispatch(disconnect())
}

export const priceFeedActions = {
  priceFeedOpenSocket,
  priceFeedCloseSocket,
  pauseUpdate,
  resetGames
}
