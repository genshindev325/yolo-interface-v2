import React, { useState } from 'react'
import styled from 'styled-components'

const MenuBtn = () => {
  const [open, setOpen] = useState(false)

  return (
    <Button
      onClick={() => setOpen(!open)}
      style={{
        position: 'relative',
        zIndex: '100'
      }}
    >
      <Icon open={open} />
    </Button>
  )
}

export default MenuBtn

const Button = styled.button`
  outline: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  background-image: none;
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  margin-left: auto;
  &:focus {
    outline: none;
  }
`
const Icon = styled.span`
  position: relative;
  margin-top: 12px;
  margin-bottom: 12px;
  &:before {
    top: -9px;
  }
  &:after {
    top: 9px;
  }

  ${({ open }) =>
    open &&
    `
    background-color: transparent !important;
    &:after {
        transform: translateY(-9px) rotate(-45deg);
    }
    &:before {
        transform: translateY(9px) rotate(45deg);
    }
  `}
  &:after,
  &:before {
    position: absolute;
    content: '';
  }
  &:before,
  &:after {
    display: block;
    width: 40px;
    height: 4px;
    border-radius: 2px;
    transition: background-color 0.3s linear, transform 0.3s linear;
    background-color: #848790;
  }
  display: block;
  width: 40px;
  height: 4px;
  border-radius: 2px;
  transition: background-color 0.3s linear, transform 0.3s linear;
  background-color: #848790;
`
