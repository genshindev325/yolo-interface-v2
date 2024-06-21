import React, { useMemo } from 'react'
import styled from 'styled-components'
import { scaleLinear } from 'd3'

import { currencyFormatter } from 'utils'

import { icons } from 'common'

const interpolator = scaleLinear().domain([0, 100]).range([-27, 28])

export const BetsGauge = React.memo(({ data }) => {
  const { totalBids, position, up, down, playersUp, playersDown } = useMemo(() => data, [data])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const angle = useMemo(() => interpolator(position), [position])

  return (
    <Container>
      <GaugeWrapper>
        <MeterTitle>Live bids</MeterTitle>
        <MeterWrapper>
          <Meter />
          <NeedleWrapper>
            <Needle angle={angle} />
          </NeedleWrapper>
        </MeterWrapper>
        <SummaryView>
          <ul>
            <li>
              <BidValue isUp={false}> {currencyFormatter(down || 0)} </BidValue>
            </li>
            <li>
              <BidValue isUp={true}> {currencyFormatter(up || 0)} </BidValue>
            </li>
          </ul>
        </SummaryView>
      </GaugeWrapper>
      <TotalBids>
        {currencyFormatter(totalBids || 0)}
        <strong>Total Bid Amount</strong>
      </TotalBids>
    </Container>
  )
})

const Container = styled.div`
  position: relative;
  padding: 10px 0 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 1rem;
  align-items: center;

  ${({ theme }) => theme.breakPoints['xl']} {
    padding-top: 6px;
  }
`
const GaugeWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding: 10px 0 10px 0;
  margin: 0 0 6px 0;
  flex-direction: column;
  background: rgba(152, 183, 253, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;

  ${({ theme }) => theme.breakPoints['xl']} {
    width: calc(100vw - 30px);
    padding: 10px 0 0 0;
    margin: 0;
    border-radius: 10px;
  }
`
const MeterWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0 0 0 0;
  //height: 70px;
  justify-content: center;
`
const MeterTitle = styled.div`
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  //position: absolute;
  padding: 0 0 0 20px;
  line-height: 100%;
`
const Meter = styled.div`
  background: url(${icons.LiveBidsMeterIcon}) center center / 250px auto no-repeat;
  width: 100%;
  height: 70px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`
const NeedleWrapper = styled.div`
  width: 250px;
  height: 80px;
  position: relative;
  overflow: hidden;
  border-radius: 100% 100% 0 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);

  ${({ theme }) => theme.breakPoints['xl']} {
    width: 100%;
  }
`
const Needle = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: ${({ angle }) => `translateX(-50%) rotate(${angle}deg)`};
  transform-origin: bottom center;
  transform-style: preserve-3D;
  transition: transform 1s linear;
  mask: url(${icons.MeterNeedleIcon}) no-repeat;
  mask-size: auto 140px;
  mask-position: center center;
  background: rgba(255, 255, 255, 0.8);
  width: 5px;
  height: 140px;
  z-index: 1;
`
const SummaryView = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  padding: 3px 30px 0 30px;
  width: 100%;
  & ul {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 5px 10px;
    list-style: none;

    ${({ theme }) => theme.breakPoints['xl']} {
      width: 100%;
		  padding: 0;
    }
  }

  & li {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  
  ${({ theme }) => theme.breakPoints['xl']} {
    justify-content: center;
  }
`
const BidValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 5px 0;
  font-weight: 700;

  color: ${({ isUp }) => (isUp ? '#00c213 !important' : '#e20e55 !important')};

  ${({ theme }) => theme.breakPoints['xl']} {
    font-size: .9rem;
  }
`
const TotalBids = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  padding: 20px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  font-size: 1.4rem;
  font-weight: 200;
  letter-spacing: -0.01rem;

  & strong {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 0 0 0 10px;
    letter-spacing: 0;
    opacity: 0.4;
    ${({ theme }) => theme.breakPoints['xl']} {
      line-height: 100%;
		  font-size: .7rem;
    }
  }

  ${({ theme }) => theme.breakPoints['xl']} {
    font-size: 1.3rem;
		padding: 12px 20px 10px 20px;
		margin: 6px 0 20px 0;
		border-radius: 10px;
  }
`
