import React from 'react';
import styled from 'styled-components';

export const Card = ({ className, children, ...rest }) => {
    return (
        <CardWrapper className={className}>
            {children}
        </CardWrapper>
    )
}

const CardWrapper = styled.div`
    padding: 30px;
    background: rgba(0, 0, 0, .1);
    border-radius: 15px;
    display: flex;
    position: relative;
    align-items: flex-start;
`;