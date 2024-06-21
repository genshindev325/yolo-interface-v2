import styled from 'styled-components'

import { Link } from 'components/Atoms/Link'

import { IconLib } from 'components/Atoms/IconLib'
/* VARIANTS: moon*/

const LOGOS_URL = {
  moon: require('assets/icons/moon_icon.svg')
}

const YoloRektLogo = styled(Link).attrs(({ variant, noRedirect, to }) => ({
  to: noRedirect ? '' : to ? to : '/home'
}))`
  display: block;
  height: 10px;
  background: url(${({ variant }) => LOGOS_URL[variant || 'moon']}) no-repeat;
  //background-size: 320px 100px;
  background-position: top center;
  position: relative;
  z-index: 999;
`
export default YoloRektLogo
