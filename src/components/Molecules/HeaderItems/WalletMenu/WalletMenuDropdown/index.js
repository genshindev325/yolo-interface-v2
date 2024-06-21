import React from 'react'
import { isMobile } from 'react-device-detect'

import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { WalletMenuHeader } from './WalletMenuHeader'
import { WalletMenuBody } from './WalletMenuBody'

export const WalletMenuDropdown = () => (
  <DropdownMenu menuHeader={<WalletMenuHeader />} menuBody={<WalletMenuBody />} noCloseIcon showBelow={!isMobile} />
)
