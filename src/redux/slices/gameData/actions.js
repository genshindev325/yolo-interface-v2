import { getGameParameters } from 'config/games.config'
import { getWeb3Utils } from 'utils'

import { gameDataReducerActions } from './index'

const { setActGame } = gameDataReducerActions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/* export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount) => {
  const response = await fetchCount(amount)
  // The value we return becomes the `fulfilled` action payload
  return response.data
}) */

// We can write thunks real actions, which may contain both sync and async logic.
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

const setMyGame =
  ({ gameId, activeCardRoundOffset, checkBidResult }) =>
  (dispatch, getState) => {
    const { gameData, priceFeed, notification } = getState()
    const gameHexId = getWeb3Utils().soliditySha3(gameId)
    const gameIdRoundIndex = priceFeed.data[gameId]?.roundIndex
    let roundOffset = activeCardRoundOffset
    if (notification.modalId === 'bidding') {
      roundOffset = gameData.activeCardRoundOffset
    }
    const activeCardRoundIndex = gameIdRoundIndex ? Number(gameIdRoundIndex) + roundOffset : 0
    dispatch(
      setActGame({
        gameId,
        gameHexId,
        activeCardRoundOffset: roundOffset,
        activeCardRoundIndex,
        checkBidResult
      })
    )
  }

const bidOnNext = () => (dispatch, getState) => {
  const { gameData } = getState()
  const gameId = gameData.gameId
  const activeCardRoundOffset = 1
  dispatch(setMyGame({ gameId, activeCardRoundOffset }))
}

export const gameDataActions = {
  setMyGame,
  bidOnNext
}
