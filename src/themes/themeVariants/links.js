import { css } from 'styled-components'

import { addOpacityToHexColor } from '../themeUtils'

export const links = (themeColors) => ({
  links: {
    simple: css`
      color: ${themeColors.hoverableText};
      &,
      &:visited,
      &:active,
      &:focus {
        color: ${themeColors.hoverableText};
      }
      &:hover {
        color: ${themeColors.primary};
      }
    `,
    underlined: css`
      text-decoration: underline;
      color: ${themeColors.textPrimary};
      &,
      &:visited,
      &:active,
      &:focus {
        color: ${themeColors.textPrimary};
      }
      &:hover {
        color: ${themeColors.textSecondary};
      }
    `,
    iconLink: css`
      fill: ${themeColors.white};
      &:hover {
        fill: ${themeColors.primary};
      }
    `,
    invisible: css`
      &,
      &:visited,
      &:active,
      &:focus {
      }
      &:hover {
      }
    `
  }
})
