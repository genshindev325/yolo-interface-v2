import { DropdownMenu } from 'components/Atoms/DropdownMenu'
import { AssetsMenu } from 'components/Molecules/AssetsSelector/AssetsMenu'
import { AssetsButton } from 'components/Molecules/AssetsSelector/AssetsButton'

export const AssetsSelector = () => <DropdownMenu menuHeader={<AssetsButton />} menuBody={<AssetsMenu />} noCloseIcon />
