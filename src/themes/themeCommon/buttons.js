import { css } from 'styled-components'

export const buttons = {
  buttons: css`
    cursor: pointer;
    text-align: center;
    border: none;
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    color: ${({ theme }) => theme.themeColors.white};
    font-size: 0.9rem;
    letter-spacing: 1.5px;
    padding: 6px 18px;
    width: 100%;
    transition: all 0.3s ease-in;
    font-weight: 500;
  `
}
