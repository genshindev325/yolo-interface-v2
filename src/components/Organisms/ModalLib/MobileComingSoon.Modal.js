import React from 'react'
import styled from 'styled-components'

import { config } from 'config'

import { ModalOverlay } from 'components/Atoms/ModalOverlay'
import { Typography } from 'components/Atoms/Typography'
import { Link } from 'components/Atoms/Link'
import { IconLib } from 'components/Atoms/IconLib'

import { icons } from 'common'

export const MobileComingSoonModal = () => {
  const socialLink = config.YOLO_SOCIAL_LINKS.filter((item) => item.id !== 'email')
  return (
    <ModalOverlay>
      <Modal id='mobileCommingSoonModalContainer'>
        <LoadingMoon />
        <Notes>
          {`Mobile compatibility is coming soon! Until then, please watch our `}
          <Link href={config.YOLO_BASE_URL}>website</Link>
          {` or our social media for updates.`}
        </Notes>
        <SocialLinkWrapper>
          {socialLink.map((item, index) => (
            <SocialLink href={item.url}>
              <SocialIcon name={item.icon} mask />
              {item.label}
            </SocialLink>
          ))}
        </SocialLinkWrapper>
      </Modal>
    </ModalOverlay>
  )
}

const SocialLinkWrapper = styled.div`
  position: relative;
  z-index: 9;
  padding: 20px 0 0 0;
`
const SocialLink = styled(Link)`
  text-decoration: none;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  font-size: 1.1rem;
  font-weight: 600;
`
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba(32, 38, 51, 0.2);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: 800;
  flex-direction: column;
  padding: 0 3px;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
    content: '';
    border-radius: 50%;
    transform: translateZ(-50%);
    ${({ theme }) => theme.breakPoints['xs']} {
      background: rgba(0, 0, 0, 0.7);
      filter: blur(80px);
      width: 100vw;
      height: 60vh;
    }
  }
  &:after {
    position: absolute;
    background: rgba(42, 109, 255, 0.7);
    filter: blur(200px);
    width: 60vw;
    height: 60vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    content: '';
    border-radius: 50%;
    //transform: translateZ(-50%);
  }
`
const LoadingMoon = styled.div`
  position: relative;
  mask: url(${icons.LoadingMoon}) center no-repeat;
  height: 181px;
  width: 170px;
  background: white;
  z-index: 9;
`
const Notes = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 300;
  position: relative;
  z-index: 9;
  max-width: 360px;
  text-align: center;
  padding: 15px 0 0 0;
  line-height: 150%;
`
const SocialIcon = styled(IconLib).attrs({
  collection: 'brands',
  dimension: '22px'
})`
  background: ${({ theme }) => theme.themeColors.white};
  margin-right: 7px;
`
