import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { config } from 'config'

import { reduxWalletActions } from 'redux/actions'
import { selectWalletAddress, selectWalletHasNFT } from 'redux/selectors'

import { icons } from 'common'

import { Typography } from 'components/Atoms/Typography'

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

export const NFTNeedModal = ({ closeModal }) => {
  const dispatch = useDispatch()
  const address = useSelector(selectWalletAddress())
  const hasNFT = useSelector(selectWalletHasNFT())
  const onCloseModal = () => {
    //Do whatever here before close the modal
    closeModal()
  }

  let emailText = ''

  const onEmailSubmit = async (event) => {
    console.log('Email Submit =>', {
      address,
      hasNFT,
      email: emailText
    })
    event.preventDefault()

    const waitlistResponse = await axios.post(`${yoloApiBaseUrl}/addtowaitlist`, {
      address,
      hasNFT,
      email: emailText,
      checkInWaitList: false
    })
    const { waitlistId } = JSON.parse(waitlistResponse.data.body) || { waitlistId: null }

    if (waitlistId > 0) {
      dispatch(reduxWalletActions.updateNftInfo({ address }))
    }
    closeModal()
  }

  const onEmailChange = (event) => {
    emailText = event.target.value
  }

  return (
    <ModalWrapper>
      <Content>
        <YoloLogo>
          <img alt='yoloLogo' src={icons.YoloLogoWelcomeIcon} />
        </YoloLogo>
        <WelcomeText variant='title' size='2.4' weight='800'>
          Welcome!
        </WelcomeText>
        <GetStarter variant='title' size='1.3' weight='300'>
          To get started, you'll need a <strong>YOLO NFT</strong>
        </GetStarter>
        <Paragraph size='0.8' align='center'>
          If you don't have one yet, sign up below to get one.
        </Paragraph>
        <Paragraph size='0.8' align='center'>
          <strong>If you already have one...</strong>
        </Paragraph>
        <EnterGameButton onClick={onCloseModal}>ENTER GAME</EnterGameButton>
        <GetNftFormPad>
          <Typography size='1.2' align='center' weight='300'>
            Get a YOLO NFT
          </Typography>
          <GetNftForm>
            <SignUpInput type='text' placeholder='Enter Email address' onChange={onEmailChange} />
            <SignUpButton onClick={onEmailSubmit}>Sign up</SignUpButton>
          </GetNftForm>
        </GetNftFormPad>
      </Content>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Content = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const YoloLogo = styled.div`
  min-width: 340px;
  max-width: 520px;
  height: auto;
  width: 25vw;
  ${({ theme }) => theme.breakPoints['xs']} {
    width: 20vw;
    min-width: 300px;
    margin-bottom: 20px;
  }
`
const WelcomeText = styled(Typography)`
  margin: 10px 0 30px 0;
  letter-spacing: -0.03em;
  line-height: 100%;
`
const GetStarter = styled(Typography)`
  margin-bottom: 10px;
`
const Paragraph = styled(Typography)`
  margin: 10px 0 0 0;
`

const EnterGameButton = styled.button`
  position: relative;
  background: rgba(36, 89, 202, 1);
  border-radius: 15px;
  padding: 8px 24px;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  margin: 15px 0 0 0;
  font-size: 1.3rem;
  text-decoration: none;
  outline: none;
  border: none;
  color: white;
  &:hover {
    background: rgba(42, 109, 255, 1);
  }
`

const GetNftFormPad = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px 0 0 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px 30px 30px 30px;
`
const GetNftForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  position: relative;
`
const SignUpInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 1);
  margin: 15px 0 0 0;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
`
const SignUpButton = styled(EnterGameButton)`
  font-size: 1rem;
  white-space: nowrap;
  text-transform: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`
