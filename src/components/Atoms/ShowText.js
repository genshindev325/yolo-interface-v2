import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { IconLib } from 'components/Atoms/IconLib'

import { doCopy, getThreeDotHashEnd } from 'utils'

export const ShowText = ({ text, className }) => {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const onCopy = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    const copied = await doCopy(text)

    if (copied) setHasCopied(true)
  }

  return (
    <Container className={className} onClick={onCopy}>
      <Text>{text}</Text>
      <CopyIcon collection='general' name={hasCopied ? 'tick' : 'copy'} masking />
    </Container>
  )
}

const Container = styled.div`
  padding: 10px 14px;
  background: rgba(0, 0, 0, .2);
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 0 5px;
`
const CopyIcon = styled(IconLib).attrs({ dimension: '16px' })`
  margin: 0 0 0 10px;
`

const Text = styled.span`
  font-size: .8rem;
  white-space: nowrap;
  flex-direction: row;
  text-overflow: ellipsis;
  width: 274px;
  overflow: hidden;
  display: block !important;
`
