import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'

const DirectionLabel = ['up', 'down']

export const PredictButton = ({ disabled, color, isUp = false, onClick, className }) => {
  return (
    <Button isUp={isUp} onClick={(e) => !disabled && onClick(e)} className={className} disabled={disabled}>
      <ButtonText size='1.1' weight='500' spacing='-.01'>
        Bid {DirectionLabel[isUp ? 0 : 1]}
      </ButtonText>
    </Button>
  )
}

const Button = styled.button`
  background: ${({ isUp }) =>
    isUp
      ? `linear-gradient(
        0deg, rgba(0,135,13,1) 0%, rgba(1,168,17,1) 100%)`
      : `linear-gradient(
  0deg, rgba(175,11,66,1) 0%, rgba(226,14,85,1) 100%)`};
  border-radius: ${({ isUp }) => isUp? `0px 10px 10px 0px` : `10px 0px 0px 10px`};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.4 : '')};
  ${({ theme }) => theme.breakPoints['md']} {
    height: 40px;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    height: auto;
  }
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  position: relative;
  border: none;

  .arrowTriangle {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${({ isUp }) => (isUp ? '0 13px 8px 13px' : `8px 13px 0 13px`)};
    border-color: ${({ isUp }) => (isUp ? 'rgba(0,135,13,1)' : 'rgba(147,16,62,1)')} transparent;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    ${({ isUp }) => (isUp ? 'top: -8px;' : `bottom: -8px;`)}
  }
`
const ButtonText = styled(Typography)`
  ${({ theme }) => theme.breakPoints['md']} {
    font-size: 1rem;
  }
`
