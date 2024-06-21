import styled from 'styled-components'

export const SharedBlur = styled.div`
  position: absolute;
  -webkit-filter: blur(80px);
  filter: blur(80px);
  width: 200px;
  height: 100px;
  z-index: 8;
  content: '';
  border-radius: 50%;
`
