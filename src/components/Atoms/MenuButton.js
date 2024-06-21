import { useState } from 'react'
import styled from 'styled-components'

const MenuButton = () => {
  const [clicked, setClicked] = useState(false)

  return (
    <Wrapper clicked={clicked} onClick={() => setClicked(!clicked)}>
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  )
}

export default MenuButton

const Wrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  span {
    display: block;
    width: 26px;
    height: 3px;
    background-color: ${({ theme }) => theme.themeColors.white};
    margin: 4px 0;
    transition: 0.4s;
    border-radius: 20%;
    transition: all 0.3s ease-in;
    transform-origin: top center;

    &:first-child {
      transform: ${(props) => (props.clicked ? 'rotate(-45deg) translate(-4px, 4px);' : null)};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.clicked ? '0' : '1')};
    }

    &:last-child {
      transform: ${(props) => (props.clicked ? 'rotate(45deg) translate(-4px, -7px);' : null)};
    }
  }
`
