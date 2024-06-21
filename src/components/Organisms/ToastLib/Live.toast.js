import styled from 'styled-components'

import { Typography } from 'components/Atoms/Typography'
import { IconLib } from 'components/Atoms/IconLib'

export const LiveToast = ({ closeToast, liveRoundIndex }) => {
  const endedRoundIndex = liveRoundIndex - 1

  return (
    <Container>
      <ToastIcon collection='yolorekt' name='liveText' />
      <MsgContent>
        <MsgTitle>{`Round ${endedRoundIndex} has ended`}</MsgTitle>
        <Action>{`The LIVE Round ${liveRoundIndex} is now starting`}</Action>
      </MsgContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
`

const ToastIcon = styled(IconLib)`
  width: 15%;
  height: 40px;
  margin: 0 15px 0 0;
`
const MsgContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 85%;
  white-space: break-spaces;
  strong {
    font-weight: 800;
  }
`
const MsgTitle = styled(Typography)`
  font-weight: 600;
  margin: 0 5px 0 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  align-items: center;
`
const Action = styled(Typography)`
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 120%;
`
