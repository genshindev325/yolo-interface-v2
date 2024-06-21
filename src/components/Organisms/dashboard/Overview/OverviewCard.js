import React from 'react'
import styled from 'styled-components'

export const OverviewCard = ({ children, solana }) => {
    return (
        <OverviewCardWrapper solana={solana}>
            {children}
        </OverviewCardWrapper>
    )
}

const OverviewCardWrapper = styled.div`
    flex-basis: 250px;
    flex-grow: 1;
    margin: 5px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    min-height: 120px;
    background: rgba(255, 255, 255, .1);
    border-radius: 15px;
    position: relative;

    &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        ${({ solana }) => solana?`background: rgba(20, 241, 149, .2)`: `background: rgba(42, 109, 255, .2)`};
        filter: blur(30px);
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    @media (max-width: 576px) {
        margin: 5px 0;
    }
`