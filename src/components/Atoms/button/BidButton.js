import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'

const DirectionLabel = ['Up', 'Down']

export const BidButton = ({ color, isUp = false }) => {
  return (
    <Button color={color} isUp={isUp}>
      <ButtonText size='1.3'>
        Bid <strong>{DirectionLabel[isUp ? 0 : 1]}</strong>
      </ButtonText>
    </Button>
  )
}

const Button = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 10px;
  height: 60px;
  ${({ theme }) => theme.breakPoints['md']} {
    height: 40px;
  }
  width: 49%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;
  border: none;
  &:hover {
    background-color: ${({ color }) => color + '61'};
    &::before {
      background-color: ${({ color }) => color + '61'};
    }
    &::after {
      background-color: ${({ color }) => color + '61'};
    }
  }
  &::${({ isUp }) => (isUp ? `before` : `after`)} {
    content: '';
    background: ${({ color }) => color};
    ${({ theme }) => theme.breakPoints['md']} {
      width: 20px;
      height: 9px;
    }
    width: 30px;
    height: 12px;
    clip-path: polygon(${({ isUp }) => (isUp ? `50% 0, 0 100%, 100% 100%` : `0 0, 100% 0, 50% 100%`)});
    position: absolute;
    ${({ isUp }) => (isUp ? `top` : `bottom`)}: -12px;
    ${({ theme }) => theme.breakPoints['md']} {
      ${({ isUp }) => (isUp ? `top` : `bottom`)}: -8px;
    }
    right: calc(50% - 10px);
    transition: all 0.3s ease-in-out;
  }
`
const ButtonText = styled(Typography)`
  strong {
    font-weight: 600;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    font-size: 1rem;
  }
`
