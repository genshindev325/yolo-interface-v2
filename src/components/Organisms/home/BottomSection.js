import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'
import { images } from 'common'
import { TokenInfoSection } from './TokenInfoSection'

export const BottomSection = () => (
  <Container>
    <Typography variant='title' size='2.1' weight='600' spacing='-.02'>
      Powered by 1,000,000,000 YOLO Tokens
    </Typography>
    <Typography variant='caption' size='1.1' weight='300' height='170'>
      The YOLO protocol is driven by the YOLO token which is a mechanism designed to address in-game liquidity with
      enabling decentralized betting liquidity pools.
    </Typography>
    <YoloImg>
      <img src={images.YoloCoinFlipImg} />
    </YoloImg>
    <Typography variant='caption' size='1.1' weight='300' height='170'>
      YOLO mints 1B tokens and following is the distribution and issuance schedule:
    </Typography>
    <TokenInfoSection />
  </Container>
)

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 60px 30px;
  z-index: 10;
  h5 {
    padding: 30px 5% 0 5%;
    ${({ theme }) => theme.breakPoints['xs']} {
      padding: 0;
      line-height: 150%;
      padding-top: 15px;
    }
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    padding: 30px;
  }
  h3 {
    ${({ theme }) => theme.breakPoints['xs']} {
      line-height: 130%;
      font-size: 1.6rem;
    }
  }
`
const YoloImg = styled.div`
  width: 100%;
  padding: 15px 0 0 0;
  text-align: center;
  img {
    width: 17vw;
    ${({ theme }) => theme.breakPoints['lg']} {
      width: 21vw;
    }
    ${({ theme }) => theme.breakPoints['xs']} {
      width: 55vw;
    }
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    padding-top: 0;
    padding-bottom: 0;
  }
`
