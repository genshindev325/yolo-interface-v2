import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { notificationActions, gamePoolActions } from 'redux/actions'
import { selectModalState, selectToastState, selectBannerState } from 'redux/selectors'

import { ToastFramework } from 'components/Atoms/ToastFramework'
import { ModalFramework } from 'components/Atoms/ModalFramework'
import { ModalLib } from 'components/Organisms/ModalLib'
import { BannerLib } from 'components/Organisms/BannerLib'

import { ToastLib } from 'components/Organisms/ToastLib'

export const NotificationLayout = ({ children }) => {
  const dispatch = useDispatch()
  const modalState = useSelector(selectModalState())
  const toastState = useSelector(selectToastState())
  const bannerState = useSelector(selectBannerState())

  // Specially for Modal
  const closeModal = (closeOptions) => {
    const { unupdatePriceScale } = closeOptions || {}
    dispatch(notificationActions.clearModal('all'))
    unupdatePriceScale && dispatch(gamePoolActions.updatePriceScale(true))
  }
  const backDropClick = () => modalState.backdropClose && closeModal()

  // Specially for Toast (For toast we will use the Rayan lib,
  // may be we can integrate it in the action logic instead of here)
  useEffect(() => {
    const { show, id, props } = toastState

    if (show) {
      toast(<ToastLib toastId={id} {...props} />, {
        toastId: id,
        onOpen: ({ uid }) => dispatch(notificationActions.clearToast(id)),
        onClose: ({ uid }) => dispatch(notificationActions.clearToast(id))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastState])

  // const closeToast = () => dispatch(notificationActions.clearToast())
  // const isValidToastElement = React.isValidElement(toast.component)
  // const ToastComponent = isValidToastElement ? React.cloneElement(toast.component, { closeToast }) : null

  // Specially for banner
  const closeBanner = () => dispatch(notificationActions.clearBanner('all'))
  // const isValidToastElement = React.isValidElement(modal.component)
  // const ToastComponent = isValidToastElement ? React.cloneElement(modal.component, { closeToast }) : modal.component

  return (
    <NotificationWrapper id='notificationWrapper'>
      <ToastFramework />
      {bannerState.show && (
        <BannerWrapper id='bannerWrapper'>
          <BannerLib closeBanner={closeBanner} bannerId={bannerState.id} {...bannerState.props} />
        </BannerWrapper>
      )}
      <ContentWrapper id='ContentWrapper'>{children}</ContentWrapper>
      {modalState.show && (
        <ModalWrapper id='modalWrapper'>
          <ModalFramework
            id='mainModalContainer'
            closeModal={backDropClick}
            backdropBlurred={modalState.backdropBlurred}
          >
            <ModalLib closeModal={closeModal} modalId={modalState.id} {...modalState.props} />
          </ModalFramework>
        </ModalWrapper>
      )}
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled.div`
  display: grid;
  grid-template:
    'banner' auto
    'content' 1fr
    /1fr;
  height: 100%;
  justify-items: stretch;
`
const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
`
const BannerWrapper = styled.div`
  grid-area: banner;
  z-index: 1;
`
const ContentWrapper = styled.div`
  grid-area: content;
  position: relative;
  z-index: 0;
  display: grid;
`
