import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const BidCloseEnd = ({ blocksLeft }) => {
  return (
    <Container>
      <WarningIcon collection='general' name='error' masking />
      <MsgContent weight='400'>
        Round will end in <strong>{Math.max(blocksLeft, 0)}</strong> blocks. This bid may fail.
      </MsgContent>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 30px;
  display: flex;
  background: rgba(255, 0, 0, 0.3);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`

const WarningIcon = styled(IconLib)`
  width: 16px;
  height: 16px;
  margin: 0 10px 0 0;
`
const MsgContent = styled(Typography)`
  font-size: 0.8rem;
  strong {
    font-weight: 600;
  }
`
