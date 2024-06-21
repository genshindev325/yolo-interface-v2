import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { LitePaper } from 'components/Molecules/LitePaper'
import { BurgerMenu } from 'components/Molecules/BurgerMenu'

export const LandingHeader = () => {
  const history = useHistory()

  const redirectOnClick = () => {
    history.push('/game')
  }

  return (
    <NavBar>
      <LitePaper />
      <RightNavBar>
        <EnterAppBtn onClick={redirectOnClick}>Enter App</EnterAppBtn>
        <BurgerMenu />
      </RightNavBar>
    </NavBar>
  )
}

const NavBar = styled.div`
  min-width: 320px;
  width: 100vw;
  z-index: 9;
  color: ${({ theme }) => theme.themeColors.textPrimary};
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
`
const RightNavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const EnterAppBtn = styled.button`
  background: #2a6dff;
  background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
  padding: 10px 18px;
  border-radius: 15px;
  white-space: nowrap;
  line-height: 100%;
  position: relative;
  z-index: 3;
  color: ${({ theme }) => theme.themeColors.textPrimary};
  height: 38px;
  &:hover {
    background: #2a6dff;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed !important;
  }
`
