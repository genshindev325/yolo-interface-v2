import { useEffect, useState, useContext } from 'react'
import { formattedSeconds } from 'utils'
import styled from 'styled-components'
import { Typography } from 'components/Atoms/Typography'

const Timer = ({ time }) => {
  const [ms, setMs] = useState(time * 1000)
  useEffect(() => {
    const timer = setInterval(() => {
      if (ms > 0) {
        setMs(ms - 1)
      } else {
        clearInterval(timer)
      }
    }, 1)

    return () => {
      clearInterval(timer)
    }
  }, [ms])

  return (
    <TimerArea>
      <Typography variant='caption' size='1.2' weight='600' color='primary'>
        BIDDING PHASE
      </Typography>
      <Typography variant='title' size='3.1'>
        {formattedSeconds(ms)}
      </Typography>
      <Typography variant='text' size='0.9'>
        seconds remaining
      </Typography>
    </TimerArea>
  )
}

export default Timer

const TimerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 0 0;
  h5 {
    margin-bottom: 10px;
  }
  ${({ theme }) => theme.breakPoints['md']} {
    margin: 63px 0 0 0;
  }
`
