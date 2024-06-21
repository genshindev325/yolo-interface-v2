import React from 'react'
import { isMobile } from 'react-device-detect'

import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { AccountMenuHeader } from './AccountMenuHeader'
import { AccountMenuBody } from './AccountMenuBody'

export const AccountMenuDropdown = () => (
  <DropdownMenu menuHeader={<AccountMenuHeader />} menuBody={<AccountMenuBody />} showBelow={!isMobile} />
)
