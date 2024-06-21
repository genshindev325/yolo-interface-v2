import React from 'react'

import { NFTWaitListBanner } from './NFTWaitListBanner'
import { RestrictedBanner } from './RestrictedBanner'

const BANNER_DICT = {
  nftWaitList: <NFTWaitListBanner />,
  restricted: <RestrictedBanner />
}

export const BannerLib = ({ bannerId, ...modalProps }) => {
  const selectedBanner = BANNER_DICT[bannerId] || null
  const composedBanner = selectedBanner && React.cloneElement(selectedBanner, { ...modalProps })

  return composedBanner
}
