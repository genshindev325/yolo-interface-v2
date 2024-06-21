import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import { Link as RouterLink } from 'react-router-dom'

const TYPE = 'links'

const getCommons = ({ theme }) => get(theme, `${'commons'}.${TYPE}`)
const getVariant = ({ theme, variant }) => get(theme, `${TYPE}.${variant}`)

const YoloLink = styled(RouterLink)`
  ${(props) => getCommons(props)}
  ${(props) => getVariant(props)}
`

/* Variants: simple, underlined, iconLink, invisible */

export const Link = ({ to = '', href = '', children, variant = 'underlined', newTab = true, ...rest }) => {
  const isExternal = Boolean(href)
  return (
    <>
      {' '}
      <YoloLink
        as={isExternal ? 'a' : ''}
        to={isExternal ? '' : to}
        href={isExternal ? href : ''}
        variant={variant}
        target={isExternal && newTab ? '_blank' : '_self'}
        rel='noopener noreferrer'
        {...rest}
      >
        {children}
      </YoloLink>{' '}
    </>
  )
}
