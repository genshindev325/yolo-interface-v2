import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0 10px;
`
export const InProgressWrapper = styled.div`
  border: 0;
  box-sizing: border-box;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  height: 69px;
  ${({ theme }) => theme.breakPoints['2xl']} {
    order: -1;
    flex: 1 0 100%;
    flex-wrap: wrap;
    margin: 0 0 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 5px 0 10px 0;
    border-radius: 0;
  }
  span {
    ${({ theme }) => theme.breakPoints['xs']} {
      font-size: 0.9rem;
    }
  }
`
export const BidArea = styled.div`
  display: flex;
  align-items: center;
  span {
    opacity: 0.6;
  }
  .balance {
    display: flex;
    align-items: center;
    margin: 0 15px;
  }
`
export const BidAmount = styled(Typography)`
  padding: 5px 0 0 0;
  color: ${({ theme, direction, amount }) =>
    !amount
      ? theme.themeColors.textPrimary
      : direction === 'up'
      ? theme.themeColors.lightGreen
      : theme.themeColors.jamRed};
  ${({ theme }) => theme.breakPoints['xs']} {
    font-size: 1.3rem;
  }
`
export const ArrowIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'arrow',
  dimension: '18px'
})`
  fill: ${({ theme, direction }) => (direction === 'up' ? theme.themeColors.lightGreen : theme.themeColors.jamRed)};
`
export const BidStatus = styled.div`
  display: flex;
  flex-direction: row;
  visibility: ${({ hasNoBids }) => (hasNoBids ? 'hidden' : 'visible')};
`
