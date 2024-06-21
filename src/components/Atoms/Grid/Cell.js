import React from 'react'
import styled from 'styled-components'

export const Cell = ({ className, children, ...rest }) => {
    return (
        <CellSpan className={className}>
            {children}
        </CellSpan>
    )
}

const CellSpan = styled.span`
    padding: 12px;
	border-bottom: 2px solid rgba(0, 0, 0, .2);
	font-size: .9rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;

    @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
        flex-direction: row;
		display: flex;
		padding: 0 8px;
		align-items: center;
		justify-content: flex-start;
		text-align: left;

        &:before {
            white-space: nowrap;
            border-right: 1px solid rgba(255, 255, 255, .1);
            padding: 8px;
            background: rgba(255, 255, 255, .05);
            left: -8px;
            position: relative;
            min-width: 190px;
            text-align: left;
        }
    }

    @media (max-width: 576px) {
        font-size: .8rem;
    }

    @media (max-width: 480px) {
        &:before {
            min-width: 170px;
        }
        padding: 0 0 0 8px;
    }
`;