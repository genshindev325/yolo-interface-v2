import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Slider from 'react-slick'

import { selectSelectedGameIds, selectGameIdCurrentRoundIndex } from 'redux/selectors'

import { useWindowSize } from 'utils/hooks'
import { CARDS_ROUND_OFFSET } from 'config/games.config'

import { GameBrowserHeader } from './GameBrowserHeader'
import { SliderArrow } from './SliderArrow'
import { RibbonColumn } from './RibbonColumn'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 3,
  focusOnSelect: true,
  variableWidth: true,
  prevArrow: <SliderArrow direction='prev' />,
  nextArrow: <SliderArrow direction='next' />
}

export const GameBrowser = ({ gridArea, onTap }) => {
  const selectedGamesIds = useSelector(selectSelectedGameIds())
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex())

  const [slidesToShow, setSlidesToShow] = useState(1)
  const { width } = useWindowSize()
  const [ribbonCardsData, setRibbonCardsData] = useState([])
  const [sliderWidth, setSliderWidth] = useState(0)
  const [centerMode, setCenterMode] = useState(true)

  const sliderRef = useRef()
  const wrapperRef = useRef()

  useEffect(() => {
    const slider = sliderRef.current
    const liveCardIndex = CARDS_ROUND_OFFSET.findIndex((item) => item === 0)
    slider.slickGoTo(liveCardIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIdCurrentRoundIndex])

  useEffect(() => {
    setSlidesToShow(width / 300)
  }, [width])

  useEffect(() => {
    const sortedArray = []
    const bigArray = []
    selectedGamesIds.forEach((selectedGameId) => {
      CARDS_ROUND_OFFSET.forEach((cardRoundOffset) => {
        bigArray.push({ cardRoundOffset, gId: selectedGameId })
      })
      bigArray.sort((a, b) => {
        const aRoundOffset = a.cardRoundOffset
        const bRoundOffset = b.cardRoundOffset
        return aRoundOffset - bRoundOffset
      })
    })
    for (let i = 0; i < bigArray.length; i += selectedGamesIds.length) {
      const myChunk = bigArray.slice(i, i + selectedGamesIds.length)
      sortedArray.push(myChunk)
    }
    setRibbonCardsData(sortedArray)
  }, [selectedGamesIds])

  useEffect(() => {
    if (wrapperRef.current?.clientWidth) {
      const magicOffset = 15
      setSliderWidth(width - wrapperRef.current?.clientWidth - magicOffset)
    }
  }, [width])

  const onContainerClick = () => {
    onTap && onTap({ id: 'game' })
  }

  const onColumnClick = (index) => {
    setCenterMode(index >= 1)
  }

  return (
    <Container gridArea={gridArea} onClick={onContainerClick}>
      <div ref={wrapperRef}>
        <GameBrowserHeader selectedGamesIds={selectedGamesIds} />
      </div>
      <SliderWrapper id='sliderWrapper'>
        <Slider
          {...settings}
          style={{ width: sliderWidth }}
          slidesToShow={slidesToShow}
          initialSlide={0}
          ref={sliderRef}
          centerMode={centerMode}
        >
          {ribbonCardsData.map((columnData, index) => (
            <RibbonColumn data={columnData} key={index} onClick={() => onColumnClick(index)} />
          ))}
        </Slider>
      </SliderWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //width: 100%;
  position: relative;
  overflow: hidden;
  &:hover #ribbonCardBase {
    opacity: 0.75;
  }
  &:hover #ribbonCardBase:hover {
    opacity: 1;
  }
  &:hover .currency-icon,
  &:hover .asset-name,
  &:hover .game-time {
    -webkit-filter: grayscale(0%) brightness(100%);
  }
  ${({ gridArea }) => ({ gridArea })}
`
export const SliderWrapper = styled.div`
  flex-grow: 1;
  .slick-track {
    display: flex;
  }
  .slick-list {
    overflow: initial;
    overflow-x: clip;
  }
  padding-left: 15px;
  ${({ theme }) => theme.breakPoints['sm']} {
    padding-left: 0;
  }
`
