import { css } from 'styled-components'

import { addOpacityToHexColor } from '../themeUtils'

export const buttons = (themeColors) => ({
  buttons: {
    primary: css`
      color: ${themeColors.secondary};
      border-color: ${themeColors.primary};
      background: ${themeColors.primary};
      &:hover {
        color: ${themeColors.secondary};
        border-color: ${themeColors.primaryHover};
        background: ${themeColors.primaryHover};
      }
      &:disabled {
        color: ${themeColors.primary};
        border-color: ${themeColors.tertiary};
        background: ${themeColors.tertiary};
      }
    `,
    secondary: css`
      color: ${themeColors.secondary};
      border-color: ${themeColors.secondary};
      background: ${addOpacityToHexColor(themeColors.backgroundPrimary, 30)};
      &:hover {
        color: ${themeColors.secondary};
        border-color: ${themeColors.secondary};
        background: ${addOpacityToHexColor(themeColors.backgroundPrimary, 50)};
      }
      &:disabled {
        color: ${themeColors.secondary};
        border-color: ${themeColors.tertiary};
        background: ${themeColors.tertiary};
      }
    `
  }
})
