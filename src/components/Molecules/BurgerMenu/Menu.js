import React from 'react'
import styled from 'styled-components'

import { config } from 'config'

import { Link } from 'components/Atoms/Link'
import { IconLib } from 'components/Atoms/IconLib'

export const Menu = ({ open }) => {
  /* prettier-ignore */
  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'lightning', collection: 'general', to: 'game/dashboard' },
    { id: 'about', label: 'About', icon: 'about', collection: 'general', to: '/about' },
    { id: 'press', label: 'Press', icon: 'press', to: '/press' },
    { id: 'support', label: 'Support', icon: 'support', collection: 'general', href: 'https://yolorekt.zendesk.com' },
    {
      id: 'careers',
      label: 'Careers',
      icon: 'career',
      collection: 'general',
      href: 'https://pallet.xyz/list/bankless/job/409d9a69-e6fd-4644-83e3-02714e1cc1cc'
    }
  ]
  return (
    <StyledMenu>
      {MENU_ITEMS.map((item, index) => (
        <MenuItem key={index} href={item.href} to={item.to} onClick={item.onClick}>
          <SocialIcon name={item.icon} collection={item.collection} />
          {item.label}
        </MenuItem>
      ))}
      <Divider />
      {config.YOLO_SOCIAL_LINKS.map((item, index) => (
        <MenuItem key={index} href={item.url}>
          <SocialIcon name={item.icon} />
          {item.label}
        </MenuItem>
      ))}
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  padding: 10px 0;
  box-sizing: border-box;
  z-index: 4;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  list-style: none;
  color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  cursor: default;
  justify-content: flex-start;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 10px 30px 35px 0px rgb(0 0 0 / 35%);
    z-index: -1;
    border-radius: 15px;
  }
`
const MenuItem = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  padding: 5px 20px;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.themeColors.white};
  }
`
const SocialIcon = styled(IconLib).attrs((props) => ({
  collection: props.collection || 'brands',
  dimension: '20px',
  masking: true
}))`
  margin-right: 13px;
`
const Divider = styled.div`
  border-top: 1px dotted rgba(255, 255, 255, 0.3);
  border-bottom: none;
  margin: 5px 0;
`
