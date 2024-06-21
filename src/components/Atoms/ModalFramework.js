import React from 'react'
import styled from 'styled-components'

export const ModalFramework = ({ className, closeModal, backdropBlurred, children }) => {
  const backdropClick = () => {
    closeModal()
  }

  return (
    <BackDrop className={className} onClick={backdropClick} backdropBlurred={backdropBlurred}>
      {children}
    </BackDrop>
  )
}

const BackDrop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: ${({ backdropBlurred }) => (backdropBlurred ? 'blur(5px)' : 'none')};
`
