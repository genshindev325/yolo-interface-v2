import React from 'react'
import styled from 'styled-components'

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
    font-size: .8rem;
    width: 100%;

    @media only screen and (max-width: 768px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;
