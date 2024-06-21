import { createSelector } from '@reduxjs/toolkit'

/**
 * Notification
 */
export const selectModalShow = () => (state) => state.notification.modalShow
export const selectModalState = () =>
  createSelector(
    (state) => state.notification.modalShow,
    (state) => state.notification.modalLocked,
    (state) => state.notification.modalId,
    (state) => state.notification.modalPriority,
    (state) => state.notification.modalProps,
    (state) => state.notification.modalBackdropClose,
    (state) => state.notification.modalBackdropBlurred,
    (modalShow, modalLocked, modalId, modalPriority, modalProps, modalBackdropClose, modalBackdropBlurred) => ({
      show: modalShow,
      locked: modalLocked,
      id: modalId,
      priority: modalPriority,
      props: modalProps,
      backdropClose: modalBackdropClose,
      backdropBlurred: modalBackdropBlurred
    })
  )
export const selectToastState = () =>
  createSelector(
    (state) => state.notification.toastShow,
    (state) => state.notification.toastId,
    (state) => state.notification.toastProps,
    (toastShow, toastId, toastProps) => ({
      show: toastShow,
      id: toastId,
      props: toastProps
    })
  )
export const selectBannerState = () =>
  createSelector(
    (state) => state.notification.bannerShow,
    (state) => state.notification.bannerId,
    (state) => state.notification.bannerProps,
    (bannerShow, bannerId, bannerProps) => ({
      show: bannerShow,
      id: bannerId,
      props: bannerProps
    })
  )
