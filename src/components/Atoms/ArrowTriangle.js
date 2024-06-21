import React from 'react'
import styled from 'styled-components'

export const ArrowTriangle = ({ direction = 'up' }) => {
  if (direction === 'up') return <ArrowUp />
  if (direction === 'down') return <ArrowDown />
}

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #9b0030 transparent transparent transparent;
  margin-right: 3px;
`
const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5px 5px 5px;
  border-color: transparent transparent #01a812 transparent;
  margin-right: 3px;
`
