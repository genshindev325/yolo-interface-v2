import { gamePoolReducerActions } from './index'
import { gamePoolExtraReducer } from './reducers'

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

const { updatePriceScale } = gamePoolReducerActions
const { getGamePool } = gamePoolExtraReducer

export const gamePoolActions = { updatePriceScale, getGamePool }
