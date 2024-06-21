import React from 'react'
import styled from 'styled-components'

const TitleButton = ({ title }) => {
  return (
    <TitleArea>
      <Button>{title}</Button>
    </TitleArea>
  )
}

export default TitleButton

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const Button = styled.div`
  background-color: ${({ theme }) => theme.themeColors.black};
  border-radius: 7px;
  color: ${({ theme }) => theme.themeColors.white};
  padding: 7px 20px 7px 20px;
  position: relative;
  font-size: 0.9rem;
  box-shadow: 1px 1px 50px 5px ${({ theme }) => theme.themeColors.primary};
`
