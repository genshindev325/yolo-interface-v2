import styled from 'styled-components'

export const Pad = styled.div`
  //common
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.themeColors.white};
  background: ${({ theme }) => theme.utils.addOpacityToHexColor(theme.themeColors.black, 25)};
  backdrop-filter: ${({ noBlur }) => (noBlur ? 'none' : 'blur(10px)')};
  border-radius: 15px;
  text-align: center;
  padding: 15px 25px;
  margin: 5px 0;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.utils.addOpacityToHexColor(theme.themeColors.black, 40)};
  }
  // varaible
`
