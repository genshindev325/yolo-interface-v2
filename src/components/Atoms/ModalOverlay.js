import styled from 'styled-components'

export const ModalOverlay = styled.div.attrs((props) => ({
  id: 'modalOverlay'
}))`
  position: relative;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  height: 100vh;
  width: 100vw;
  &:before {
    position: absolute;
    background: rgba(42, 109, 255, 0.2);
    filter: blur(350px);
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
    content: '';
    border-radius: 50%;
  }
`
