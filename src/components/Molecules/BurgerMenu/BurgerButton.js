import React from 'react'

import styled from 'styled-components'

export const BurgerButton = ({ menuIsOpen }) => {
  return (
    <Wrapper>
      <StyledBurger open={menuIsOpen}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 5px 0 15px;
  height: 20px;
  width: 20px;
  justify-content: space-around;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  &:focus {
    outline: none;
  }
  transform: ${({ open }) => (open ? 'translate(2px)' : 'translate(0px)')};

  div {
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.themeColors.white};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      width: ${({ open }) => open && '105%'};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      //transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      width: ${({ open }) => open && '105%'};
    }
  }
`
