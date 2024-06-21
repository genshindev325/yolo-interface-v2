import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { selectRegisteredGamesIds, selectSelectedGameIds } from 'redux/selectors'
import { gameBrowserActions } from 'redux/actions'

import { Typography } from 'components/Atoms/Typography'
import { Checkbox } from 'components/Atoms/Checkbox'
import { AssetInfoRow } from 'components/Molecules/AssetsSelector/AssetInfoRow'

export const AssetsDialog = ({ open }) => {
  const dispatch = useDispatch()
  const registeredGamesIds = useSelector(selectRegisteredGamesIds())
  const selectedGamesIds = useSelector(selectSelectedGameIds())
  const initialRibbonState = registeredGamesIds.map((registeredGame) => selectedGamesIds.includes(registeredGame))

  const [isShowPastGame, setIsShowPastGame] = useState(true)

  const [showOptions, setShowOptions] = useState(initialRibbonState)

  useEffect(() => {
    if (initialRibbonState.length !== showOptions.length) {
      setShowOptions(initialRibbonState)
    }
  }, [initialRibbonState, showOptions.length])

  const onSelectOption = (gameId, isChecked, index) => {
    const tmp = [...showOptions]
    if (selectedGamesIds.length === 1 && tmp[index]) {
      return
    }
    tmp[index] = isChecked
    setShowOptions(tmp)
    dispatch(gameBrowserActions.updateSelectedGamesIds({ gameId, isChecked }))
  }
  return (
    <Content>
      {registeredGamesIds.map((gameId, index) => {
        return (
          <AssetInfoRow
            gameId={gameId}
            key={`regGame-${index}`}
            checked={showOptions[index]}
            onChange={() => onSelectOption(gameId, !showOptions[index], index)}
          />
        )
      })}
      <StatusArea>
        <Checkbox variant='contained' checked={true} onChange={() => {}}>
          <Typography size='0.8' variant='caption'>
            Show past games
          </Typography>
        </Checkbox>
      </StatusArea>
    </Content>
  )
}
const Content = styled.ul``

const StatusArea = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px 10px 20px;
  margin: 10px 0 0 0;
  ${({ theme }) => theme.breakPoints['425px']} {
    padding: 10px;
  }
`
