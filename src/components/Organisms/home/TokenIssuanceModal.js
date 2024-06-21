import styled from 'styled-components'
import { config } from 'config'
import { icons, images } from 'common'
import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'
import { ThemeContext } from 'styled-components'
import { useContext } from 'react'

export const TokenIssuanceModal = ({ open = false, onClose }) => {
  const telegramLink = config.YOLO_SOCIAL_LINKS.find((link) => link.id === 'telegram')
  const theme = useContext(ThemeContext)

  return (
    <Container open={open}>
      <CloseButton onClick={onClose} />
      <Content>
        <YoloImg>
          <img src={images.CicleLogoBigImg} />
        </YoloImg>
        <Typography variant='title' size='3' weight='500'>
          YOLO Token Issuance
        </Typography>
        <Details>
          <Typography variant='caption' size='1' weight='400'>
            YOLOrekt is deploying a first of its kind synced token dual-issuance both on Ethereum and Polygon at the
            same time. The contributors can choose to buy YOLO tokens on Ethereum with ETH or on Polygon with Matic
            Ether (Matic wETH).
          </Typography>
          <br />
          <Typography variant='caption' size='1' weight='400'>
            More information about Dual Token Issuance on Polygon and Ethererum will be available in the coming weeks.
          </Typography>
        </Details>
        <ComingSoon>
          <Typography variant='caption' size='1.3'>
            Coming in July 2021
          </Typography>
        </ComingSoon>
        <JoinUsTelegram href={telegramLink.url} target='blank'>
          <TelegramIcon />
          <Typography variant='caption' size='1' spacing='.01' color={theme.themeColors.primary}>
            Join us on Telegram
          </Typography>
        </JoinUsTelegram>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(16, 36, 77, 0.7);
  background: rgba(10, 25, 56, 0.7);
  z-index: 1000;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 400ms ease-in;
  pointer-events: ${({ open }) => (open ? `all` : `none`)};
  backdrop-filter: blur(15px);

  @-moz-document url-prefix() {
    background: linear-gradient(90deg, rgba(62, 84, 119, 1) 0%, rgba(38, 57, 99, 1) 100%);
  }
`
const CloseButton = styled.button`
  position: absolute;
  left: 30px;
  top: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  mask: url('${icons.CloseCircleIcon}') no-repeat;
  mask-size: auto 24px;
  mask-position: center center;
  width: 24px;
  height: 24px;
  z-index: 1001;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
`
const Content = styled.div`
  padding: 40px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  align-content: center;
  z-index: 0;
  width: 100%;
  height: 100vh;
`
const YoloImg = styled.div`
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  img {
    width: 110px;
    ${({ theme }) => theme.breakPoints['lg']} {
      width: 110px;
    }
    ${({ theme }) => theme.breakPoints['xs']} {
      width: 110px;
    }
  }
`
const ComingSoon = styled.div`
  color: #333;
  margin: 0 auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  width: 70vw;
  margin: 35px 0 15px 0;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  flex-direction: column;
  align-self: center;
  max-width: 500px;
`

const TelegramIcon = styled(IconLib).attrs({
  collection: 'brands',
  dimension: '24px',
  name: 'telegram'
})`
  fill: ${({ theme }) => theme.themeColors.primary};
  margin: 0 5px 0 0;
`
const JoinUsTelegram = styled.a`
  display: flex;
  text-decoration: none;
  position: relative;
  z-index: 3;
  margin: 15px auto;
`
const Details = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 530px;
  margin: 0 auto;
`
