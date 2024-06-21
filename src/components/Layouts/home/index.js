import styled from 'styled-components'

import { LandingHeader, Footer } from 'components/Organisms/general'
import { images } from 'common/images'

export const HomeLayout = ({ children, existsTopbar = false }) => {
  return (
    <Wrapper id='homeWrapper'>
      <Background />
      <LandingHeader existsTopbar={existsTopbar} />
      {children}
      <Footer position='relative' bgColor='transparent' />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Background = styled.div`
  display: fixed;
  &::before {
    background: rgba(38, 59, 105, 0.6);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: -1;
    opacity: 1;
    height: 100%;
  }
  &::after {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: url(${images.HomePageBgImg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 250%;
    opacity: 0.9;
    z-index: -2;
    height: 100%;
  }
`
