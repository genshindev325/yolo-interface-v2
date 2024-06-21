import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'
import { images } from 'common'

export const Investors = () => (
  <Container>
    <Typography variant='title' size='2.1' weight='700' spacing='-0.03'>
      Investors who believe in us
    </Typography>
    <ul>
      <Investor imgSrc={images.PanteraCapital} hoverImgSrc={images.PanteraCapitalColor}>
        <a href='https://panteracapital.com' target='blank'>
          <div />
          <Typography size='0.8'>Pantera Capital</Typography>
        </a>
      </Investor>
      <Investor imgSrc={images.ClusterCapitalImg} hoverImgSrc={images.ClusterCapitalColorImg}>
        <a href='https://www.cluster.vc' target='blank'>
          <div />
          <Typography size='0.8'>Cluster Capital</Typography>
        </a>
      </Investor>
      <Investor imgSrc={images.LemniscapImg} hoverImgSrc={images.LemniscapColorImg} width='45px'>
        <a href='https://lemniscap.com' target='blank'>
          <div />
          <Typography size='0.8'>LemnisCap</Typography>
        </a>
      </Investor>
      <Investor imgSrc={images.DeepVentureImg} hoverImgSrc={images.DeepVentureColorImg} width='45px'>
        <a href='https://www.deepventures.io' target='blank'>
          <div />
          <Typography size='0.8'>Deep Ventures</Typography>
        </a>
      </Investor>
      <Investor imgSrc={images.AngelDaoImg} hoverImgSrc={images.AngelDaoColorImg}>
        <a href='https://www.angeldao.org' target='blank'>
          <div></div>
          <Typography size='0.8'>AngelDAO</Typography>
        </a>
      </Investor>
      <Investor imgSrc={images.KretosVentures} hoverImgSrc={images.KretosVentures} width='405px'>
        <a href='http://www.kretos.ventures' target='blank'>
          <div></div>
          <Typography size='0.8'>Kretos Ventures</Typography>
        </a>
      </Investor>
    </ul>
  </Container>
)

const Container = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0;
  padding: 30px 30px 0 30px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 30px;
    position: relative;
    z-index: 1;
    ${({ theme }) => theme.breakPoints['xs']} {
      margin-top: 15px;
    }
  }

  ${({ theme }) => theme.breakPoints['xs']} {
    padding: 30px;
  }
  h3 {
    ${({ theme }) => theme.breakPoints['xs']} {
      line-height: 130%;
      font-size: 1.6rem;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`
const Investor = styled.li`
  padding: 20px;
  a {
    color: ${({ theme }) => theme.themeColors.white};
    text-decoration: none;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    transition: all 0.2s ease-in-out;
    &:hover {
      text-decoration: none;
    }
    div {
      background: url(${({ hoverImgSrc }) => hoverImgSrc}) center center/auto ${({ width }) => width ?? '70px'}
        no-repeat;
      height: 70px;
      margin-bottom: 5px;
      background-size: contain;
    }
    span {
      visibility: hidden;
    }
  }

  &:nth-child(3) {
    div {
      width: 200px;
    }
  }
  &:nth-child(5) {
    div {
      width: 200px;
    }
  }
  &:nth-child(6) {
    div {
      width: 100px;
    }
  }
  &:hover a span {
    visibility: visible;
  }

  ${({ theme }) => theme.breakPoints['xs']} {
    padding-top: 10px;
    padding-bottom: 10px;
    a span {
      visibility: visible;
    }
  }
`
