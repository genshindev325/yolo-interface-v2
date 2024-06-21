import React from 'react'
import styled from 'styled-components'

import { VideoPlayer } from 'components/Organisms/VideoPlayer'
import backgroundImg from 'assets/img/yolorekt_beer_bg-cover.jpg'

import LandingVideo from 'assets/videos/yolorekt_landing.mp4'

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: block;
  background: #000000;
`
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(5, 11, 28, 0.65);
`
const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-color: ${({ theme }) => theme.themeColors.black};
`
const VideoBackground = ({ onEnded }) => {
  return (
    <VideoOverlay>
      <VideoPlayer key='0' videoSrc={LandingVideo} cover videoOverlay />
    </VideoOverlay>
  )
}

export const Background = () => {
  return <BackgroundWrapper>{<VideoBackground />}</BackgroundWrapper>
}

export default Background
