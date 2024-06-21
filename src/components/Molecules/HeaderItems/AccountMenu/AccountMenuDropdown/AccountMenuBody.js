import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { getWeb3Utils } from 'utils/web3.utils'
import { selectWalletAddress } from 'redux/selectors'
import { reduxWalletActions } from 'redux/actions'

import { Typography } from 'components/Atoms/Typography'

export const AccountMenuBody = ({ closeMenu }) => {
  const dispatch = useDispatch()
  const address = useSelector(selectWalletAddress())
  const [username, setUsername] = useState('')

  const onSaveClick = () => {
    const web3Utils = getWeb3Utils()
    const userName = web3Utils.stringToHex(username)
    const actionData = { txData: { address, userName } }
    dispatch(reduxWalletActions.registerUsername(actionData))
    closeMenu()
  }

  const onInputChange = (event) => {
    const value = event.target.value
    setUsername(value)
  }

  return (
    <StyledMenu onClick={(e) => e.stopPropagation()}>
      <ModalTitle variant='caption' size='1.4' weight='600'>
        Account
      </ModalTitle>
      <UserIdForm>
        <Typography variant='caption' size='0.8'>
          User ID
        </Typography>
        <UsernameInput type='text' onChange={onInputChange} value={username} placeholder='Set User ID' />
        <SaveButton onClick={onSaveClick} disabled={!username}>
          Save
        </SaveButton>
      </UserIdForm>
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 10px 20px;
  box-sizing: border-box;
  z-index: 4;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;
  min-width: 320px;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 10px 30px 35px 0px rgb(0 0 0 / 35%);
    z-index: -1;
    border-radius: 15px;
  }
  ${({ theme }) => theme.breakPoints['425px']} {
    margin: 0;
    padding: 0 20px;
    width: 100%;
  }
`

const ModalTitle = styled(Typography)`
  font-weight: 600;
  padding: 7px 15px 15px 15px;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.4rem;
  white-space: nowrap;
`

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 1px 49px 0px rgb(0 0 0 / 30%);
  backdrop-filter: blur(45px);
  :after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.1);
    -webkit-filter: blur(100px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 15px;
  }
`

const UserIdForm = styled.div`
  padding: 0 10px;
  margin: 0 0 15px 0;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  width: 100%;
`
const UsernameInput = styled.input`
  padding: 8px 15px;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0 0 0 10px;
  width: 100%;
  font-size: 0.8rem;
  color: #000;
  line-height: 100%;
`
const SaveButton = styled.button`
  margin: 0;
  background: rgb(42, 109, 255);
  background: linear-gradient(180deg, rgba(42, 109, 255, 1) 0%, rgba(32, 83, 195, 1) 100%);
  padding: 6px 15px;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 0.8rem;
  color: #fff;
  :disabled {
    cursor: not-allowed !important;
    opacity: 0.5;
  }
  :hover {
    background: rgb(42, 109, 255);
  }
`
