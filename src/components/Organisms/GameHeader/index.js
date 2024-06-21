import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { notificationActions } from 'redux/actions'
import { reduxWalletActions } from 'redux/actions'
import { selectActiveGameId } from 'redux/selectors'

import { IconLib } from 'components/Atoms/IconLib'
import { AssetsSelector } from 'components/Molecules/AssetsSelector/'
import { BurgerMenu } from 'components/Molecules/BurgerMenu'
import { HeaderItem } from 'components/Organisms/GameHeader/HeaderItem'
import { WalletManager } from 'components/Molecules/WalletManager'

export const GameHeader = ({ gridArea, onItemClick }) => {
  const dispatch = useDispatch()
  // const gameId = useSelector(selectActiveGameId())
  const LEFT_ITEMS_PROPS = useMemo(
    () => [
      {
        forMobile: true,
        children: 'chat',
        onClick: () => {
          onItemClick && onItemClick({ id: 'chat' })
        }
      },
      {
        forMobile: true,
        children: 'stats',
        onClick: () => {
          onItemClick && onItemClick({ id: 'stats' })
        }
      },
      {
        children: 'leaders',
        backDropClose: false,
        onClick: () =>
          dispatch(
            notificationActions.updateModal({
              // this component will receive `closeModal` prop to close programmatically the modal
              id: 'leaderboard',
              show: true,
              backdropClose: false
            })
          )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // const onApprovalClick = () => {
  //   dispatch(reduxWalletActions.approveToken(gameId, true))
  // }

  return (
    <HeaderNav id='HeaderNav' gridArea={gridArea}>
      <LeftArea>
        <YoloLogo collection='yolorekt' name='moon' dimension='34px' />
        <AssetsSelector />
        {LEFT_ITEMS_PROPS.map((props, idx) => (
          <HeaderItem key={`OpenModal-${idx}`} {...props} />
        ))}
      </LeftArea>
      <RightArea>
        {/* <DisBtn onClick={onApprovalClick}>Disapproval</DisBtn> */}
        <WalletManager />
      </RightArea>
      <MenuArea>
        <BurgerMenu />
      </MenuArea>
    </HeaderNav>
  )
}

// const DisBtn = styled.button`
//   color: white;
//   background: orange;
//   margin: 0 20px;
//   padding: 10px;
//   border-radius: 10px;
// `

const HeaderNav = styled.div`
  box-sizing: border-box;
  flex: 1 0;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  transition: all ease-out 0.5s;
  @media (max-width: 480px) {
    padding: 10px 10px;
  }
  ${({ gridArea }) => ({ gridArea })}
`
const LeftArea = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const RightArea = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: none;
  }
`
const MenuArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const YoloLogo = styled(IconLib)``
