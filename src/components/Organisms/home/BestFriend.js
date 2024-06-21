import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'
import { images } from 'common'

export const BestFriend = () => (
  <Container>
    <Screenhosts>
      <DesktopImg>
        <img src={images.GamePageScreenDesktop} alt='desktop' />
      </DesktopImg>
      <MobileImg>
        <img src={images.GamePageScreenMobile} alt='mobile' />
      </MobileImg>
      <BetaBadge />
    </Screenhosts>
    <SectionTitle variant='caption' size='2.4' weight='600' spacing='-.02'>
      Make money by predicting the price of <strong>ETH</strong>, <strong>WBTC</strong>, <strong>Tesla</strong>,
      <strong>GameStop</strong>, <strong>Dogecoin</strong>, <strong>JPY</strong>, and others
    </SectionTitle>
    <Typography variant='caption' size='1.1' weight='300' height='170' id='description'>
      Play on-the-go with quick 3-minute games, bidding on the short-term price of assets, and making higher profits
      with more provided in-game liquidity.
    </Typography>
    <BullBearArea>
      <BearImg>
        <img src={images.BearImg} alt='' />
      </BearImg>
      <BullImg>
        <img src={images.BullImg} alt='' />
      </BullImg>
    </BullBearArea>
    <Typography size='1.1' height='170' weight='300' id='description2'>
      YOLOrekt enables traders to enter into short-term price prediction on crypto assets. Each game lasts 3 minutes and
      is broken into 3 phases. Prior to bidding, each games starts out by determining the games 'Strike Price.' Once the
      games strike price is set, traders have a minute to bid that the price will either be above or below when the
      games timer hits 0.
    </Typography>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 10%;
  padding-top: 0;
  text-align: center;
  z-index: 2;
  ${({ theme }) => theme.breakPoints['xs']} {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
  }
  #description {
    padding: 20px 5% 0 5%;
    ${({ theme }) => theme.breakPoints['xs']} {
      padding-left: 0;
      padding-right: 0;
      line-height: 150%;
    }
  }
  #description2 {
    padding: 20px 5% 0 5%;
    ${({ theme }) => theme.breakPoints['xs']} {
      padding-left: 0;
      padding-right: 0;
      line-height: 150%;
    }
  }
  ol {
    padding: 20px 0;
  }
  li {
    list-style: none;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 190%;
  }
  span {
    padding: 90px 30px 0 30px;
    text-align: center !important;
    ${({ theme }) => theme.breakPoints['xs']} {
      padding-left: 0;
      padding-right: 0;
      line-height: 150%;
    }
  }
`
const Screenhosts = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 0 0 120px 0;
  position: relative;
  width: 100%;
  ${({ theme }) => theme.breakPoints['xs']} {
    justify-content: center;
    align-items: center;
    margin: 0 0 40px 0;
    width: 100%;
  }
`
const DesktopImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 2.5vw;
  z-index: 1;
  img {
    width: 75vw;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    margin-right: 0;
  }
`
const MobileImg = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  z-index: 2;
  img {
    width: 20vw;
    -webkit-filter: drop-shadow(0 0 10px rgba(14, 17, 23, 0.9));
    ${({ theme }) => theme.breakPoints['xs']} {
      width: 30vw;
    }
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    bottom: -20px;
    left: -10px;
  }
`
const SectionTitle = styled(Typography)`
  font-size: 2.1rem;
  line-height: 140%;
  font-weight: 700;
  letter-spacing: -0.03em;
  position: relative;
  z-index: 7;

  ${({ theme }) => theme.breakPoints['xs']} {
    line-height: 130% !important;
    font-size: 1.6rem !important;
  }
  strong {
    background: rgba(42, 109, 255, 0.3);
    border-radius: 5px;
    padding: 0 7px;
    font-weight: 800;
    ${({ theme }) => theme.breakPoints['xs']} {
      line-height: 120%;
    }
  }
`
const BetaBadge = styled.div`
  position: absolute;
  top: -25px;
  right: 15px;
  width: 150px;
  height: 122px;
  background: url(${images.BetaLargeBadge}) center center / auto 122px no-repeat;
  z-index: 3;
  ${({ theme }) => theme.breakPoints['xs']} {
    background-size: 100%;
    width: 25%;
    top: -40px;
    right: 0;
  }
`
const BullBearArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: flex-end;
  margin: 30px 0 5px 0;
  ${({ theme }) => theme.breakPoints['xs']} {
    width: calc(100% + 60px);
  }
`
const BullImg = styled.div`
  position: relative;
  z-index: 1;
  right: 20px;
  bottom: 0;
  width: 60%;
  img {
    width: 100%;
  }
`
const BearImg = styled.div`
  left: 20px;
  bottom: 0;
  width: 50%;
  position: absolute;
  z-index: 1;
  img {
    width: 100%;
  }
`
