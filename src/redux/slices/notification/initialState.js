export const modalInitialState = {
  modalShow: false,
  modalLocked: false,
  modalId: null,
  modalPriority: 5, // lower number more priority
  modalProps: {},
  modalBackdropClose: true,
  modalBackdropBlurred: true
}

export const toastInitialState = {
  toastShow: false,
  toastId: null,
  toastProps: {}
}
export const bannerInitialState = {
  bannerShow: false,
  bannerId: null,
  bannerProps: {}
}
export const notificationInitialState = {
  ...modalInitialState,
  ...toastInitialState,
  ...bannerInitialState
}
