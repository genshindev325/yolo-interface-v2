import { css } from 'styled-components'
export const addOpacityToHexColor = (color, opacity) => {
  opacity /= 100
  let hexOpacity = Math.round(opacity * 255).toString(16)
  if (hexOpacity.length === 1) {
    hexOpacity = '0' + hexOpacity
  }
  return `${color}${hexOpacity}`
}

export const themeUtils = { addOpacityToHexColor }
