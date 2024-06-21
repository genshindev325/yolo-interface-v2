import { colorSchemaSelector } from './themeColors/'
import { themeLayout, breakPoints } from './themeLayout'
import { themeUtils } from './themeUtils'
import { themeCommons } from './themeCommon'
import { themeVariants } from './themeVariants'

export const themeSelector = (themeName) => {
  const composedTheme = {
    utils: themeUtils,
    layout: themeLayout,
    breakPoints: breakPoints,
    commons: themeCommons,
    ...themeVariants(colorSchemaSelector(themeName))
  }
  return composedTheme
}
