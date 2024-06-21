import React from 'react'
import styled from 'styled-components'
import { TotalView } from 'components/Organisms/gameV2'
import { PriceScale } from 'components/Organisms/PriceScale'
import { ProgressBar } from 'components/Organisms/gameV2/ProgressBar'
import { RunningBlocks } from 'components/Organisms/gameV2'

import { useGameProgress } from 'utils/hooks'

export const LiveGamePlay = React.memo(() => {
  const { progress } = useGameProgress()

  return (
    <>
      <TotalViewArea>
        <TotalView />
        <RunningBlocks />
      </TotalViewArea>
      <ProgressBar progress={progress}></ProgressBar>
      <PriceScale />
    </>
  )
})

const TotalViewArea = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
  /* width: 100%; */
  padding: 15px 0;
  flex-wrap: wrap;
  margin: 0 2.5vw;
`
