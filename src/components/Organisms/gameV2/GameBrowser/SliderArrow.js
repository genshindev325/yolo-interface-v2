import React from 'react'
import styled from 'styled-components'
import { icons } from 'common'

export const SliderArrow = ({ onClick, direction }) => {
  return (
    <Container direction={direction} onClick={onClick}>
      <ArrowIcon />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 45px;
  display: flex;
  background: linear-gradient(90deg, rgba(32, 37, 47, 0) 0%, rgba(32, 37, 47, 1) 100%);
  cursor: pointer;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  transform: rotate(180deg);
  z-index: 3;
  justify-content: flex-end;
  padding: 0 15px 0 0;
  align-items: center;
  ${({ direction }) => direction === 'next' && `right: 0;`}
  ${({ direction }) => direction === 'next' && `div { transform: rotate(180deg); }`}
  &:hover {
    div {
      background: rgba(255, 255, 255, 1);
    }
  }
  ${({ theme }) => theme.breakPoints['768px']} {
    display: none;
  }
`

const ArrowIcon = styled.div`
  mask: url(${icons.SliderArrowIcon}) center center / auto 24px no-repeat;
  background: rgba(255, 255, 255, 0.6);
  width: 14px;
  height: 24px;
`
