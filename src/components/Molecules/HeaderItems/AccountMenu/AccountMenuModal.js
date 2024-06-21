import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectUsername } from 'redux/selectors'
import { notificationActions } from 'redux/actions'

import { DotLoader } from 'components/Atoms/Loaders'
import { IconLib } from 'components/Atoms/IconLib'
import { Typography } from 'components/Atoms/Typography'

const userAccountModalObj = {
  // this component will receive `closeModal` prop to close programmatically the modal
  show: true,
  id: 'userAccount',
  backdropClose: false
}

export const AccountMenuModal = () => {
  const dispatch = useDispatch()
  const username = useSelector(selectUsername())

  const showUserAccount = () => {
    dispatch(notificationActions.updateModal(userAccountModalObj))
  }
  return (
    <UserWrapper id='account' onClick={showUserAccount}>
      <IconLib collection='general' name='userCircle' dimension='14px' masking />
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
  display: inline-block;
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
  &:hover {
    ${Username} {
      text-decoration: none;
    }
  }
`
