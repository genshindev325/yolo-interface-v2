import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectLiveStartBlock, selectLiveEndBlock, selectActiveCardRoundOffset } from 'redux/selectors'
import { useGameProgress } from 'utils/hooks'
import { LIVE_OFFSET } from 'utils/constants'
import { Tooltip } from 'components/Atoms/Tooltip'
import { IconLib } from 'components/Atoms/IconLib'

export const RunningBlocks = ({ className }) => {
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())

  const startBlock = useSelector(selectLiveStartBlock())
  const endBlock = useSelector(selectLiveEndBlock())

  const { blocksLeft } = useGameProgress()
  const isNext = useMemo(() => activeCardRoundOffset > LIVE_OFFSET, [activeCardRoundOffset])

  return useMemo(
    () => (
      <Container isBig={isNext} className={className}>
        <BlockIcon isBig={isNext} />
        <BlocksRow>
          <BlocksValue isBig={isNext}>{blocksLeft > 0 ? blocksLeft : 0}</BlocksValue>
          {!isNext ? (
            <BlocksWrap>
              <BlocksLeft>blocks</BlocksLeft>
              <Tooltip>
                <StartEndBlocks>
                  <div>
                    <p>Starting block </p>
                    <strong>{startBlock}</strong>
                  </div>
                  <div>
                    <p>Ending block </p>
                    <strong>{endBlock}</strong>
                  </div>
                </StartEndBlocks>
              </Tooltip>
            </BlocksWrap>
          ) : (
            ''
          )}
        </BlocksRow>
      </Container>
    ),
    [blocksLeft, activeCardRoundOffset]
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position relative;
  margin: -10px 0 0 0;

  @media (max-width: 480px) {
    margin: 0;
  }
`

const BlockIcon = styled(IconLib).attrs({ collection: 'crypto', name: 'spinningBlock' })`
  width: ${({ isBig }) => (isBig ? '75px' : '65px')};
  height: ${({ isBig }) => (isBig ? '76px' : '70px')};
  margin: ${({ isBig }) => (isBig ? '0 10px 0 0' : '0 8px 0 0')};

  @media (max-width: 480px) {
    width: ${({ isBig }) => (isBig ? '55px' : '44px')};
    height: ${({ isBig }) => (isBig ? '56px' : '44px')};
  }
`

const BlocksRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const BlocksValue = styled.div`
  font-size: ${({ isBig }) => (isBig ? '4.4rem' : '2.3rem')};
  font-weight: 700;
  line-height: 100%;
  width: ${({ isBig }) => (isBig ? 'auto' : '50px')};

  @media (max-width: 480px) {
    font-size: ${({ isBig }) => (isBig ? '3.0rem' : '1.8rem')};
  }
`

const BlocksWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const BlocksLeft = styled.div`
  font-size: 0.7rem;
  line-height: 0;
`

const StartEndBlocks = styled.div`
  & div {
    display: flex;
    flex-wrap: nowrap;
    flex: 1 1 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  & strong {
    font-weight: 700;
    padding: 0 0 0 6px;
  }
`
