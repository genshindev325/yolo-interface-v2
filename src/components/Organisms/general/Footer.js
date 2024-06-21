import React from 'react'
import styled from 'styled-components'
import { config } from 'config'
import { Link } from 'components/Atoms/Link'
import { IconLib } from 'components/Atoms/IconLib'

export const Footer = ({ position, bgColor }) => {
  return (
    <FooterWrapper position={position} bgColor={bgColor}>
      <LandingDetails>
        <Author>
          <span>Made with</span>
          <Link variant='simple' href='https://ethereum.org' target='blank'>
            <EthereumIcon />
          </Link>
          <Link variant='simple' href='https://polygon.technology' target='blank'>
            <PolygonIcon />
          </Link>
        </Author>
        <Copyright>Copyright 2021&nbsp;&nbsp;•&nbsp;&nbsp;All rights reserved</Copyright>
        <PrivTerms>
          <Link
            variant='underlined'
            href='https://yolo-misc.s3.us-west-2.amazonaws.com/YoloRekt+-+Terms+of+Service+-+20210714.pdf'
          >
            Terms of Service
          </Link>
          &nbsp;&nbsp;•&nbsp;&nbsp;
          <Link
            variant='underlined'
            href='https://yolo-misc.s3.us-west-2.amazonaws.com/YOLOrekt+-+Privacy+Policy+-+20210714.pdf'
          >
            Privacy Policy
          </Link>
        </PrivTerms>
      </LandingDetails>
      {/* <About>
        YOLOrekt is building a comprehensive short-term prediction platform for crypto, stocks, and more. YOLO is a
        social and fun way to bid on the future price of an asset. Provide in-game liquidity to earn game fees and YOLO
        rewards.
      </About> */}
      <SocialArea>
        {config.YOLO_SOCIAL_LINKS.map((item, index) => (
          <Link href={item.url} key={index}>
            <SocialIcon name={item.icon} />
          </Link>
        ))}
      </SocialArea>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: row;
  font-size: 0.8rem;
  padding: 30px 60px;
  align-items: center;
  position: relative;
  bottom: 0;
  z-index: 11;
  width: 100%;
  flex-wrap: wrap;
  ${({ theme }) => theme.breakPoints['xs']} {
    position: relative;
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`
const LandingDetails = styled.div`
  display: flex;
  flex-direction: row;
  min-width: auto;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  span {
    a {
      color: rgba(255, 255, 255, 1);
      &:hover {
        color: #2e68eb;
        text-decoration: none;
      }
    }
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`
const Author = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 10px 15px;
  span {
    margin-right: 12px;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-right: 0;
    padding-right: 20px;
  }
  a {
    &:last-child {
      margin-left: 2px;
    }
  }
`
const SocialIcon = styled(IconLib).attrs({
  collection: 'brands',
  dimension: '24px',
  masking: true
})`
  ${({ theme }) => theme.links.iconLink}
`
const EthereumIcon = styled(IconLib).attrs({
  collection: 'crypto',
  dimension: '21px',
  name: 'ethereum',
  masking: true
})`
  ${({ theme }) => theme.links.iconLink}
`
const PolygonIcon = styled(IconLib).attrs({
  collection: 'crypto',
  dimension: '21px',
  name: 'polygon',
  masking: true
})`
  ${({ theme }) => theme.links.iconLink}
  &:hover {
    fill: #8247e5;
  }
`
const SocialArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  a {
    margin-left: 30px;
  }
`
const Copyright = styled.div`
  white-space: nowrap;
  padding: 10px 15px;
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-bottom: 5px;
  }
`
const PrivTerms = styled.div`
  white-space: nowrap;
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-bottom: 5px;
  }
`
const About = styled.div`
  text-align: center;
  padding: 0 60px;
  ${({ theme }) => theme.breakPoints['xs']} {
    padding: 0;
  }
`
