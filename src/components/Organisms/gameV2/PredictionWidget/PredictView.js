import { useEffect, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { UP, DOWN } from 'utils/constants'
import { getGameParameters } from 'config/games.config'

import { selectActiveGameId } from 'redux/selectors'

import { BidDropdown } from 'components/Atoms/BidDropdown'
import { IconLib } from 'components/Atoms/IconLib'

import { formatUTCTimestamp, currencyFormatter } from 'utils'

export const PredictView = ({ gamePool, potentialGain, myBids = [] }) => {
  const [selectedItem, setSelectedItem] = useState()
  const [options, setOptions] = useState([])
  const [isUp, setIsUp] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState()
  const [hasBids, setHasBids] = useState(false)
  const [myUpTotal, setMyUpTotal] = useState(0)
  const [myDownTotal, setMyDownTotal] = useState(0)

  const gameId = useSelector(selectActiveGameId())

  const FEE = getGameParameters(gameId).FEE

  const showPayout = (isPayoutUp) => {
    if (!gamePool) return `0.00 X`

    const payoutFactor = gamePool?.[isPayoutUp ? 'payoutUp' : 'payoutDown'] * (1 - FEE)

    if (payoutFactor === Infinity) return 'MAX'
    return `${payoutFactor.toFixed(2)} X`
  }

  useEffect(() => {
    if (!myBids) {
      setOptions([])
      setMyUpTotal(0)
      setMyDownTotal(0)
      return
    }
    let opts = []
    let upTotal = 0
    let downTotal = 0
    for (let i = 0; i < myBids.length; i++) {
      const bidAmount = parseFloat(myBids[i].amount)

      if (myBids[i].direction === UP) {
        upTotal += bidAmount
      } else if (myBids[i].direction === DOWN) {
        downTotal += bidAmount
      }

      opts.push({
        id: `${i}-${myBids[i].direction}-${bidAmount.toFixed(2)}`,
        direction: myBids[i].direction,
        caption: '$' + bidAmount.toFixed(2)
      })
    }
    setOptions(opts)
    setMyUpTotal(upTotal)
    setMyDownTotal(downTotal)
  }, [myBids])

  useEffect(() => {
    if (!options || !options.length) {
      setHasBids(false)
      setSelectedItem('')
      setSelectedAmount('0.00')
      return
    }
    const currentItem = selectedItem ? selectedItem : options[0].id
    const currentBid = currentItem.split('-')
    setHasBids(true)
    setIsUp(currentBid[1] === UP)
    setSelectedAmount(currentBid[2])
  }, [options, selectedItem])

  const onBidItemChange = (value) => {
    setSelectedItem(value)
  }

  return (
    <Container>
      {useMemo(
        () => (
          <>
            <SectionNumberOfBids>
              <BidsCountDropdown label='You made' options={options} onChange={onBidItemChange}></BidsCountDropdown>
            </SectionNumberOfBids>
            <SectionCurrentBid>
              {hasBids ? <DateTime>{formatUTCTimestamp(gamePool?.timestamp)}</DateTime> : ''}
              {hasBids ? (
                <BidAmountWrapper>
                  <IconBid name={isUp ? 'biddingUp' : 'biddingDown'}></IconBid>
                  <Amount>{currencyFormatter(selectedAmount)}</Amount>
                </BidAmountWrapper>
              ) : (
                ''
              )}
            </SectionCurrentBid>
          </>
        ),
        // eslint-disable-next-line
        [hasBids, isUp, options.length, selectedAmount]
      )}
      {useMemo(
        () => (
          <>
            <SectionPayout>
              <TotalPayoutHeading hasBids={hasBids} isUp={isUp}>Total Payout</TotalPayoutHeading>
              <Payout hasBids={hasBids} isUp={isUp}>
                <strong>{potentialGain(isUp ? UP : DOWN, isUp ? myUpTotal : myDownTotal)}</strong>
                <Multiply hasBids={hasBids} isUp={isUp}>
                  {showPayout(isUp)}
                </Multiply>
              </Payout>
            </SectionPayout>
          </>
        ),
        // eslint-disable-next-line
        [myUpTotal, myDownTotal, hasBids, isUp]
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-height: 90px;
  padding: 0;

  ${({ theme }) => theme.breakPoints['600px']} {
    background: rgba(32, 38, 51, 0.2);
    backdrop-filter: blur(20px);
    margin: 0 -15px;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    min-height: 60px;
  }
`
const SectionNumberOfBids = styled.div`
  width: 33.3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 33%;
  }
`

const BidsCountDropdown = styled(BidDropdown)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const SectionCurrentBid = styled.div`
  width: 33.333333%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
const DateTime = styled.div`
  font-size: 0.75rem;
  color: #7d7f83;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-top: -15px;
  
  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: .7rem;
    margin-top: 0;
    height: 15px;
    align-items: flex-start;
  }
`
const BidAmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const IconBid = styled(IconLib).attrs({ collection: 'yolorekt', dimension: '26px' })`
  width: 30px;
  height: 26px;

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 24px;
    height: 20px;
  }
`

const Amount = styled.div`
  font-size: 1.9rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  margin: 0 5px;
  display: flex;
  line-height: 100%;

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: 1.3rem;
    letter-spacing: -.01em;
  }
`
const SectionPayout = styled.div`
  width: 33.333333%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  font-size: 0.9rem;
  position: relative;
  font-weight: 500;

  ${({ theme }) => theme.breakPoints['768px']} {
    justify-content: flex-end;
  }

  ${({ theme }) => theme.breakPoints['480px']} {
    width: 33%;
  }
`
const TotalPayoutHeading = styled.div`
  color: ${({ hasBids, isUp }) => (hasBids ? (isUp ? `rgba(0, 194, 19, 1.0)` : `rgba(226, 14, 85, 1.0)`) : `#aaa`)};
  display: flex;
  justify-content: flex-end;
  font-size: .75rem;
  margin: 0 0 2px 0;

  ${({ theme }) => theme.breakPoints['768px']} {
    justify-content: flex-end;
    width: 100%;
  }
`
const Payout = styled.div`
  flex-direction: row;
  display: flex;
  line-height: 120%;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  & strong {
    margin: 0 0 0 5px;
    color: white;
    display: flex;
  }
`
const Multiply = styled.div`
  padding: 4px 6px;
  line-height: 100%;
  white-space: nowrap;
  font-weight: 300;
  border-radius: 5px;
  margin: 0 0 0 5px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ hasBids, isUp }) =>
    hasBids ? (isUp ? `rgba(0, 194, 19, 0.5)` : `rgba(226, 14, 85, 0.5)`) : `rgba(118,118,118,0.4)`};

  ${({ theme }) => theme.breakPoints['480px']} {
    font-size: .75rem;
  }
`
