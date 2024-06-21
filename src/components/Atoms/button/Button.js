import styled from 'styled-components'
import { get } from 'lodash'

const TYPE = 'buttons'

const getCommons = ({ theme }) => get(theme, `${'commons'}.${TYPE}`)
const getVariant = ({ theme, variant = 'primary' }) => get(theme, `${TYPE}.${variant}`)

export const Button = styled.button`
  ${(props) => getCommons(props)}
  ${(props) => getVariant(props)}
`
