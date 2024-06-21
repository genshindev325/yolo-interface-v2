import React from 'react'

import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { BurgerButton } from 'components/Molecules/BurgerMenu/BurgerButton'
import { Menu } from 'components/Molecules/BurgerMenu/Menu'

export const BurgerMenu = () => <DropdownMenu menuHeader={<BurgerButton />} menuBody={<Menu open />} noCloseIcon />
