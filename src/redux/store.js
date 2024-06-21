import { configureStore } from '@reduxjs/toolkit'

import { walletReducer } from 'redux/slices/wallet'
import { gameBrowserReducer } from 'redux/slices/gameBrowser'
import { gameDataReducer } from 'redux/slices/gameData'
import { gamePoolReducer } from 'redux/slices/gamePool'
import { priceFeedReducer } from 'redux/slices/priceFeed'
import { notificationReducer } from 'redux/slices/notification'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    wallet: walletReducer,
    gameBrowser: gameBrowserReducer,
    gameData: gameDataReducer,
    gamePool: gamePoolReducer,
    priceFeed: priceFeedReducer
  }
})
