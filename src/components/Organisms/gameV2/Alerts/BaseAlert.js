import React from 'react'
import styled from 'styled-components'

export const BaseAlert = ({ open, children }) => {
  return (
    <Container open={open}>
      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  z-index: 3;
  display: ${({ open }) => (open ? 'block' : 'none')};
`
const Content = styled.div`
  max-width: 300px;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 5;
  &::before {
    width: 100%;
    height: 100%;
    padding: 15px 10px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    z-index: 6;
    content: '';
    position: fixed;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::after {
    width: 100%;
    height: 100%;
    padding: 15px 10px;
    background: rgba(0, 0, 0, 0.6);
    -webkit-filter: blur(50px);
    z-index: 3;
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
