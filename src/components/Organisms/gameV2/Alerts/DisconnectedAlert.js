import { icons } from 'common'
import { Typography } from 'components/Atoms/Typography'
import React from 'react'
import styled from 'styled-components'
import { BaseAlert } from './BaseAlert'

export const DisconnectedAlert = ({ isOpen, onClose }) => {
  return (
    <BaseAlert open={isOpen}>
      <Content>
        <AlertIcon />
        <Typography variant='title' size='1.1' weight='600'>
          Wallet Disconnected
        </Typography>
        <Typography variant='caption' size='0.95'>
          Your wallet has been unexpectedly disconnected. To continue bidding, please reconnect.
        </Typography>
        <button>Connect Wallet</button>
      </Content>
    </BaseAlert>
  )
}

const Content = styled.div`
  z-index: 11;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px 10px;
  h5 {
    padding: 10px 0;
  }
  button {
    padding: 6px 14px;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    background: rgba(36, 89, 202, 1);
    display: inline-block;
    flex-direction: row;
    margin: 10px 0 0 0;
    text-decoration: none;
    outline: none;
    border: none;
    color: white;
    &:hover {
      background: rgba(42, 109, 255, 1);
    }
  }
`
const AlertIcon = styled.div`
  mask: url(${icons.ErrorIcon}) center center / auto 46px no-repeat;
  background: #fff;
  width: 46px;
  height: 46px;
  margin: 0 0 10px 0;
`
