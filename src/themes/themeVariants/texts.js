import { css } from 'styled-components'

import { addOpacityToHexColor } from '../themeUtils'

export const texts = (themeColors) => ({
  texts: {
    plain: css`
      color: ${themeColors.secondary};
    `
  }
})
