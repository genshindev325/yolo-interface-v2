import React from 'react'
import styled from 'styled-components'

import { OverviewCard } from './OverviewCard'
import { IconLib } from 'components/Atoms/IconLib'

export const Overview = () => {
    return (
        <Container>
            <OverviewCard>
                <CardTitle>TVL</CardTitle>
                <CardValue>$8,787,421,667,297</CardValue>
            </OverviewCard>
            <OverviewCard solana>
                <CardTitle>Yolo Balance on <span className="chain_name">Solana <IconSolana/></span></CardTitle>
                <CardValue>9,264.22 <div className="currency_type">YOLO</div></CardValue>
            </OverviewCard>
            <OverviewCard>
                <CardTitle>Daily game fees</CardTitle>
                <CardValue>$56,113</CardValue>
            </OverviewCard>
            <OverviewCard>
                <CardTitle>Bidding Volume</CardTitle>
                <CardValue>$1,152,648.22 <Change>-0.15%</Change></CardValue>
            </OverviewCard>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const CardTitle = styled.div`
    font-size: 1rem;
	text-transform: uppercase;
	font-weight: 500;
	margin: 0 0 3px 0;
	line-height: 100%;

    & .chain_name {
        color: #14F195;
	    white-space: nowrap;
    }
`;

const CardValue = styled.div`
    font-size: 1.7rem;
    font-weight: 100;
    line-height: 100%;
    letter-spacing: -.03em;
    display: flex;
    flex-direction: row;
    align-items: center;

    & .currency_type {
        letter-spacing: 0;
        margin: 0 0 0 10px;
        font-size: .9rem;
        opacity: .5;
        padding: 0;
        line-height: 160%;
    }
`;

const Change = styled.div`
    padding: 8px;
	line-height: 100%;
	white-space: nowrap;
	font-size: .8rem;
	font-weight: 500;
	background: ${({ isUp }) => isUp? `rgba(0,194,19,.2)` : `rgba(226,14,85,.2)`};
	border-radius: 10px;
	margin: 0 0 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const IconSolana = styled(IconLib).attrs({ collection: 'crypto', name: 'solana' })`
    width: 14px;
    height: 13px;
    margin: 0 0 0 5px;
    display: inline-block;
`;