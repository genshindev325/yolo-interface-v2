import React from 'react'
import styled from 'styled-components'

export const Checkbox = ({ children, variant, checked = false, onChange }) => {
  return (
    <Container onClick={onChange}>
      <CheckBox variant={variant} checked={checked} />
      <Caption>{children}</Caption>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: flex-start;
  cursor: pointer;
  input {
    opacity: 0;
  }
`
const CheckBox = styled.div`
  display: flex;
  position: relative;
  &:before {
    content: '';
    background: ${({ variant, checked }) =>
      variant === 'contained' && checked ? 'rgba(42,109,255,.6)' : 'transparent'};
    height: 18px;
    width: 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-color: ${({ variant, checked }) =>
      variant === 'contained' && checked ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
    left: 0;
    border-radius: 5px;
    display: inline-block;
    margin: 0 10px 0 0;
  }
  &:after {
    position: absolute;
    content: '';
    height: 3px;
    width: 8px;
    border-left: 2px solid rgba(255, 255, 255, 1);
    border-bottom: 2px solid rgba(255, 255, 255, 1);
    transform: rotate(-45deg);
    left: 5px;
    top: 6px;
    display: ${({ checked }) => (checked ? 'inline-block' : 'none')};
  }
`
const Caption = styled.div``
