import styled from 'styled-components'

const fontAssets = {
  text: { size: 0.7, component: 'span', weight: 400, align: 'left' },
  caption: { size: 1, component: 'h5', weight: 400, align: 'center' },
  title: { size: 1.5, component: 'h3', weight: 400, align: 'center' },
  headline: { size: 1.5, component: 'h1', weight: 600, align: 'center' }
}

export const Typography = ({
  variant = 'text',
  size,
  weight,
  family = `'Inter', sans-serif`,
  height = 140,
  color,
  align,
  spacing,
  children,
  hexColor,
  ...props
}) => {
  return (
    <StyledTypography
      variant={variant}
      size={size}
      weight={weight}
      family={family}
      height={height}
      color={color}
      align={align}
      spacing={spacing}
      hexColor={hexColor}
      as={fontAssets[variant].component}
      {...props}
    >
      {children}
    </StyledTypography>
  )
}

const StyledTypography = styled.div`
  font-size: ${({ size, variant }) => size ?? fontAssets[variant].size}rem;
  color: ${({ color, hexColor, theme }) => hexColor ?? theme.themeColors[color ?? 'white']};
  font-weight: ${({ weight, variant }) => weight ?? fontAssets[variant].weight};
  font-family: ${({ family }) => family};
  line-height: ${({ height }) => height}%;
  text-align: ${({ align, variant }) => align ?? fontAssets[variant].align};
  ${({ spacing }) => spacing && `letter-spacing: ${spacing}em;`}
`
