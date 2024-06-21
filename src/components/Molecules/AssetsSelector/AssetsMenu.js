import React from 'react'
import styled from 'styled-components'

import { AssertsSortHeader } from 'components/Molecules/AssetsSelector/AssetsSortHeader'
import { AssetsDialog } from 'components/Molecules/AssetsSelector/AssetsDialog'

export const AssetsMenu = ({ menuIsOpen, closeMenu }) => {
  return (
    <StyledMenu id='assets_menu_content'>
      <AssertsSortHeader />
      <AssetsDialog />
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  display: flex;
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(45px);
  justify-content: center;
  align-items: top;
  flex-direction: column;
  border-radius: 10px;
  padding: 0;
  margin-top: 10px;
`
