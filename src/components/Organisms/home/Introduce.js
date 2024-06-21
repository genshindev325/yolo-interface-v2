import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'
import { icons } from 'common'
import { JoinForm } from './JoinForm'

export const Introduce = () => {
  const history = useHistory()

  const redirectToClaimNft = () => {
    history.push('/claim-nft')
  }

  return (
    <Main>
      <Container>
        <YoloLogo>
          <img src={icons.YoloLogoWelcomeIcon} />
        </YoloLogo>
        <Typography variant='headline' weight='400' size='3' height='105' spacing='-.03' id='title'>
          Price Prediction for Degens
        </Typography>
        <Typography variant='caption' size='5.6' spacing='.28' weight='100' color='primary' height='100' id='gamified'>
          GAMIFIED
        </Typography>
        <Description variant='caption' size='1.3' weight='300' height='150'>
          YOLOrekt is a social and fun way to bid on the future price of crypto. Provide in-game liquidity to earn game
          fees and YOLO rewards.
        </Description>
        <ClaimNftButton onClick={redirectToClaimNft}>Claim your NFT</ClaimNftButton>
        <JoinForm />
      </Container>
    </Main>
  )
}

const ClaimNftButton = styled.button`
  background: linear-gradient(0deg, rgba(29,75,175,1) 0%, rgba(42,109,255,1) 100%);
	padding: 18px 24px;
	line-height: 100%;
	font-size: 1.1rem;
	border-radius: 15px;
	position: relative;
	z-index: 9;
	margin: 10px 0 0 0;
  color: #ffffff
	}
&:hover {
	background: rgba(42,109,255,1);
	}
`

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  padding-top: 90px;
`
const Container = styled.div`
  position: relative;
  color: #f1f1f1;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  h3 {
    &:nth-child(2) {
      margin-right: -0.12em;
    }
  }
  #title {
    padding: 0 15px 5px 15px;
    ${({ theme }) => theme.breakPoints['lg']} {
      font-size: 5.9vw;
      letter-spacing: -0.05vw;
    }
  }
  #gamified {
    margin-left: 20px;
    ${({ theme }) => theme.breakPoints['lg']} {
      font-size: 12.8vw;
      letter-spacing: 2.7vw;
    }
  }
`
const Description = styled(Typography)`
  max-width: 730px;
  padding: 15px;

  ${({ theme }) => theme.breakPoints['xs']} {
    font-size: 1.1rem;
    padding: 15px 0;
  }
`
const YoloLogo = styled.div`
  min-width: 340px;
  max-width: 520px;
  height: auto;
  width: 25vw;
  margin: 0 0 50px 0;
  ${({ theme }) => theme.breakPoints['xs']} {
    width: 20vw;
    min-width: 300px;
    margin-bottom: 20px;
  }
`
