import styled from 'styled-components'
import { ToastContainer, Slide, Flip, Zoom, Bounce } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const ToastFramework = styled(ToastContainer).attrs({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: false,
  pauseOnHover: false,
  closeButton: false,
  //className: 'toast-container',
  toastClassName: 'toastWrapper',
  bodyClassName: 'toastBody',
  progressClassName: 'toastProgress',
  transition: Slide
})`
  /* Toast-container */
  top: 0 !important;
  padding-top: 0 !important;
  min-width: fit-content;
  .toastWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 400px;
    width: 100%;
    max-width: 400px;
    margin: auto;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(25px);
    white-space: nowrap;
    padding: 0;
    border-radius: 0;
    &:not(:first-child) {
      margin-top: 4px;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
  .toastBody {
    padding: 0;
  }
  .toastProgress {
    background: ${({ theme }) => theme.themeColors.primary};
    height: 2px;
  }
`
