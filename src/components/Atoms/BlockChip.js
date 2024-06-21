import React from 'react'
import styled, { css } from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const BlockChip = ({ gameBlocks, noBox, className, formatOptions }) => {
  const { fontSize } = formatOptions || { fontSize: 0.75 }
  return (
    <ChipBody noBox={noBox} className={className}>
      <CubeIcon />
      <Typography size={fontSize} weight={700} variant='caption'>
        {gameBlocks}
      </Typography>
    </ChipBody>
  )
}

const ChipBody = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  padding: 1px 4px;
  ${({ noBox }) => (noBox ? 'transparent' : 'transparent')}
`

const CubeIcon = styled(IconLib).attrs((props) => ({
  collection: 'crypto',
  name: 'block',
  dimension: '12px',
  masking: true
}))`
  margin: 0 5px 0 0;
`
