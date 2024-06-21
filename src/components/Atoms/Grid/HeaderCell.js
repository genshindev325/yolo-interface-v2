import React from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const HeaderCell = ({ className, text, isUp, ...rest }) => {
    return (
        <HeaderSpan className={className}>
            <strong>{text}</strong>
            <TriangleButton>
                <Triangle rotate={isUp? 'up' : 'down'} masking></Triangle>
            </TriangleButton>
        </HeaderSpan>
    )
}

const HeaderSpan = styled.span`
    padding: 12px;
    border-bottom: 2px solid rgba(0, 0, 0, .2);
    background: rgba(0, 0, 0, .1);
    text-align: center;
	font-size: .8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

    & strong {
        font-weight: 600;
	    margin: 0 3px 0 0;
    }

    &:hover {
        cursor: pointer;
	    border-top: 2px solid #2a6dff;
    }

    @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
        position: absolute;
		top: -9999px;
		left: -9999px;
        flex-direction: row;
		display: flex;
		padding: 0 8px;
		align-items: center;
		justify-content: flex-start;
		text-align: left;
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

const TriangleButton = styled.div`
    margin: 0 0 0 3px;
    background: rgba(255, 255, 255, .1);
	border-radius: 5px;
	padding: 6px;
`;

const Triangle = styled(IconLib).attrs({ collection: 'general', name: 'arrow' })`
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 1.0);
`;
