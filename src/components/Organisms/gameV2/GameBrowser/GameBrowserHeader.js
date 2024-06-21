import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Tooltip } from 'components/Atoms/Tooltip'
import { IconLib } from 'components/Atoms/IconLib'

import { selectCurrentPrice, selectStrikePrice, selectActiveGameId } from 'redux/selectors'
import { currencyFormatter } from 'utils'

import { getGameParameters } from 'config/games.config'
import { useGameProgress } from 'utils/hooks'
import { LONGDASH } from 'utils/constants'

const RenderGameHeaderRow = ({ selectedGameId }) => {
  const currentPrice = useSelector(selectCurrentPrice(selectedGameId))
  const strikePrice = useSelector(selectStrikePrice(selectedGameId))
  const gameId = useSelector(selectActiveGameId())

  const { name, icon, brightness, GAME_BLOCK_LENGTH, FIAT_DECIMAL_SHOW_DIGITS } = getGameParameters(selectedGameId)
  const { blocksLeft } = useGameProgress(selectedGameId, 0)
  const priceDelta = strikePrice && currentPrice ? currentPrice - strikePrice : 0
  const isUp = priceDelta >= 0
  const priceDeltaAbs = strikePrice ? `${((Math.abs(priceDelta) / strikePrice) * 100).toFixed(2)}%` : LONGDASH
  const isActive = selectedGameId === gameId
  const currentPriceDisplay = currentPrice ? currencyFormatter(currentPrice, { FIAT_DECIMAL_SHOW_DIGITS }) : LONGDASH

  const Asset = () => {
    return (
      <AssetContainer>
        <CurrencyIcon icon={icon} isActive={isActive} brightness={brightness} className='currency-icon' />
        <AssetName isActive={isActive} className='asset-name'>
          {name.toUpperCase()}
        </AssetName>
      </AssetContainer>
    )
  }

  return (
    <GameHeaderRow>
      <GameTooltip container={<Asset />}>
        <AssetPrice>
          <Price>
            <p>{currentPriceDisplay}</p>
          </Price>
          {strikePrice ? (
            <Change>
              <IconArrow masking isUp={isUp} rotate={!isUp ? 'up' : 'down'} />
              <PriceDiff isUp={isUp}>{priceDeltaAbs}</PriceDiff>
            </Change>
          ) : (
            LONGDASH
          )}
        </AssetPrice>
      </GameTooltip>
      <GameTime isActive={isActive} className='game-time'>
        <IconBlock masking />
        <BlockValue>{GAME_BLOCK_LENGTH}</BlockValue>
      </GameTime>
    </GameHeaderRow>
  )
}

export const GameBrowserHeader = ({ selectedGamesIds }) => {
  return (
    <Container>
      <Overview>
        {selectedGamesIds.slice(0, selectedGamesIds.length).map((selectedGameId) => (
          <RenderGameHeaderRow selectedGameId={selectedGameId} key={selectedGameId} />
        ))}
      </Overview>
    </Container>
  )
}

const Container = styled.div`
  min-width: 230px;

  ${({ theme }) => theme.breakPoints['1200px']} {
    min-width: 180px;
    padding-right: 10px;
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    min-width: 55px;
    padding-right: 0px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    min-width: 45px;
  }
`
const Overview = styled.ul`
  list-style: none;
`
const GameHeaderRow = styled.li`
  display: flex;
  padding: 0 0 0 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0 0 2px 0;
  height: 40px;

  ${({ theme }) => theme.breakPoints['1200px']} {
    justify-content: space-between;
  }

  ${({ theme }) => theme.breakPoints['600px']} {
    border-bottom: 0;
    padding: 0 0 0 20px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    border-bottom: 0;
    padding: 0 0 0 10px;
  }
`
const CurrencyIcon = styled.div`
  background: ${({ icon }) => `url(${icon}) center / 22px 22px no-repeat`};
  -webkit-filter: ${({ isActive, brightness }) =>
    isActive ? `grayscale(0%)` : `grayscale(100%) ${brightness ? brightness : ''}`};
  min-width: 22px;
  height: 22px;
  width: 22px;
`
const GameTooltip = styled(Tooltip)`
  & .bottom {
    left: 0;
    transform: translate(0);
  }
`
const AssetContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
`
const AssetName = styled.div`
  text-align: left;
  margin: 0 5px 0 10px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 80px;
  text-overflow: ellipsis;
  -webkit-filter: ${({ isActive }) => (isActive ? `brightness(100%)` : `brightness(60%)`)};

  ${({ theme }) => theme.breakPoints['600px']} {
    display: none;
  }
`
const AssetPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Price = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & p {
    padding: 0 10px 0 0;
  }
`
const Change = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const IconArrow = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp' })`
  width: 10px;
  height: 10px;
  background: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const PriceDiff = styled.div`
  font-weight: 700;
  padding: 0 0 0 3px;
  color: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
const GameTime = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  padding: 3px 4px;
  -webkit-filter: ${({ isActive }) => (isActive ? `brightness(100%)` : `brightness(60%)`)};

  ${({ theme }) => theme.breakPoints['600px']} {
    margin: 0 5px;
  }
`
const IconBlock = styled(IconLib).attrs({ collection: 'crypto', name: 'block', dimension: '10px' })`
  background: rgba(255, 255, 255, 1);
  width: 10px;
  height: 10px;
  display: block;
  -webkit-mask-size: 10px 10px;
  margin: 0 5px 0 0;
`
const BlockValue = styled.div`
  font-weight: 700;
  line-height: 100%;
  font-size: 0.75rem;

  ${({ theme }) => theme.breakPoints['600px']} {
    font-weight: 600;
    line-height: 0;
    font-size: 0.65rem;
    top: 0.1em;
    position: relative;
  }
`
