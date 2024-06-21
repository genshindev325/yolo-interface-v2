import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import { selectGameIdCurrentRoundIndex, selectGamePool } from 'redux/selectors'

import { icons } from 'common'

export const TotalView = () => {
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex())
  const gamePool = useSelector(selectGamePool())
  const numPlayers = useMemo(() => gamePool?.players || 0, [gamePool?.players])

  return useMemo(
    () => (
      <Container>
        <AssetsRow>
          <GameTypeArea>
            <LiveGameType> LIVE </LiveGameType>
            <RoundNumber>
              {' '}
              Round <div>{gameIdCurrentRoundIndex || 0}</div>
            </RoundNumber>
          </GameTypeArea>
          <NumberOfPlayers> {`${numPlayers} player${numPlayers === 1 ? '' : 's'}`} </NumberOfPlayers>
          <GameAccessories>
            <AssetIcon></AssetIcon>
            <GameAssetsDisplay></GameAssetsDisplay>
          </GameAccessories>
        </AssetsRow>
      </Container>
    ),
    [gameIdCurrentRoundIndex, numPlayers]
  )
}

const steam = keyframes`
	0% {
		background-position: 0 0;
	}
	50% {
		background-position: 400% 0;
	}
	100% {
		background-position: 0 0;
	}
`
const Container = styled.div`
  left: 0;
  top: 0;
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`
const AssetsRow = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  border-bottom: 0;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const GameTypeArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

const RoundNumber = styled.div`
  font-size: 1.4rem;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 100%;
  margin: 2px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & div {
    font-weight: 700;
    padding-left: 6px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0;

    & div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 75px;
      direction: rtl;
      text-align: left;
      display: inline-block;
    }
  }
`

const NumberOfPlayers = styled.div`
  display: flex;
  align-items: flex-start;
  margin: -15px 0 0 94px;
  font-size: 0.8rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin: -13px 0 0 88px;
  }
`

const GameAccessories = styled.div`
  display: flex;
  border-top: 1px dotted rgba(255, 255, 255, 0.4);
  padding: 10px 0 0 0;
  margin: 5px 0 0 8px;
  flex-direction: row;
  width: auto;
  display: none;

  @media (max-width: 480px) {
    margin: 0 0 0 8px;
  }
`

const AssetIcon = styled.div`
  background: url(${icons.EthBlueIcon}) center center / auto 22px no-repeat;
  height: 22px;
  width: 22px;
  margin: 0 3px 0 0;
  display: none;
`

const GameAssetsDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LiveGameType = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #fff;
  font-weight: 700;
  justify-content: center;
  position: relative;
  background: #1f2531;
  border-radius: 10px;
  padding: 6px 8px;
  line-height: 100%;
  margin: 2px 12px 0 2px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: ${steam} 20s linear infinite;
    border-radius: 10px;
    background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(54, 199, 255, 1) 15%,
        rgba(116, 109, 255, 1) 31%,
        #e20e55 47%,
        rgba(42, 109, 255, 1) 62%,
        rgba(0, 212, 255, 1) 79%,
        rgba(171, 212, 255, 1)
      )
      center center / 400% 400%;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`
