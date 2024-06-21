import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Cube3d = ({ className, rotate }) => {
  return (
    <CubeWrap className={className}>
      <Box rot={rotate}>
        <SideBack />
        <SideTop />
        <SideBottom />
        <SideLeft />
        <SideRight />
        <SideFront />
      </Box>
    </CubeWrap>
  )
}

const cubeSize = 7
const rotate = keyframes`
  from {
    transform: rotateY(45deg);
  }
  to {
    transform: rotateY(405deg);
  }
`

const CubeWrap = styled.div`
  width: ${cubeSize}px;
  height: ${cubeSize}px;
  perspective: 20000px;
  perspective-origin: 50% -10000px;
`
const SingleBox = styled.div`
  //background-image: linear-gradient(to right, rgba(0, 66, 154, 1) 0%, rgba(167, 64, 181, 1) 100%);
  background-size: cover;
  background-color: rgba(31, 36, 46, 0.9);
  display: block;
  position: absolute;
  width: ${cubeSize}px;
  height: ${cubeSize}px;
  transform: rotateY(45deg) translateZ(-200px) rotateX(15deg);
  transform-origin: 50% 50% 0;
  border: 1px solid #fff;
`
const Box = styled.div`
  transform-style: preserve-3d;
  transform: rotateY(45deg);
  animation: ${rotate} ${({ rot }) => (rot ? '2s' : '0s')} infinite ease-in-out;
`
const SideFront = styled(SingleBox)`
  transform: translateZ(${cubeSize / 2}px);
`
const SideBack = styled(SingleBox)`
  transform: rotateY(180deg) translateZ(${cubeSize / 2}px);
`
const SideTop = styled(SingleBox)`
  //background-image: linear-gradient(to right, rgba(0, 66, 154, 1) 0%, rgba(167, 64, 181, 1) 100%);
  transform: rotateX(90deg) translateZ(${cubeSize / 2}px);
`
const SideBottom = styled(SingleBox)`
  transform: rotateX(-90deg) translateZ(${cubeSize / 2}px);
  //background-image: linear-gradient(to right, rgba(0, 66, 154, 1) 0%, rgba(167, 64, 181, 1) 100%);
`
const SideLeft = styled(SingleBox)`
  transform: rotateY(-90deg) translateZ(${cubeSize / 2}px);
`
const SideRight = styled(SingleBox)`
  transform: rotateY(90deg) translateZ(${cubeSize / 2}px);
`
