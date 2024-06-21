import { css } from 'styled-components'

import { addOpacityToHexColor } from '../themeUtils'

export const inputs = (themeColors) => ({
  inputs: {
    primary: css`
      color: ${themeColors.secondary};
      background-color: ${themeColors.backgroundPrimary};
      border-color: ${themeColors.backgroundPrimary};
      &::placeholder {
        color: ${themeColors.tertiary};
      }
    `
  }
})
