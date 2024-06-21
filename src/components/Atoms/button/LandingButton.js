import styled from 'styled-components'

export const LandingButton = styled.button`
  color: ${({ theme }) => theme.themeColors.white};
  border-radius: 15px;
  background: ${({ theme }) => theme.themeColors.backgroundLandingButton};
  position: relative;
  padding: 20px 50px;
  font-size: ${({ size }) => size ?? '1.7'}rem;
  font-weight: 600;
  border-radius: 15px;
  &:hover {
    color: ${({ theme }) => theme.themeColors.white};
    background: ${({ theme }) => theme.themeColors.primaryHover};
  }
  &:disabled {
    cursor: not-allowed !important;
    color: ${({ theme }) => theme.utils.addOpacityToHexColor(theme.themeColors.white, 20)};
    background: ${({ theme }) => theme.utils.addOpacityToHexColor(theme.themeColors.primaryHover, 20)};
  @media (max-width: ${({ theme }) => theme.layout.TABLET_BREAKPOINT}) {
    padding: 14px;
    font-size: 1.5rem;
  }
`
