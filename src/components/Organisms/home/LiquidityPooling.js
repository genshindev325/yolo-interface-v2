import React from 'react'
import { Typography } from 'components/Atoms/Typography'
import styled from 'styled-components'

export const LiquidityPooling = () => (
  <Container>
    <Typography variant='title' size='2.1' weight='700' spacing='-.03'>
      Liquidity pooling, reimagined.
    </Typography>
    <Typography variant='caption' size='1.5' weight='800' height='140'>
      Earn 3%+ game fees in ETH and stake your LP to earn additional YOLO rewards
    </Typography>
    <Typography variant='text' size='1.1' height='170' weight='300' align='center'>
      Provide in-game liquidity on YOLOrekt to earn games fees of 3% or more. Liquidity mining on YOLOrekt is unique
      since the pool plays with or against the players, depending on odds. Asymmetric Impermanent Loss in the pool
      reduces losses to one-side. Liquidity providers can further take their YOLO LP tokens to receive addition rewards
      in YOLO.
    </Typography>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 30px;
  text-align: center;
  z-index: 10;
  h3 {
    ${({ theme }) => theme.breakPoints['xs']} {
      line-height: 130%;
      font-size: 1.6rem;
    }
  }
  h5 {
    padding: 15px 5%;
    max-width: 980px;
    ${({ theme }) => theme.breakPoints['xs']} {
      font-size: 1.3rem;
      line-height: 130%;
    }
  }
  span {
    padding: 30px 5% 0 5%;
    ${({ theme }) => theme.breakPoints['xs']} {
      padding: 0;
      line-height: 150%;
    }
  }
  background: rgba(0, 0, 0, 0.15);
  ${({ theme }) => theme.breakPoints['xs']} {
    padding: 30px;
  }
`
