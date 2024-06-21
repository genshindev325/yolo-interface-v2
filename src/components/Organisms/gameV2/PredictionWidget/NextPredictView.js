import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { PredictButton } from '../PredictButton'
import { notificationActions } from 'redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalState, selectWalletHasNFT, selectActiveGameId } from 'redux/selectors'
import { currencyFormatter } from 'utils'
import { useConvertAmount } from 'utils/hooks'
import { UP, DOWN } from 'utils/constants'
import { potentialGain } from 'utils/amounts'
import { getGameParameters } from 'config/games.config'

export const NextPredictView = ({ gamePool }) => {
  const dispatch = useDispatch()
  const { show, id: modalId } = useSelector(selectModalState())
  const hasNFT = useSelector(selectWalletHasNFT())
  const gameId = useSelector(selectActiveGameId())
  const FEE = getGameParameters(gameId).FEE
  const [payoutsAndGainsUp, setPayoutsAndGainsUp] = useState({})
  const [payoutsAndGainsDown, setPayoutsAndGainsDown] = useState({})

  const convert = useConvertAmount()

  const getBiddingModalObj = (bidObj) => ({
    show: true,
    id: 'bidding',
    backdropClose: false,
    backdropBlurred: false,
    // this component will receive `closeModal` prop to close programmatically the modal
    props: { bidObj }
  })

  useEffect(() => {
    if (!gamePool) return
    const myBids = gamePool.bids.myBids
    let upAmount = 0,
      downAmount = 0
    myBids.map((bid, index) => {
      if (bid.direction === UP) {
        upAmount += parseInt(bid.amount)
      } else {
        downAmount += parseInt(bid.amount)
      }
    })

    const { potentialRawGain: potRawGainUp, potentialPayout: potPayoutUp } = potentialGain(gamePool, FEE, UP, upAmount)
    const { potentialRawGain: potRawGainDown, potentialPayout: potPayoutDown } = potentialGain(
      gamePool,
      FEE,
      DOWN,
      downAmount
    )
    const fiatGainUp = convert(potRawGainUp, 'YOLO', 'USD', { number: true }) || 0
    const fiatGainDown = convert(potRawGainDown, 'YOLO', 'USD', { number: true }) || 0

    setPayoutsAndGainsUp({ potGain: currencyFormatter(fiatGainUp), potPayout: potPayoutUp })
    setPayoutsAndGainsDown({ potGain: currencyFormatter(fiatGainDown), potPayout: potPayoutDown })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePool])

  const hasNotNFTObj = {
    show: true,
    id: 'nftClaim'
  }

  const isOpened = show && modalId === 'bidding'

  const onButtonClick = () => {
    if (!hasNFT) {
      dispatch(notificationActions.updateToast(hasNotNFTObj))
    } else {
      const biddingModalObj = getBiddingModalObj({ gamePool })
      dispatch(notificationActions.updateModal(biddingModalObj))
    }
  }

  return (
    <>
      <Container>
        <Buttons disabled={isOpened}>
          <BidButton onClick={onButtonClick} disabled={isOpened} />
          <BidButton onClick={onButtonClick} isUp disabled={isOpened} />
        </Buttons>
        <Payouts>
          <PayoutContainer>
            <strong>Payout</strong>
            {payoutsAndGainsDown.potGain}
            <Payout isUp={false}>{payoutsAndGainsDown.potPayout}</Payout>
          </PayoutContainer>
          <PayoutContainer>
            <strong>Payout</strong>
            {payoutsAndGainsUp.potGain}
            <Payout isUp={true}>{payoutsAndGainsUp.potPayout}</Payout>
          </PayoutContainer>
        </Payouts>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 2.5vw;
  flex-direction: column;
  align-items: center;
  margin: 0 0 20px 0;
  ${({ theme }) => theme.breakPoints['xs']} {
    margin: 0 0 15px 0;
  }
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${({ disabled }) => (!disabled ? '-webkit-box-shadow: 0 0 60px 0 rgb(42 109 255 / 40%);' : '')}
  ${({ disabled }) => (!disabled ? 'border: 1px solid rgba(42, 109, 255, 0.4);' : '')}
  border-radius: 10px;
  margin: 0 0 10px 0;
`
const BidButton = styled(PredictButton)`
  width: 50%;
  padding: 14px 0;
`
const Payouts = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`
const PayoutContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0;
  font-weight: 300;

  & strong {
    display: flex;
    padding-right: 9px;
    opacity: 0.5;
  }
`
const Payout = styled.div`
  display: flex;
  padding: 2px 4px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0 0 0 8px;
  font-weight: 600;
  background: ${({ isUp }) =>
    isUp
      ? 'linear-gradient(0deg, rgba(0,135,13,.5) 0%, rgba(1,168,17,.5) 100%)'
      : 'linear-gradient(0deg, rgba(175,11,66,.5) 0%, rgba(226,14,85,.5) 100%)'};
`
