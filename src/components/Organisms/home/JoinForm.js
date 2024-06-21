import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import validator from 'validator'
import axios from 'axios'

import { config } from 'config'

import { Typography } from 'components/Atoms/Typography'

export const JoinForm = () => {
  const history = useHistory()

  const [formData, setFormData] = useState({ btnLabel: 'Next' })
  const [errorMsg, setErrorMsg] = useState(' ')
  const [success, setSuccess] = useState(false)

  const sendFormData = async () => {
    const { email, address } = formData
    const res = await axios.post(config.YOLO_API_BASE_URL + '/addtowaitlist', {
      address,
      hasNFT: false,
      email,
      checkInWaitList: false
    })
    if (res.status === 200) {
      setSuccess(true)
    } else {
      setErrorMsg('Something went wrong, try again please')
    }
    setFormData({ btnLabel: 'Next' })
  }

  const redirectOnClick = () => {
    history.push('/game')
  }

  const submitForm = (e) => {
    e.preventDefault()
    setErrorMsg(' ')
    if (formData.btnLabel === 'Next') {
      const isValidEmail = validator.isEmail(formData.email)
      isValidEmail && setFormData({ ...formData, btnLabel: 'Join Now' })
      !isValidEmail && setErrorMsg('Enter a valid Email')
      return
    }
    if (formData.btnLabel === 'Join Now') {
      const isValidAddress = validator.isEthereumAddress(formData.address)
      isValidAddress && sendFormData()
      !isValidAddress && setErrorMsg('Enter a valid Ethereum address')
    }
  }

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Container>
      <Typography size='1.5' weight='800' height='140' variant='caption'>
        {success ? 'Thank you! We will be in touch soon' : 'Join the Yolorekt Beta waitlist'}
      </Typography>
      <EmailJoinForm>
        {success && <EnterAppBtn onClick={redirectOnClick}>Enter App</EnterAppBtn>}
        {!success && (
          <FormRow>
            {formData.btnLabel === 'Next' && (
              <input name='email' type='text' placeholder='Email address' onChange={onChange} />
            )}
            {formData.btnLabel === 'Join Now' && (
              <input name='address' type='text' placeholder='Wallet address' onChange={onChange} />
            )}
            <JoinBtn onClick={submitForm}>{formData.btnLabel}</JoinBtn>
          </FormRow>
        )}
        <ErrorMsg>{errorMsg}</ErrorMsg>
      </EmailJoinForm>
      <BackgroundBlur1 />
      <BackgroundBlur2 />
    </Container>
  )
}

const Container = styled.div`
  border-radius: 0;
  padding: 30px 30px 60px 30px;
  margin-top: clamp(1px, 1vw, 30px);
  margin-bottom: clamp(30px, 4vw, 30px);
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  h5 {
    padding: 15px 5%;
    max-width: 980px;
    z-index: 1;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-top: 0;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-bottom: 30px;
    h5 {
      font-size: 1.3rem;
      line-height: 130%;
    }
  }
`
const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 85px 0px rgb(0 0 0 / 50%);
  border-radius: 15px;

  input {
    padding: 10px 25px;
    max-width: 300px;
    width: 100%;
    font-size: 1rem;
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: rgba(255, 255, 255, 0.1);
    text-align: left;
    color: #000;
    position: relative;
    z-index: 2;
    &::-webkit-input-placeholder {
      color: #fff;
    }
    &:focus::-webkit-input-placeholder {
      visibility: hidden;
    }
    &:focus {
      box-shadow: 0 0 25px 5px rgb(42 109 255 / 70%);
      background: rgba(255, 255, 255, 0.5);
    }
  }
`
const JoinBtn = styled.button`
  background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
  padding: 10px 25px;
  font-size: 1rem;
  border-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin: 0;
  white-space: nowrap;
  line-height: 140%;
  position: relative;
  outline: none;
  border: none;
  color: white;
  &:hover {
    background: #2a6dff;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`
const EnterAppBtn = styled(JoinBtn)`
  align-self: center;
  border-radius: 15px;
`
const EmailJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0;
  position: relative;
  border-radius: 15px;
  z-index: 1;
`
const ErrorMsg = styled(Typography)`
  padding: 5px 0 0 20px;
  font-size: 0.8rem;
  height: 0.8rem;
  font-weight: 400;
  opacity: 1 !important;
  z-index: 9;
  color: ${({ theme }) => theme.themeColors.error};
`
const BackgroundBlur1 = styled.div`
  background: rgba(42, 192, 255, 0.7);
  -webkit-filter: blur(150px);
  border-radius: 50%;
  position: absolute;
  width: 70%;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -50%);
  z-index: 0;
`
const BackgroundBlur2 = styled.div`
  background: rgba(135, 92, 255, 0.7);
  -webkit-filter: blur(150px);
  border-radius: 50%;
  position: absolute;
  width: 70%;
  height: 200px;
  top: 50%;
  right: 50%;
  transform: translate(60%, -50%);
  z-index: 0;
`
