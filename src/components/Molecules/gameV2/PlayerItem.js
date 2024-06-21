import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'

import { currencyFormatter, getThreeDotAddress } from 'utils'
import { getUsername } from 'datasource/crypto/contracts'

export const PlayerItem = React.memo(({ playerItem }) => {
  const { player, amount, isMe } = playerItem

  const [userIdentification, setUserIdentification] = useState(getThreeDotAddress(player.id))

  const getUserIdentification = async () => {
    const username = await getUsername(player.id)

    if (username && username !== userIdentification) {
      setUserIdentification(username)
    }
  }
  useEffect(() => {
    getUserIdentification()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo(
    () => (
      <BidderItem>
        <Bidder isMe={!!isMe}>{userIdentification}</Bidder>
        <BidderAmount isMe={!!isMe}>{currencyFormatter(amount || 0)}</BidderAmount>
      </BidderItem>
    ),
    [amount, userIdentification]
  )
})

const BidderItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  white-space: nowrap;
  padding: 3px 0;
  margin: 0 0 2px 0;
  text-align: left;
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`
const Bidder = styled.div`
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: ${({ isMe }) => isMe? '700' : '200'};
  font-size: 0.8rem;
  max-width: 85%;
  color: ${({ isMe }) => isMe? '#2a6dff' : '#fff'};
`
const BidderAmount = styled.div`
  font-size: 0.8rem;
  font-weight: ${({ isMe }) => isMe? '700' : '600'};
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0 5px;
  white-space: nowrap;
  display: flex;
  color: ${({ isMe }) => isMe? '#2a6dff' : '#fff'};
`
