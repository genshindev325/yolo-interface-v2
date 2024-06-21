import React from 'react'
import styled from 'styled-components'

export const HeaderItem = ({ children, onClick, modalId, forMobile }) => {
  const onAction = () => {
    onClick && onClick()
  }
  return (
    <LeftItem onClick={onAction} forMobile={forMobile}>
      {children}
    </LeftItem>
  )
}

const LeftItem = styled.div`
  display: ${({ forMobile }) => (forMobile ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 5px;
  //height: 60px;
  padding: 10px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 0 0 20px;
  text-decoration: underline;
  text-decoration-color: #666;
  text-underline-position: under;
  font-size: 13px;
  align-items: center;
  &:hover {
    text-decoration: none;
  }
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
  }
  ${({ theme }) => theme.breakPoints['600px']} {
    display: ${({ forMobile }) => (forMobile ? 'flex' : 'none')};
  }
`
