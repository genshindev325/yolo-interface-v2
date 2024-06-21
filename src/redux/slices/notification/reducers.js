import { createAsyncThunk } from '@reduxjs/toolkit'

import { modalInitialState, toastInitialState, bannerInitialState } from './initialState'

// The `reducers` object lets us define reducers and generate associated actions
export const notificationReducers = {
  setModal: (state, action) => {
    state.modalShow = action.payload.show ?? state.modalShow
    state.modalLocked = action.payload.locked ?? state.modalLocked
    state.modalId = action.payload.id ?? state.modalId
    state.modalPriority = action.payload.priority ?? state.modalPriority
    state.modalProps = action.payload.props ?? state.modalProps
    state.modalBackdropClose = action.payload.backdropClose ?? state.modalBackdropClose
    state.modalBackdropBlurred = action.payload.backdropBlurred ?? state.modalBackdropBlurred
  },
  cleanModal: (state, action) => {
    state.modalShow = modalInitialState.modalShow
    state.modalLocked = modalInitialState.modalLocked
    state.modalId = modalInitialState.modalId
    state.modalPriority = modalInitialState.modalPriority
    state.modalProps = modalInitialState.modalProps
    state.modalBackdropClose = modalInitialState.modalBackdropClose
    state.modalBackdropBlurred = modalInitialState.modalBackdropBlurred
  },
  updateToast: (state, action) => {
    state.toastShow = action.payload.show ?? state.toastShow
    state.toastId = action.payload.id ?? state.toastId
    state.toastProps = action.payload.props ?? state.toastProps
  },
  cleanToast: (state, action) => {
    state.toastShow = toastInitialState.toastShow
    state.toastId = toastInitialState.toastId
    state.toastProps = toastInitialState.toastProps
  },
  updateBanner: (state, action) => {
    state.bannerShow = action.payload.show ?? state.bannerShow
    state.bannerId = action.payload.id ?? state.bannerId
    state.bannerProps = action.payload.props ?? state.bannerProps
  },
  cleanBanner: (state, action) => {
    state.bannerShow = bannerInitialState.bannerShow
    state.bannerId = bannerInitialState.bannerId
    state.bannerProps = bannerInitialState.bannerProps
  }
}
