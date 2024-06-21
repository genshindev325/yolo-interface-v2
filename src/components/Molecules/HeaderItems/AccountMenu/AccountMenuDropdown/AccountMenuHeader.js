import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectUsername } from 'redux/selectors'

import { DotLoader } from 'components/Atoms/Loaders'
import { IconLib } from 'components/Atoms/IconLib'
import { Typography } from 'components/Atoms/Typography'

export const AccountMenuHeader = () => {
  const username = useSelector(selectUsername())

  return (
    <UserWrapper id='account'>
      <UserIcon collection='general' name='userCircle' dimension='14px' masking />
      {!!username ? <Username>{username}</Username> : <DotLoader sizeInRem={0.6} />}
    </UserWrapper>
  )
}
const Username = styled(Typography)`
  text-align: left;
  margin: 0 8px 0 8px;
  max-width: 105px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.9rem;
  text-decoration: underline;
  text-decoration-color: #666;
  text-underline-position: under;
`
const UserWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  &:hover {
    ${Username} {
      text-decoration: none;
    }
  }
`
const UserIcon = styled(IconLib)`
  ${({ theme }) => theme.breakPoints['425px']} {
    display: none;
  }
`
