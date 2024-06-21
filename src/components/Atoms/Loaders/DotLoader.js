import React from 'react'
import styled, { keyframes } from 'styled-components'

export const DotLoader = ({ className, sizeInRem = 1 }) => {
  return (
    <DotsWrapper className={className} size={sizeInRem}>
      <DotsCarousel />
    </DotsWrapper>
  )
}

/**
 * ==============================================
 * Dot Carousel
 * ==============================================
 */

const colorDot = '#fff'

const dotCarousel = keyframes`
  0% {
    box-shadow: 9984px 0 0 -10px ${colorDot}, 9999px 0 0 1px ${colorDot}, 10014px 0 0 -1px ${colorDot};
  }
  50% {
    box-shadow: 10014px 0 0 -1px ${colorDot}, 9984px 0 0 -1px ${colorDot}, 9999px 0 0 1px ${colorDot};
  }
  100% {
    box-shadow: 9999px 0 0 1px ${colorDot}, 10014px 0 0 -1px ${colorDot}, 9984px 0 0 -1px ${colorDot};
  }`

const DotsWrapper = styled.div`
  position: relative;
  width: 35px;
  //margin: 0 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: 0.5;
  transform: ${({ size }) => `scale(${size})`};
`
const DotsCarousel = styled.div`
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  color: ${colorDot};
  box-shadow: 9984px 0 0 0 ${colorDot}, 9999px 0 0 0 ${colorDot}, 10014px 0 0 0 ${colorDot};
  animation: ${dotCarousel} 1.5s infinite linear;
`
