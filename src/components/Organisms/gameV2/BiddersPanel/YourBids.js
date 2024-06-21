import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import { getGameParameters } from 'config/games.config'
import { selectGameIdCurrentRoundIndex, selectActiveGameId } from 'redux/selectors'
import { gameDataActions, reduxWalletActions } from 'redux/actions'

import { IconLib } from 'components/Atoms/IconLib'
import { TX_STATUS } from 'utils/constants'
import { currencyFormatter } from 'utils'

const MyBidItem = ({ bid }) => {
  const dispatch = useDispatch()
  const { txStatus, isPending, direction, amount, bidRoundIndex, isHiddenInUi } = bid
  const gameIdCurrentRoundIndex = useSelector(selectGameIdCurrentRoundIndex())
  const isLive = bidRoundIndex === gameIdCurrentRoundIndex
  const statusIcon = txStatus === TX_STATUS.FAILED ? 'alertRed' : isPending ? 'pendingYellow' : 'checkBlue'

  const hideTx = () => {
    const updatedWalletTxInfo = { ...bid.walletTxInfo, isHiddenInUi: true }
    dispatch(reduxWalletActions.setTxAsUiHidden(updatedWalletTxInfo))
  }

  return isHiddenInUi ? null : (
    <BidItem>
      <StatusWrap>
        <Value isFailed={statusIcon === 'alertRed'}>
          <IconArrow isUp={direction !== 'down'} masking />
          {currencyFormatter(amount || 0)}
          {statusIcon !== 'alertRed' && isLive ? <IconLive /> : ''}
        </Value>
        <Status status={statusIcon}>
          <IconStatus name={statusIcon}></IconStatus>
          Round {bidRoundIndex}
        </Status>
        <IconClose isFailed={statusIcon === 'alertRed'} masking onClick={hideTx}></IconClose>
      </StatusWrap>
    </BidItem>
  )
}

export const YourBids = ({ bids }) => {
  const dispatch = useDispatch()
  const gameId = useSelector(selectActiveGameId())
  const gameParams = getGameParameters(gameId) || {}
  const gameName = gameParams?.name
  const gameIcon = gameParams?.icon
  const sortedBids = bids.sort((a, b) => {
    const roundGap = a.bidRoundIndex - b.bidRoundIndex
    return roundGap === 0 ? 0 : roundGap > 0 ? 1 : -1
  })
  //const processedBids = sortedBids.sort((a, b) => (a.isPending === b.isPending ? 0 : a.isPending ? -1 : 1))
  const processedBids = sortedBids

  const onBidNextClick = () => {
    dispatch(gameDataActions.bidOnNext())
  }

  return (
    <Container>
      <TitleWrapper>
        <Title role='heading' aria-level='3'>
          YOUR BIDS
        </Title>
        <GameWrap>
          <GameIcon gameIcon={gameIcon} />
          <GameName>{gameName}</GameName>
        </GameWrap>
      </TitleWrapper>
      <BidderList>
        <ScrollList>
          {processedBids.length > 0 ? (
            processedBids.map((bid, idx) => {
              return <MyBidItem key={'bidKey-' + idx} bid={bid} />
            })
          ) : (
            <NoBids>
              No bids available <span onClick={onBidNextClick}>Place a bid in the upcoming round</span>
            </NoBids>
          )}
        </ScrollList>
      </BidderList>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TitleWrapper = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
`

const Title = styled.div`
  text-transform: uppercase;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 700;
`
const BidderList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 15px 20px;
  background: rgba(152, 183, 253, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 0px 0px 45px -1px rgb(23 27 34 / 31%);
  height: 100%;
  max-height: 158px;

  ${({ theme }) => theme.breakPoints['xl']} {
    padding: 10px 0 10px 20px;
    border-radius: 10px;
  }
`
const ScrollList = styled.div`
  overflow-y: auto;
`
const NoBids = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  padding-top: 5px;
  & span {
    cursor: pointer;
    display: block;
    text-decoration: underline;
    text-decoration-color: #666;
    -webkit-text-underline-position: under;
    text-underline-position: under;
    white-space: nowrap;
  }
`
const BidItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  white-space: no-wrap;
  padding: 3px 0;
  padding-bottom: 3px;
  margin: 0;
  margin-bottom: 3px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }
`
const StatusWrap = styled.div`
  justify-content: space-between;
  margin: 0;
  padding: 0 0 0 0;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
`
const Status = styled.div`
  display: block;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  font-size: 0.75rem;
  position: absolute;
  left: calc(50% + 10px);
  top: 50%;
  transform: translateY(-50%);
  color: ${({ status }) => (status === 'alertRed' ? '#ff0000' : status === 'pendingYellow' ? '#e5c247' : '#2a6dff')};
  opacity: 1;
  display: flex;
`
const valueFailed = css`
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: red;
`
const Value = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 0 0 5px;
  font-weight: 600;
  font-size: 0.8rem;
  white-space: nowrap;
  ${({ isFailed }) => (isFailed ? valueFailed : '')}
`
const IconArrow = styled(IconLib).attrs(({ isUp }) => {
  return {
    collection: 'general',
    name: 'arrow',
    dimension: '12px',
    rotate: isUp ? 'up' : 'down'
  }
})`
  margin-right: 8px;
  background: ${({ isUp }) => (isUp ? `rgba(0,194,19,1.0)` : `rgba(226,14,85,1.0)`)};
  display: flex;
`
const IconLive = styled(IconLib).attrs({
  collection: 'yolorekt',
  name: 'liveText',
  dimension: '12px'
})`
  width: 34px;
  height: 12px;
  margin: 0 0 0 10px;
`
const IconStatus = styled(IconLib).attrs({
  collection: 'general',
  dimension: '16px'
})`
  margin: 0 10px 0 0;
`
const IconClose = styled(IconLib).attrs({
  collection: 'general',
  name: 'close2',
  dimension: '9px'
})`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin: 0 20px;
  background: rgba(255, 255, 255, 0.3);
  visibility: ${({ isFailed }) => (isFailed ? 'visible' : 'hidden')};
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`
const GameName = styled.div`
  opacity: 0.5;
  font-size: 0.7rem;
  padding: 2px 0 0 0;
  line-height: 160%;
`
const GameWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 10px;
`
const GameIcon = styled.div`
  background: url('${({ gameIcon }) => gameIcon}') center center / auto 16px no-repeat;
  height: 16px;
  width: 16px;
  margin: 0 3px 0 0;
`
