import styled from 'styled-components'

const ToggleButton = ({ status, switchStatus, bgColor, color }) => {
  return (
    <Wrapper onClick={switchStatus} bgColor={bgColor}>
      <Button>
        Bet <strong>Up</strong>
      </Button>
      <Button>
        Bet <strong>Down</strong>
      </Button>
      <Toggler status={status} color={color} />
    </Wrapper>
  )
}

export default ToggleButton

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  background-color: ${({ bgColor }) => bgColor ?? '#464647'};
  border-radius: 10px;
  position: relative;
  z-index: 0;
`
const Toggler = styled.div`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  background: ${({ color }) => color ?? '#282728'};
  border-radius: 10px;
  width: 50%;
  height: 100%;
  transform: translateX(${(props) => (props.status ? 0 : '100%')});
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  flex: 1 50%;
  max-width: 50%;
  font-size: 1rem;
  height: 100%;
  background: none;
  border: none;
  color: ${({ theme }) => theme.themeColors.white};
  outline: none;
  cursor: pointer;
  z-index: 1;
  &:focus {
    outline: none;
  }
  strong {
    font-weight: bold;
    margin-left: 5px;
  }
`
