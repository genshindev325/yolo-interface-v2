import { STEEL_MOON_COLORS } from './steelMoon'

const DEFAULT_COLOR_SCHEMA = STEEL_MOON_COLORS

const themeColorSchemas = { steelMoon: STEEL_MOON_COLORS }

export const colorSchemaSelector = (themeName) => themeColorSchemas[themeName] || DEFAULT_COLOR_SCHEMA
