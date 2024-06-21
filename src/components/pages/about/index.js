import React from 'react'
import Layout from 'components/Layouts/general'
import { Typography } from 'components/Atoms/Typography'
import styled from 'styled-components'
import { icons } from 'common'

export const AboutPage = () => {
  return (
    <Layout>
      <Heading variant='headline' size='2.8' weight='900' height='110' spacing='-.01'>
        ABOUT YOLOREKT
      </Heading>
      <Description size='1' weight='400' height='140' spacing='-.01' className='description'>
        YOLOrekt is building a comprehensive short-term prediction platform for crypto, stocks, and more. YOLO is a
        social and fun way to bid on the future price of an asset. Provide in-game liquidity to earn game fees and YOLO
        rewards.
      </Description>
      <Content>
        <Typography variant='title' size='1.8' weight='900' height='110' spacing='-.01'>
          The Core Team
        </Typography>
        <Description size='1' weight='400' height='140' spacing='-.01'>
          The team at Yolorekt is comprised of a collection of pioneers, leaders, misfits, renegades, bespoke experts,
          ethereum veterans, mathematicians, scientists, artists, musicians, engineers, designers, and the assemblage of
          talent beyond words; not to mention a former VP of Engineering at MySpace and founders of Spankchain.
        </Description>
        <MembersSection>
          <ul>
            <li>
              <span>Yogesh Srihari</span> Co-founder, CEO
            </li>
            <li> Jack of All Trades, Algorithms, Web3, Tennis, and Marvel Movies</li>
          </ul>
          <ul>
            <li>
              <span>Garen Vartanian</span> Co-founder
            </li>
            <li>Ph.D., Quantish, dreams in contracts, loves DeFi, Pizza, and Pine Trees</li>
          </ul>
          <ul>
            <li>
              <span>William Bentley de Vogelaere</span> Strategy
            </li>
            <li>William "Strategy", otherwise known as Wills is King Chad and degen af</li>
          </ul>
          <ul>
            <li>
              <span>Andres Cortes</span> Lead Software and web3 Engineer
            </li>
          </ul>
          <ul>
            <li>
              <span>Carly Vaught</span> Community Manager
            </li>
          </ul>
          <ul>
            <li>
              <span>Tino</span> Lead Designer & Creative Director
            </li>
          </ul>
          <ul>
            <li>
              <span>Rajesh Uppala</span> Applied Mathematician, Finance
            </li>
          </ul>
          <ul>
            <li>
              <span>Shant</span> Backend Architect
            </li>
            <li>Former VP of Tech at MySpace</li>
          </ul>
        </MembersSection>
        <Typography variant='title' size='1.8' weight='900' height='110' spacing='-.01'>
          Partnerships
        </Typography>
        <a href='https://polygon.technology' target='blank' class='polygon_logo'>
          <img src={icons.PolygonLogoIcon} />
        </a>
      </Content>
    </Layout>
  )
}

const Content = styled.div`
  overflow-y: auto;
  margin: 25px 0 0 0;
  width: 100%;
  h3 {
    text-align: left;
    padding: 10px 0 5px 0;
    ${({ theme }) => theme.breakPoints['lg']} {
      text-align: center;
    }
  }
  a {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    ${({ theme }) => theme.breakPoints['lg']} {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 15px auto 10px auto;
    }
    margin: 15px auto 10px 30px;
    img {
      width: 100%;
      min-width: 200px;
      max-width: 200px;
    }
  }
`
const Heading = styled(Typography)`
  ${({ theme }) => theme.breakPoints['lg']} {
    text-align: center;
    width: 100%;
  }
`
const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.01em;
  ${({ theme }) => theme.breakPoints['lg']} {
    text-align: center;
  }
`

const MembersSection = styled.div`
  margin: 20px 0;
  ul {
    list-style: none;
    padding: 0 0 10px 15px;
    margin: 0 0 0 30px;
    li {
      &:first-child {
        list-style: disc;
      }
      span {
        font-weight: 800;
        font-size: 1.1rem;
        padding: 10px 0 0 0;
        display: block;
      }
    }
  }
`
