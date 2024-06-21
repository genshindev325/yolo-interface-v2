import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { getGameParameters } from 'config/games.config'

import { cryptoToWei, currencyFormatter } from 'utils'
import { UP, DOWN } from 'utils/constants'
import { useConvertAmount } from 'utils/hooks'
import { potentialGain } from 'utils/amounts'

import { reduxWalletActions } from 'redux/actions'
import {
  selectActiveGameId,
  selectActiveCardRoundOffset,
  selectActiveCardRoundIndex,
  selectActiveGameHexId,
  selectCurrentBlock,
  selectLiveEndBlock,
  selectHasPendingTx,
  selectWaitListInfo,
  selectWalletAddress,
  selectWalletBalance,
  selectWalletHasNFT,
  selectWalletConnectionState,
  selectTokenApproval
} from 'redux/selectors'

import { IconLib } from 'components/Atoms/IconLib'
import { BidCloseEnd } from './BidCloseEnd'

const MARGIN_TO_BID_IN_NEXT = 10
const INITIAL_AMOUNTS = { crypto: '', fiat: '' }
const SUGGESTED_AMOUNTS = ['40.00', '60.00', '80.00']

export const BiddingModal = ({ closeModal, bidObj }) => {
  const dispatch = useDispatch()
  const gameId = useSelector(selectActiveGameId())
  const gameHexId = useSelector(selectActiveGameHexId())
  const activeCardRoundOffset = useSelector(selectActiveCardRoundOffset())
  const activeCardRoundIndex = useSelector(selectActiveCardRoundIndex())
  const currentBlock = useSelector(selectCurrentBlock())
  const endBlock = useSelector(selectLiveEndBlock())
  const address = useSelector(selectWalletAddress())
  const isConnected = useSelector(selectWalletConnectionState())
  const isPendingTx = useSelector(selectHasPendingTx())
  const hasNFT = useSelector(selectWalletHasNFT())
  const isTokenApproved = useSelector(selectTokenApproval())
  const waitlistInfo = useSelector(selectWaitListInfo())
  const { totalBalance } = useSelector(selectWalletBalance())
  const amountInputRef = useRef()

  const [amount, setAmount] = useState(INITIAL_AMOUNTS)
  const [balance, setBalance] = useState('$0.00')

  const [payoutsAndGainsUp, setPayoutsAndGainsUp] = useState({})
  const [payoutsAndGainsDown, setPayoutsAndGainsDown] = useState({})
  const [isCloseToEnd, setIsCloseToEnd] = useState(false)

  const { gamePool } = bidObj

  const convert = useConvertAmount()

  const FEE = getGameParameters(gameId).FEE
  const [isDisabled, setDisabled] = useState(!isConnected || !amount.fiat || isPendingTx)

  const bidOnNext = async (isUp) => {
    checkTokenAllowance()
    checkHasNFT(address)
    if (!parseFloat(amount.crypto)) {
      return
    }
    const roundOffset = activeCardRoundOffset <= 1 && endBlock - currentBlock <= MARGIN_TO_BID_IN_NEXT ? 1 : 0
    const bidRoundIndex = activeCardRoundIndex + roundOffset
    const bidData = {
      amount: cryptoToWei(amount.crypto.replace(/,/g, '')),
      isUp,
      bidRoundIndex
    }
    if (hasNFT && isTokenApproved) {
      dispatch(reduxWalletActions.yoloBid({ bidData, gameId, gameHexId }))
    }
    closeModal()
    return true
  }

  const checkHasNFT = (address) => {
    !hasNFT && !waitlistInfo?.waitlistId && dispatch(reduxWalletActions.updateNftInfo({ address }))
  }
  const checkTokenAllowance = () => {
    !isTokenApproved && dispatch(reduxWalletActions.updateTokenInfo())
  }

  useEffect(() => {
    !isPendingTx && setAmount({})
  }, [isPendingTx])

  useEffect(() => {
    const isCloseToEnd = activeCardRoundOffset <= 1 && endBlock - currentBlock <= MARGIN_TO_BID_IN_NEXT ? true : false
    setIsCloseToEnd(isCloseToEnd)
  }, [activeCardRoundOffset, activeCardRoundIndex, currentBlock, endBlock])

  const isValidDecimalNumber = (value) => {
    const isNumberWithDecimalOnChange = (str) => /^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(str)
    return !!value ? isNumberWithDecimalOnChange(value) && value >= 0 : true
  }

  const isMaxInteger = (value) => {
    // whole numbers part should not be more than 5 digits
    const limitRegex = /(\d{6,})/
    return limitRegex.test(value)
  }

  const formatBidAmount = (value) => {
    // number cannot have more than two decimal places
    const amountRegEx = /((\d{1,5}).*)?(\.\d{2}).*/

    return value.replace(amountRegEx, '$2$3')
  }

  const setPayoutAmount = (value) => {
    if (isMaxInteger(value)) {
      return
    }

    const bidAmount = formatBidAmount(value)

    if (isValidDecimalNumber(bidAmount)) {
      const balanceInCrypto = convert(bidAmount, 'USD', 'YOLO', { format: false })
      setAmount({
        crypto: bidAmount ? balanceInCrypto : '',
        fiat: bidAmount
      })
    }
  }

  useEffect(() => {
    amountInputRef.current.focus()
  }, [])

  useEffect(() => {
    const { potentialRawGain: potRawGainUp, potentialPayout: potPayoutUp } = potentialGain(
      gamePool,
      FEE,
      UP,
      amount.crypto
    )
    const { potentialRawGain: potRawGainDown, potentialPayout: potPayoutDown } = potentialGain(
      gamePool,
      FEE,
      DOWN,
      amount.crypto
    )
    const fiatGainUp = convert(potRawGainUp, 'YOLO', 'USD', { number: true }) || 0
    const fiatGainDown = convert(potRawGainDown, 'YOLO', 'USD', { number: true }) || 0

    setPayoutsAndGainsUp({ potGain: currencyFormatter(fiatGainUp), potPayout: potPayoutUp })
    setPayoutsAndGainsDown({ potGain: currencyFormatter(fiatGainDown), potPayout: potPayoutDown })

    // const { potentialGain: potGainUp, potentialPayout: potPayoutUp } = potentialGain('up', amount.crypto)
    // const { potentialGain: potGainDown, potentialPayout: potPayoutDown } = potentialGain('down', amount.crypto)
    // setPayoutsAndGainsUp({ potGain: potGainUp, potPayout: potPayoutUp })
    // setPayoutsAndGainsDown({ potGain: potGainDown, potPayout: potPayoutDown })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, gamePool])

  useEffect(() => {
    !amount.crypto && setAmount(INITIAL_AMOUNTS)
    setDisabled(!isConnected || !amount.fiat || isPendingTx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, isConnected, isPendingTx])

  useEffect(() => {
    if (!convert || !totalBalance) return
    const fiatBalance = convert(totalBalance, 'YOLO', 'USD', { number: true }) || 0
    setBalance(currencyFormatter(fiatBalance))
  }, [convert, totalBalance])
  return (
    <ModalOverlay>
      <Modal>
        <ModalWrapper isCloseToEnd={isCloseToEnd}>
          {isCloseToEnd && <BidCloseEnd blocksLeft={endBlock - currentBlock} />}
          <Close masking onClick={() => closeModal()}>
            &times;
          </Close>
          <ModalHeading>
            <Title>
              Bid in
              <RoundNumber>
                <span>Round</span>
                <div className='round'>
                  {activeCardRoundIndex}
                  <SelectionIcon>
                    <Triangle masking></Triangle>
                  </SelectionIcon>
                </div>
              </RoundNumber>
            </Title>
          </ModalHeading>
          <BidForm onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <label htmlFor='input_bid_entry'>Bid amount</label>
              <InputWrap>
                <AmountInput
                  type='number'
                  id='input_bid_entry'
                  placeholder={SUGGESTED_AMOUNTS[0]}
                  maxlength='9'
                  ref={amountInputRef}
                  value={amount.fiat}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                ></AmountInput>
                <AmountSuggestions>
                  {SUGGESTED_AMOUNTS.map((amount, index) => (
                    <button key={index} onClick={() => setPayoutAmount(amount)}>
                      {amount}
                    </button>
                  ))}
                </AmountSuggestions>
              </InputWrap>
              <CurrencyWrap>
                <IconUSD></IconUSD>
                USD
              </CurrencyWrap>
            </fieldset>
            <BidBalanceRemainder>
              <YoloBalance>
                Balance<strong>{balance}</strong>
              </YoloBalance>
            </BidBalanceRemainder>
            <ButtonRow>
              <BidButtonWrap>
                <PlaceBidButton isUp={false} onClick={() => bidOnNext(false)} disabled={isDisabled}>
                  Bid down
                </PlaceBidButton>
                <PayoutContainer isUp={false}>
                  <strong>Payout </strong> {payoutsAndGainsDown.potGain}
                  <Payout isUp={false}>{payoutsAndGainsDown.potPayout}</Payout>
                </PayoutContainer>
              </BidButtonWrap>
              <BidButtonWrap>
                <PlaceBidButton isUp={true} onClick={() => bidOnNext(true)} disabled={isDisabled}>
                  Bid up
                </PlaceBidButton>
                <PayoutContainer isUp={true}>
                  <strong>Payout </strong> {payoutsAndGainsUp.potGain}
                  <Payout isUp={true}>{payoutsAndGainsUp.potPayout}</Payout>
                </PayoutContainer>
              </BidButtonWrap>
            </ButtonRow>
          </BidForm>
        </ModalWrapper>
      </Modal>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: relative;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Modal = styled.div`
  & > div {
    border: none;
    font-size: 13px;
  }
`
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 15px;
  position: relative;
  //background: rgba(0, 0, 0, 0.5);

  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  min-width: 400px;
  white-space: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  padding-top: ${({ isCloseToEnd }) => (isCloseToEnd ? '65px' : '30px')};

  &:before {
    position: absolute;
    top: 50%;
    left: calc(50% - 2vw);
    transform: translate(-50%, -50%);
    background: rgba(42, 109, 255, 0.4);
    -webkit-filter: blur(200px);
    content: '';
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: 15px;
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
    box-shadow: 0 1px 50px 0px rgba(0, 0, 0, 0.3);
    z-index: -1;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    display: flex;
    min-width: 300px;
  }
`
const Close = styled(IconLib).attrs({ collection: 'general', name: 'closeOutline', dimension: '25px' })`
  color: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: fixed;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -8px;
  text-align: center;
  text-decoration: none;
  top: -8px;
  z-index: 1;
  background: rgba(255, 255, 255, 1);

  @media (max-width: 480px) {
    left: -8px;
    top: -8px;
  }
`
const ModalHeading = styled.div`
  font-weight: 700;
  display: flex;
  white-space: nowrap;
  text-align: left;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  flex-direction: row;
  line-height: 100%;
  padding: 0;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  line-height: 100%;
  font-weight: 300;

  @media (max-width: 480px) {
    margin: 0 0 0 10px;
    padding-top: 12px;
  }
`

const RoundNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;

  & span {
    font-weight: 700;
    line-height: 100%;
    padding: 0 0 0 8px;
  }

  & .round {
    display: flex;
    line-height: 100%;
    font-weight: 700;
    border-radius: 10px;
    margin: -6px 0 0 4px;
    padding: 6px 8px;
    font-size: 1.6rem;
    border: 1px solid transparent;
    position: relative;

    @media (max-width: 480px) {
      font-size: 1.3rem;
      padding: 6px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  &:hover .round {
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;

    @media (max-width: 480px) {
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
  }
`
const SelectionIcon = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  align-self: center;
  margin: 0 0 0 5px;
`
const Triangle = styled(IconLib).attrs({ collection: 'general', name: 'arrowUp', rotate: 'up', dimension: '12px' })`
  background: #fff;
`
const BidForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0 0 0;
  width: 100%;

  & * {
    font-weight: 300;
  }

  & fieldset {
    border: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }

  & label {
    font-size: 0.8rem;
    padding: 0 0 5px 0;
  }
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;

  @media (max-width: 480px) {
    width: 190px;
  }
`
const AmountInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 16px;
  color: #fff;
  border: 1px solid rgba(42, 109, 255, 0.5);
  border-radius: 5px;
  font-size: 1.6rem;
  font-weight: 300;
  width: 100%;
  line-height: 100%;

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  &:focus {
    -webkit-box-shadow: 0 0 60px 0 rgba(42, 109, 255, 1);
    outline: 0;
  }
`
const AmountSuggestions = styled.div`
  display: flex;
  margin: 5px 0 20px 0;

  & button {
    text-decoration: none;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 0;
    color: white;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0 3px 0 0;
    text-align: center;
    width: 100%;
    height: 36px;
  }

  & button:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & button:nth-child(2) {
    border-radius: 0;
  }

  & button:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-right: 0;
  }
`
const CurrencyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: flex-start;
  position: absolute;
  left: 255px;
  top: calc(50% - 18px);
  transform: translateY(-50%);

  @media (max-width: 480px) {
    left: 200px;
    font-size: 1.1rem;
  }
`
const IconUSD = styled(IconLib).attrs({ collection: 'general', name: 'usd' })`
  width: 18px;
  height: 24px;
  margin: 0 5px 0 0;

  @media (max-width: 480px) {
    width: 13px;
    height: 19px;
    margin: 0 3px 0 0;
  }
`
const BidBalanceRemainder = styled.div`
  font-size: 0.9rem;

  & strong {
    padding: 0 0 0 5px;
    font-weight: 700;
  }
`
const PayoutContainer = styled.div`
  font-weight: 300;
  margin: 8px 0 0 0;
  display: flex;
  align-items: center;

  & strong {
    padding-right: 9px;
    opacity: 0.5;
    font-size: 0.75;
  }
`
const Payout = styled.span`
  background: ${({ isUp }) =>
    isUp
      ? `linear-gradient(0deg, rgba(0, 135, 13, .5) 0%, rgba(1, 168, 17, .5) 100%)`
      : `linear-gradient(0deg, rgba(175, 11, 66, .5) 0%, rgba(226, 14, 85, .5) 100%)`};
  padding: 2px 4px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0 0 0 3px;
  font-weight: 600;
`
const YoloBalance = styled.div``
const ButtonRow = styled.fieldset`
  display: flex;
  flex-direction: row !important;
  padding: 20px 0 0 0;
`
const BidButtonWrap = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PlaceBidButton = styled.button.attrs({ type: 'button' })`
  background: ${({ isUp }) =>
    isUp
      ? `linear-gradient(0deg, rgba(0, 135, 13, 1) 0%, rgba(1, 168, 17, 1) 100%)`
      : `linear-gradient(0deg, rgba(175, 11, 66, 1) 0%, rgba(226, 14, 85, 1) 100%)`};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.5 : '')};
  width: calc(100% - 4px);
  padding: 10px;
  margin: 0 2px;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    ${({ isUp, disabled }) =>
      disabled ? '' : isUp ? `background: rgba(1, 168, 17, 1);` : `background: rgba(226, 14, 85, 1);`}
  }
`
