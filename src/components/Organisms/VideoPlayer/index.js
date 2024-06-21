import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'

import { Button } from 'components/Atoms/button/Button'
import { IconLib } from 'components/Atoms/IconLib'

const ORIGINAL_ASPECT_RATIO = 1280 / 720

const pageWrapperCover = css`
  min-width: 100%;
  width: 100%;
  max-width: none;
  min-height: 100%;
`
const pageWrapperModal = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.themeColors.textPrimary};
`
const PlayerWrapper = styled.div`
  position: relative;
  ${({ cover }) => (cover ? pageWrapperCover : pageWrapperModal)}
  overflow: hidden;
  z-index: 1;
`
const Player = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: ${({ cover }) => (cover ? '100%' : `none`)};
  min-height: ${({ cover }) => (cover ? '100%' : `none`)};
  width: ${({ cover }) => (cover ? 'none' : `100%`)};
  max-height: ${({ cover }) => (cover ? 'none' : `100%`)};
`
const controlLayerCover = css`
  top: 0;
  left: 0;
  height: 100%;
`
const controlLayerModal = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${100 / ORIGINAL_ASPECT_RATIO}vw;
  max-height: 100%;
  max-width: ${({ verticalPadding }) => `calc((100vh - ${verticalPadding * 2}px)*${ORIGINAL_ASPECT_RATIO})`};
  @media (max-width: ${({ theme }) => theme.layout.TABLET_BREAKPOINT}) {
    max-width: 100%;
  }
`
const ControlLayer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 5;
  ${({ cover }) => (cover ? controlLayerCover : controlLayerModal)}
`
const ControlContainer = styled.div`
  position: absolute;
  right: 0px;
  bottom: ${({ cover }) => (cover ? '0px' : '80px')};
  cursor: pointer;
  display: flex;
  align-items: center;
  div {
    &:first-child {
      margin-right: 30px;
    }
  }
  margin: 0 30px 20px 0;
  @media (max-width: ${({ theme }) => theme.layout.TABLET_BREAKPOINT}) {
    bottom: 0px;
  }
`
const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`
const CloseButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`
const SoundOnIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'soundOn',
  dimension: '25px'
})`
  fill: ${({ theme }) => theme.themeColors.textPrimary};
`
const SoundOffIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'soundOff',
  dimension: '25px'
})`
  fill: ${({ theme }) => theme.themeColors.textPrimary};
`
const PlayIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'play',
  dimension: '20px'
})`
  fill: ${({ theme }) => theme.themeColors.textPrimary};
`
const PauseIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'pause',
  dimension: '20px'
})`
  fill: ${({ theme }) => theme.themeColors.textPrimary};
`
const CloseIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'close',
  dimension: '20px'
})`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  fill: ${({ theme }) => theme.themeColors.textPrimary};
`
const SkipButton = styled(Button)`
  margin-right: 30px;
`

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.themeColors.videoOverlay};
  z-index: 1;
  display: block;
`

export const VideoPlayer = ({
  videoSrc,
  cover,
  onEnded,
  noControls = false,
  verticalPadding = 0,
  videoOverlay = false
}) => {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [isPause, setPause] = useState(false)

  const toggleSound = () => {
    setMuted(!muted)
  }

  const toggleReproduction = () => {
    const play = () => videoRef.current.play()
    const pause = () => videoRef.current.pause()
    setPause(!isPause)
    isPause ? play() : pause()
  }
  return (
    <PlayerWrapper cover={cover}>
      {!noControls && (
        <ControlLayer cover={cover} verticalPadding={verticalPadding}>
          {!cover && (
            <CloseButton onClick={onEnded}>
              <CloseIcon />
            </CloseButton>
          )}
          <ControlContainer cover={!cover}>
            {!cover ? (
              <>
                <SkipButton variant='secondary' onClick={onEnded}>
                  SKIP
                </SkipButton>
                <IconButton onClick={toggleSound}>{muted ? <SoundOffIcon /> : <SoundOnIcon />}</IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={toggleSound}>{muted ? <SoundOffIcon /> : <SoundOnIcon />}</IconButton>
                <IconButton onClick={toggleReproduction}>{isPause ? <PlayIcon /> : <PauseIcon />}</IconButton>
              </>
            )}
          </ControlContainer>
        </ControlLayer>
      )}
      {videoOverlay && <VideoOverlay />}
      <Player
        muted={muted}
        autoPlay
        playsInline
        onEnded={() => !cover && onEnded()}
        ref={videoRef}
        contained={!cover}
        loop={cover}
        cover={cover}
      >
        <source src={videoSrc} type='video/mp4' />
        Your browser does not support HTML5 video.
      </Player>
    </PlayerWrapper>
  )
}
