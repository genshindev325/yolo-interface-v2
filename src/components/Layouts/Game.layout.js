import styled from 'styled-components'

import { images } from 'common'

export const GameLayout = styled.div`
  display: grid;
  grid-template:
    'header' auto
    'gameSelector' auto
    'playArea' 1fr
    'footer' auto
    / 1fr;
  justify-items: stretch;
  position: relative;
  &::before {
    background: rgba(45, 51, 65, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: -1;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: url(${images.HomePageBgImgBlur}) center center / cover no-repeat;
    z-index: -2;
    @-moz-document url-prefix() {
      background: url(${images.HomePageBgImgBlur});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 250%;
    }
  }
`
