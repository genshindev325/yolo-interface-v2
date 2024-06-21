import React from 'react'
import styled from 'styled-components'

import { Link } from 'components/Atoms/Link'

import chromeIcon from 'assets/icons/chrome_icon.svg'
import firefoxIcon from 'assets/icons/firefox_icon.svg'
import braveIcon from 'assets/icons/brave_icon.svg'

const ModalHeader = styled.strong`
  font-weight: 600;
  display: block;
  font-size: 1.3rem;
  padding: 0 0 15px 0;
`
const BrowserIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0 0 0;
  max-width: 180px;
  margin: auto;
`

const IconChrome = styled.a`
  background: url(${chromeIcon}) no-repeat;
  background-size: auto 50px;
  background-position: center center;
  width: 50px;
  height: 50px;
`

const IconFirefox = styled.a`
  background: url(${firefoxIcon}) no-repeat;
  background-size: auto 52px;
  width: 50px;
  height: 52px;
`
const IconBrave = styled.a`
  background: url(${braveIcon}) no-repeat;
  background-size: auto 50px;
  width: 43px;
  height: 50px;
`

export const IncompatibleBrowserModal = () => {
  return (
    <>
      <ModalHeader>Your browser isn't yet compatible with YOLOrekt</ModalHeader>
      In the meantime, please use <Link href='https://www.google.com/chrome/'>Chrome</Link>,
      <Link href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</Link>, or
      <Link href='https://brave.com'>Brave</Link>
      and come back to us soon
      <BrowserIconsContainer>
        <IconChrome href='https://www.google.com/chrome/' target='blank' rel='noopener noreferrer' />
        <IconFirefox href='https://www.mozilla.org/en-US/firefox/new/' target='blank' rel='noopener noreferrer' />
        <IconBrave href='https://brave.com' target='blank' rel='noopener noreferrer' />
      </BrowserIconsContainer>
    </>
  )
}
