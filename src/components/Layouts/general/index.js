import styled from 'styled-components'
import { LandingHeader, Footer } from 'components/Organisms/general'
import { images } from 'common'

const GeneralLayout = ({ children, height = null }) => {
  return (
    <Wrapper>
      <LandingHeader />
      <Main height={height}>
        <Content>{children}</Content>
      </Main>
      <Footer position='relative' bgColor='transparent' />
    </Wrapper>
  )
}

export default GeneralLayout

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(40, 53, 80, 0.73);
  overflow: hidden;
  position: relative;
  &::before {
    background: rgba(40, 53, 80, 0.73);
    backdrop-filter: blur(30px);
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
  }
  &::after {
    background: url(${images.HomePageBgImg2}) center center/auto 190% no-repeat;
    opacity: 0.9;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
  }
`
const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 90px 0 0 0;
  height: ${({ height }) => `calc(100vh - ${height ?? `173`}px)`};
  min-height: auto;
  &::before {
    backdrop-filter: blur(45px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 1;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    opacity: 0.9;
    z-index: 0;
  }
`
const Content = styled.div`
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px 40px;
  overflow: hidden;
  position: relative;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ theme }) => theme.breakPoints['lg']} {
    padding: 65px 20px 30px 20px;
  }
  ${({ theme }) => theme.breakPoints['sm']} {
    padding-left: 0;
    padding-right: 0;
  }
`
