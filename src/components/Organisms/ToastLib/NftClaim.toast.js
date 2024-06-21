import React from 'react'
import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const NftClaimToast = ({ closeToast, nftId }) => {
  return (
    <Container>
      <ToastIcon collection='yolorekt' name='nftBlueCoin' />
      <MsgContent>
        <Typography variant='caption' align='left' size='0.9' weight='600'>
          NFT is needed
        </Typography>
        <Typography size='0.8'>In order to bid, NFTs are required</Typography>
        <Typography size='0.8'>
          Please <a href='mailto:support@yolorekt.com'>contact us</a> for more information
        </Typography>
      </MsgContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
`
const ToastIcon = styled(IconLib)`
  width: 15%;
  height: 46px;
  margin: 0 15px 0 0;
`
const MsgContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 85%;
  white-space: break-spaces;
  strong {
    font-weight: 800;
  }
`
