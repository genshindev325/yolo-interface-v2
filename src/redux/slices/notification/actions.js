import { notificationReducerActions } from './index'
import { modalInitialState } from './initialState'

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

const { setModal, cleanModal, cleanBanner, cleanToast, updateBanner, updateToast } = notificationReducerActions

export const updateModal = (modalObj) => (dispatch, getState) => {
  const comingPriority = modalObj.priority || modalInitialState.modalPriority
  const state = getState()
  const modalPriority = state.notification.modalPriority
  if (comingPriority <= modalPriority) {
    dispatch(setModal(modalObj))
  }
}

export const clearModal = (modalId) => (dispatch, getState) => {
  const state = getState()
  if (state.notification.modalPriority > 0 && modalId === 'all') {
    dispatch(cleanModal())
  }
  if (modalId === state.notification.modalId) {
    dispatch(cleanModal())
  }
}

export const clearBanner = (bannerId) => (dispatch, getState) => {
  const state = getState()
  if (bannerId === state.notification.bannerId || bannerId === 'all') {
    dispatch(cleanBanner())
  }
}

export const clearToast = (toastId) => (dispatch, getState) => {
  const state = getState()
  if (toastId === state.notification.toastId || toastId === 'all') {
    dispatch(cleanToast())
  }
}

export const notificationActions = { updateModal, clearModal, updateBanner, clearBanner, updateToast, clearToast }
