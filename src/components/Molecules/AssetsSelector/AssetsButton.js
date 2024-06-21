import React from 'react'
import styled from 'styled-components'

export const AssetsButton = () => {
  return <StyledButton>games</StyledButton>
}

const StyledButton = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  margin: 0 0 0 20px;
  align-items: center;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: #666;
  text-underline-position: under;
  font-size: 13px;
  color: ${({ theme }) => theme.themeColors.white};
  &:hover {
    text-decoration: none;
  }
`
