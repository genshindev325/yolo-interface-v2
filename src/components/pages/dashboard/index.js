import React from 'react'
import styled from 'styled-components'

import { Overview } from 'components/Organisms/dashboard/Overview';
import { Charts } from 'components/Organisms/dashboard/Charts';
import { YoloTable } from 'components/Organisms/dashboard/YoloTable';

import { images } from 'common'

export const DashboardPage = () => {
  return (
    <Container>
      <Title>Liquidity Dashboard</Title>
      <Description>All currencies are <strong>$USD</strong> unless otherwise specified</Description>

      <Content>
        <GridContainer>
          <Main>
            <Overview></Overview>
            <Charts></Charts>
            <YoloTable></YoloTable>
          </Main>
        </GridContainer>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 60px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 30px;
  height: 100%;
  transition: width 300ms ease-in-out;
  display: flex;
  flex-direction: column;

  &::before {
    background: rgba(45, 51, 65, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    z-index: -1;
    opacity: 1;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: url(${images.HomePageBgImgBlur}) center center / cover no-repeat;
    z-index: -2;
    @-moz-document url-prefix() {
      background: url(${images.HomePageBgImgBlur});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 250%;
    }
  }

  @media (max-width: 1024px) {
    height: 100%;
		padding: 60px;
  }

  @media (max-width: 576px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  letter-spacing: -.03em;
  line-height: 100%;
  padding: 0 0 5px 0;

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const Description = styled.h2`
  font-size: .9rem;
  font-weight: 300;
  text-transform: none;
  letter-spacing: 0;
  & strong {
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: .8rem;
  }
`;

const Content = styled.div`
  width: calc(100% + 10px);
  margin: 20px 0 0 0;

  @media (max-width: 480px) {
    margin: 10px 0 0 0;
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas: 'main';
  height: 100vh;

  @media only screen and (min-width: 750px) {
    display: grid;
		grid-template-columns: 0 1fr;
		grid-template-rows: 0 1fr 50px;
		grid-template-areas: 'aside main';
		left: -5px;
		position: relative;
  }
`;

const Main = styled.main`
  grid-area: main;
`;
