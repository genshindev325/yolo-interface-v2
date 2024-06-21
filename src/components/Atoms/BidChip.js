import React from 'react'
import styled, { css } from 'styled-components'

import { currencyFormatter } from 'utils'

import { ArrowTriangle } from 'components/Atoms/ArrowTriangle'
import { Typography } from 'components/Atoms/Typography'

export const BidChip = ({ direction, amount, decimalDigits, noBox = false, isCrypto, className, formatOptions }) => {
  const { fontSize } = formatOptions || { fontSize: 0.8 }
  return (
    <ChipBody noBox={noBox} className={className}>
      <ArrowTriangle direction={direction} />
      <Typography size={fontSize} variant='caption' className='chip-amount'>
        {isCrypto ? amount : currencyFormatter(amount, { decimalDigits })}
      </Typography>
    </ChipBody>
  )
}

const noBoxCss = css`
  background: none;
`
const boxCss = css`
  background: ${({ direction }) => (direction === 'up' ? 'rgba(1, 168, 18, 0.2)' : 'rgba(179, 2, 80, 0.2)')};
`

const ChipBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 3px 4px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0 0 0 8px;
  ${({ noBox }) => (noBox ? noBoxCss : boxCss)}
`
