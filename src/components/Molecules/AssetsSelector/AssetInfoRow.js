import React from 'react'
import styled from 'styled-components'

import { currencyFormatter } from 'utils'

import { Typography } from 'components/Atoms/Typography'
import { ArrowTriangle } from 'components/Atoms/ArrowTriangle'
import { Checkbox } from 'components/Atoms/Checkbox'
import { BidChip } from 'components/Atoms/BidChip'
import { BlockChip } from 'components/Atoms/BlockChip'

import { getGameParameters } from 'config/games.config'
import { useSelector } from 'react-redux'
import { selectCurrentPrice, selectStrikePrice } from 'redux/selectors'

import { LONGDASH } from 'utils/constants'

export const AssetInfoRow = ({ className, gameId, onChange, checked = false }) => {
  const longDash = LONGDASH + '\u0010\u0010'

  const { name, icon, GAME_BLOCK_LENGTH, FIAT_DECIMAL_SHOW_DIGITS: decimalDigits } = getGameParameters(gameId)
  const strikePrice = useSelector(selectStrikePrice(gameId))
  const currentPrice = useSelector(selectCurrentPrice(gameId))
  const priceDelta = strikePrice && currentPrice ? currentPrice - strikePrice : 0
  const direction = priceDelta >= 0 ? 'up' : 'down' // TODO: grey bkgrd on 0
  const priceDeltaAbs = Math.abs(priceDelta)

  const currentPriceDisplay = currentPrice ? currencyFormatter(currentPrice, { decimalDigits }) : longDash

  return (
    <ListRow>
      <Checkbox variant='contained' checked={checked} onChange={onChange}>
        <CheckBoxCaption>
          <CurrencyIcon icon={icon} />
          <Typography size='0.9' variant='caption'>
            {name}
          </Typography>
        </CheckBoxCaption>
      </Checkbox>
      <CurrentPrice>
        <Typography variant='caption' weight='600' size='0.8'>
          {currentPriceDisplay}
        </Typography>
        <PriceDelta direction={direction} amount={priceDeltaAbs} decimalDigits={decimalDigits} />
      </CurrentPrice>
      <GameLength gameBlocks={GAME_BLOCK_LENGTH} />
    </ListRow>
  )
}

const ListRow = styled.li`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2px 0;
  padding: 5px 20px 10px 20px;
  border: 0;
  min-width: 420px;
  font-size: 0.9rem;
  height: 38px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  ${({ theme }) => theme.breakPoints['425px']} {
    padding: 10px;
    min-width: 100vw;
  }
`
const CurrentPrice = styled.div`
  text-align: right;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const PriceDelta = styled(BidChip).attrs((props) => ({ formatOptions: { fontSize: 0.7 } }))`
  margin-left: 10px;
  min-width: 83px;
  background: ${({ direction }) => (direction === 'up' ? 'rgba(1, 168, 18, 0.2)' : 'rgba(197,0,60,.2)')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 3px 6px;
  border-radius: 5px;
`
const CheckBoxCaption = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  padding-left: 3px;
`
const CurrencyIcon = styled.div`
  background: ${({ icon }) => `url(${icon}) center center / auto 22px no-repeat`};
  height: 22px;
  width: 22px;
  margin-right: 10px;
`
const GameLength = styled(BlockChip)`
  margin: 0 0 0 10px;
`
