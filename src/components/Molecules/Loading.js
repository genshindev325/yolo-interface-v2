import React from 'react'
import styled from 'styled-components'

import { icons } from 'common'

export const Loading = () => {
  return (
    <LoadingLightWrapper>
      <IconContainer>
        <img alt='loading' src={icons.LoadingMoon} />
      </IconContainer>
    </LoadingLightWrapper>
  )
}

const LoadingLightWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% + 60px);
  height: 100%;
  background: rgba(32, 38, 51, 0.8);
  backdrop-filter: blur(0);
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: 800;
  flex-direction: column;
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% + 60px);
  height: 100%;
  background: rgba(32, 38, 51, 0.8);
  backdrop-filter: blur(0);
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: 800;
  flex-direction: column;
  &:before {
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    -webkit-filter: blur(100px);
    filter: blur(100px);
    width: 30vw;
    height: 30vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
    content: '';
    border-radius: 50%;
  }
  &:after {
    position: absolute;
    background: rgba(42, 109, 255, 0.5);
    -webkit-filter: blur(140px);
    filter: blur(140px);
    width: 30vw;
    height: 30vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    content: '';
    border-radius: 50%;
  }
`
const IconContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 0;
  z-index: 8;
  img {
    width: 150px;
    height: 150px;
    display: block;
  }
`
