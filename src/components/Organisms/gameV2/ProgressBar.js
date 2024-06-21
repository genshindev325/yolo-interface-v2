import styled from 'styled-components'

export const ProgressBar = ({ progress = 30 }) => {
  return (
    <Container>
      <Filler progress={progress} />
    </Container>
  )
}

const Container = styled.div`
  height: 3px;
  width: 100%;
  background-color: #2b3337;
  margin-bottom: 5px;
  border-radius: 3px;
`
const Filler = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: #2a61d7;
  border-radius: 3px;
  text-align: right;
`
