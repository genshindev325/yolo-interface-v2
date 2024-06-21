import React from 'react'

import { HomeLayout } from 'components/Layouts/home'
import { Introduce, BestFriend, LiquidityPooling, BottomSection } from 'components/Organisms/home'
import { Investors } from 'components/Organisms/home/Investors'

export const HomePage = () => {
  return (
    <HomeLayout>
      <Introduce />
      <BestFriend />
      <LiquidityPooling />
      <BottomSection />
      <Investors />
    </HomeLayout>
  )
}
