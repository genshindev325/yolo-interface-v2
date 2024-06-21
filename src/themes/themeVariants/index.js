import { buttons } from './buttons'
import { inputs } from './inputs'
import { links } from './links'
import { texts } from './texts'

export const themeVariants = (themeColors) => ({
  themeColors,
  ...buttons(themeColors),
  ...inputs(themeColors),
  ...links(themeColors),
  ...texts(themeColors)
})
