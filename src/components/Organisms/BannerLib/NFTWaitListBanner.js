import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectWaitListInfo } from 'redux/selectors'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const NFTWaitListBanner = ({ closeBanner }) => {
  const history = useHistory()
  const waitlistInfo = useSelector(selectWaitListInfo())

  const redirectOnClick = () => {
    history.push('/claim-nft')
    closeBanner()
  }

  return (
    <WaitList>
      <NftIcon />
      <Message>
        Your place on the NFT Waitlist is <strong>{waitlistInfo.waitlistId}</strong> of {waitlistInfo.total}
      </Message>
      <ClaimBtn onClick={redirectOnClick}>{<Message>Claim</Message>}</ClaimBtn>
    </WaitList>
  )
}

const WaitList = styled.div`
  min-width: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
  left: 0;
  position: relative;
  align-items: center;
  box-shadow: 0 1px 49px 0px rgba(0, 0, 0, 0.2);
  flex-direction: row;
  background: rgba(42, 109, 255, 0.2);
  padding: 10px 15px;
`
const NftIcon = styled(IconLib).attrs({
  collection: 'yolorekt',
  name: 'nftBlueCoin'
})`
  height: 28px;
  width: 28px;
  margin: 0 10px 0 0;
`
const Message = styled(Typography)`
  strong {
    font-weight: 800;
    display: inline;
  }
`
const ClaimBtn = styled.button`
  outline: none;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  background: #2a6dff;
  background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
  padding: 5px 10px;
  margin: 0 0 0 10px;
  border-radius: 10px;
  line-height: 100%;
  &:hover {
    background: #2a6dff;
  }
`
