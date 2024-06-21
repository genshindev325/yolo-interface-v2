import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import { Card } from 'components/Atoms/Card'
import { IconLib } from 'components/Atoms/IconLib'
import { AreaChart } from './AreaChart'
import { PieChart } from './PieChart'

import { useViewport } from 'contexts/viewport/useViewport'
import { priceData, chainData } from 'datasource/dashboard'

export const Charts = () => {
    return (
        <Container>
            <CardYoloPrice>
                <CardTitleWrapper>
                    <CardTitle className="title">Price of YOLO</CardTitle>
                    <YoloPrice>
                        <YoloValue>$0.458</YoloValue>
                        <YoloChange isUp>+0.09%</YoloChange>
                    </YoloPrice>
                </CardTitleWrapper>
                <CardContent>
                    <PriceChart> 
                        <AreaChart series={priceData} height={200}/>
                    </PriceChart>
                </CardContent>
            </CardYoloPrice>
            <CardChains>
                <CardTitle>YOLO on the Blockchain</CardTitle>
                <CardContent>
                    <ChainsData>
                        <ItemPolygon>
                            <IconPolygon></IconPolygon>
                            <div className='name'>Polygon</div>
                            <div className='value'>$65,134,564,223.03</div>
                        </ItemPolygon>
                        <ItemSolana>
                            <IconSolana></IconSolana>
                            <div className='name'>Solana</div>
                            <div className='value'>$4,533,477,844.99</div>
                        </ItemSolana>
                    </ChainsData>
                    <ChainChart>
                        <PieChart series={chainData} height={200}/>
                    </ChainChart>
                </CardContent>
            </CardChains>
        </Container>
    )
};

const Container = styled.div`
    margin: 5px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: default;
    grid-template-areas: 'card1' 'card2' 'card3';
    grid-gap: 5px;

    @media only screen and (min-width: 750px) {
        margin: 5px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
		grid-template-rows: auto;
		grid-template-areas: 'card1 card2';
		grid-gap: 10px;
    }

    @media (max-width: 576px) {
        margin: 5px 0;
    }
`;

const CardYoloPrice = styled(Card)`
    flex-direction: column;
    grid-area: card1;

    &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(42, 109, 255, .1);
        filter: blur(30px);
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

const CardTitleWrapper = styled.div`
    display: flex;
	flex-direction: row;
	align-items: center;

    & .title {
        margin: 0 40px 0 0;
	    white-space: nowrap;
    }

    @media (max-width: 1024px) {
        flex-direction: column;
		align-items: flex-start;

        & .title {
            margin: 0 0 20px 0;
        }
    }
`;

const YoloValue = styled.div`
    font-size: 2.2rem;
    font-weight: 100;
    line-height: 100%;
    letter-spacing: -.03em;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const YoloChange = styled.div`
    padding: 8px;
    line-height: 100%;
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 10px;
    background: ${({ isUp }) => isUp? `rgba(0,194,19,.2)`:`rgba(226,14,85,.2)`};
    margin: 0 0 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;	
`

const CardTitle = styled.div`
    font-size: 1rem;
	text-transform: uppercase;
	font-weight: 500;
	margin: 0 0 3px 0;
	line-height: 100%;
`;

const YoloPrice = styled.div`
    display: flex;
	flex-direction: row;
`;

const CardContent = styled.div`
    display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 100%;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const PriceChart = styled.div`
    left: 0px;
	margin: 15px 0 0 0;
	position: relative;
	width: 100%;
`;

const CardChains = styled(Card)`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    grid-area: card2;
`;

const ChainsData = styled.ul`
    margin: 30px 0 0 0;
    width: 55%;
    min-width: 260px;

    & .name {
        font-size: 1rem;
        font-weight: 300;
        min-width: 100px;
    }

    & .value {
        font-size: .9rem;
	    font-weight: 300;
    }

    @media (max-width: 1024px) {
        width: 100%;
        min-width: 260px;
    }
`;

const ItemPolygon = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 10px 0;

    & .value {
        color: #ae7dff;
    }
`;

const IconPolygon = styled(IconLib).attrs({ collection: 'crypto', name: 'polygon' })`
    width: 18px;
    height: 18px;
    margin-right: 10px;
`;

const ItemSolana = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 10px 0;

    & .value {
        color: #14F195;
    }
`;

const IconSolana = styled(IconLib).attrs({ collection: 'crypto', name: 'solana' })`
    width: 18px;
    height: 18px;
    margin-right: 10px;
`;

const ChainChart = styled.div`
    display: flex;
	align-items: center;
	justify-content: flex-end;
	position: relative;
	height: 100%;
	width: 40%;
	margin: 0 0 0 5%;

    @media (max-width: 1024px) {
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 30px 10% 0 10%;
        margin: 0;
        text-align: center;
    }
`;
