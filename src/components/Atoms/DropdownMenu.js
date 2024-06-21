import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'

import { useClickOutside } from 'utils/hooks'

import { IconLib } from 'components/Atoms/IconLib'

export const DropdownMenu = React.memo(({ className, menuHeader, menuBody, noCloseIcon }) => {
  const [menuIsOpen, setIsOpen] = useState()
  const dropdownMenuRef = useRef()
  const headerRef = useRef()
  useClickOutside(dropdownMenuRef, () => setIsOpen(false))

  const menuHeaderIsValidElement = React.isValidElement(menuHeader)
  const mHeader = (menuHeaderIsValidElement && React.cloneElement(menuHeader, { menuIsOpen })) || menuHeader

  const menuBodyIsValidElement = React.isValidElement(menuBody)
  const mBody =
    (menuBodyIsValidElement && React.cloneElement(menuBody, { menuIsOpen, closeMenu: () => setIsOpen(false) })) ||
    menuBody

  const { top, bottom, left } = headerRef.current?.getBoundingClientRect() || {}
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  return (
    <DropdownMenuWrapper className={className} id='dropdown-menu' ref={dropdownMenuRef}>
      <MenuHeaderWrapper id='menu-header' onClick={() => setIsOpen(!menuIsOpen)} ref={headerRef}>
        {mHeader}
      </MenuHeaderWrapper>
      <MenuBodyWrapper
        id='menu-body'
        open={menuIsOpen}
        onClick={() => setIsOpen(false)}
        topPos={top}
        bottomPos={bottom}
        showBelow={top < windowHeight / 2}
        showFromLeft={left > windowWidth / 2}
      >
        {!noCloseIcon && <CloseIcon />}
        {mBody}
      </MenuBodyWrapper>
    </DropdownMenuWrapper>
  )
})

const mBodyFromLeft = css`
  left: 0;
  right: auto;
  ${({ theme }) => theme.breakPoints['425px']} {
    position: fixed;
    top: ${({ showBelow, bottomPos }) => (showBelow ? `${bottomPos}px` : '')};
  }
`
const mBodyAbove = css`
  ${({ theme }) => theme.breakPoints['1024px']} {
    position: fixed;
    left: 50%;
    top: ${({ topPos }) => `${topPos}px`};
    transform: translate(-50%, -100%);
  }
`

const DropdownMenuWrapper = styled.div`
  position: relative;
`
const MenuHeaderWrapper = styled.div``
const MenuBodyWrapper = styled.div`
  right: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  z-index: 10;
  //min-width: 320px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  ${({ showBelow }) => (showBelow ? '' : mBodyAbove)}
  ${({ showFromLeft }) => (showFromLeft ? '' : mBodyFromLeft)}
`
const CloseIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'close2',
  dimension: '20px',
  masking: true
})`
  display: none;
  position: absolute;
  ${({ theme }) => theme.breakPoints['425px']} {
    display: block;
    top: 20px;
    left: 20px;
    z-index: 10;
  }
`
