import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  selectActiveCardRoundIndex,
  selectActiveGameId,
  selectCurrentPrice,
  selectStrikePrice,
  selectGamePool,
  selectIsGameClosed
} from 'redux/selectors'
import { currencyFormatter } from 'utils'
import { getGameParameters } from 'config/games.config'

import { useConvertAmount } from 'utils/hooks'
import { RunningBlocks } from 'components/Organisms/gameV2'
import { icons } from 'common'
import { LONGDASH } from 'utils/constants'

export const NextGamePlay = () => {
  const activeCardRoundIndex = useSelector(selectActiveCardRoundIndex())
  const activeGameId = useSelector(selectActiveGameId())
  const currentPrice = useSelector(selectCurrentPrice())
  const strikePrice = useSelector(selectStrikePrice())

  const priceDelta = strikePrice && currentPrice ? currentPrice - strikePrice : 0
  const isUp = priceDelta >= 0
  const priceDeltaAbs = strikePrice ? `${((Math.abs(priceDelta) / strikePrice) * 100).toFixed(2)}%` : LONGDASH
  const priceChange = `${priceDelta.toFixed(2)} (${priceDeltaAbs})`

  const convert = useConvertAmount()
  const gamePool = useSelector(selectGamePool(activeGameId))

  const { name, icon, FIAT_DECIMAL_SHOW_DIGITS: decimalDigits } = getGameParameters(activeGameId)

  const formattedPoolAmount = useMemo(() => {
    const amountInUsd = gamePool?.total ? convert(gamePool.total, 'YOLO', 'USD', { number: true }) : 0
    return currencyFormatter(amountInUsd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePool?.total])

  return (
    <Container>
      <RoundInfo>
        <TitleArea>
          <ComingUp> COMING UP </ComingUp>
          <RoundNumber>
            Round <div>{Math.max(activeCardRoundIndex, 0)}</div>
          </RoundNumber>
        </TitleArea>
      </RoundInfo>
      <PoolAmount>
        <strong>Pool</strong> {formattedPoolAmount}
      </PoolAmount>
      <BlocksInfo />
      <AssetPriceInfo>
        <AssetWrap>
          <AssetName>
            <AssetIcon assetIcon={icon}></AssetIcon>
            {name}
          </AssetName>
        </AssetWrap>
        <Graph name={name}></Graph>
        <AssetPriceWrap>
          <AssetPrice>{currentPrice ? currencyFormatter(currentPrice, { decimalDigits }) : LONGDASH}</AssetPrice>
          <PriceChange isUp={isUp}> {priceChange} </PriceChange>
        </AssetPriceWrap>
      </AssetPriceInfo>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  display: flex;
  margin: 0 2.5vw;
  padding: 15px 0;
  flex-wrap: wrap;

  &:after {
    position: absolute;
    background: rgba(42, 109, 255, 0.3);
    filter: blur(160px);
    width: 50vw;
    height: 50vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
    content: '';
    border-radius: 50%;
  }
`
const RoundInfo = styled.div`
  justify-content: center;
  margin: 0;
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`
const BlocksInfo = styled(RunningBlocks)`
  padding: 40px 0;
`
const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 0;
  margin: 0;
  border-bottom: 0;
  position: relative;
`
const ComingUp = styled.div`
  font-size: 2.1rem;
  justify-content: center;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 8px 16px;
  display: flex;
  line-height: 100%;
  background: #1f2531;
  color: #fff;
  font-weight: 700;
  position: relative;
  border-radius: 10px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: steam 20s linear infinite;
    border-radius: 10px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 1) 0%, rgba(42, 109, 255, 1) 15%) center center / 400% 400%;
  }
`
const RoundNumber = styled.div`
  font-size: 1.4rem;
  margin: 2px 0 0 0;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 200;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & div {
    font-weight: 700;
    padding-left: 6px;
  }
`
const PoolAmount = styled.div`
  font-size: 1.3rem;
  color: #fff;
  font-weight: 700;

  & strong {
    font-weight: 200;
    margin-right: 4px;
  }
`
const AssetPriceInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const AssetWrap = styled.div`
  width: 30%;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.9rem;
  font-weight: 700;
  flex-direction: column;
  padding: 0 5px 0 0;
  display: flex;
`
const AssetName = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  font-weight: 400;
`
const AssetIcon = styled.div`
  background: url('${({ assetIcon }) => assetIcon}') center center / auto 23px no-repeat;
  height: 23px;
  width: 23px;
  margin: 0 5px 0 0;
`
const Graph = styled.div`
  -webkit-mask: url('${icons.ComingUpGraphImg}') center center / auto auto no-repeat;
  -webkit-mask-size: contain;
  height: 10vw;
  width: 40%;
  max-width: 40%;
  background: #70aefa;
  padding: 50px 0;
`
const AssetPriceWrap = styled.div`
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 30%;
  font-size: 0.7rem;
  padding: 0 0 0 5px;
  white-space: nowrap;
  display: flex;
  font-weight: 400;
`
const AssetPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
`
const PriceChange = styled.div`
  display: flex;
  color: ${({ isUp }) => (isUp ? 'rgba(0, 194, 19, 1.0)' : 'rgba(226, 14, 85, 1.0)')};
`
