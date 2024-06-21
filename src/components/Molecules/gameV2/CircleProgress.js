import React, { useMemo } from 'react'
import styled from 'styled-components'

export const CircleProgress = ({ completed = 0 }) => {
  const values = useMemo(() => {
    const values = [-45, 135, 1] // => [leftDegree, rightDegree, opacity]
    if (completed <= 50) {
      values[0] += (completed * 180) / 50
    } else {
      values[0] = 135
      values[1] += ((completed - 50) * 180) / 50
      values[2] -= ((completed - 50) * 0.75) / 50
    }

    return values
  }, [completed])

  return (
    <>
      <Progress values={values}>
        <span className='left'></span>
      </Progress>
      <Progress values={values}>
        <span className='right'></span>
      </Progress>
    </>
  )
}

const Progress = styled.div`
  margin: 0;
  padding: 0;
  float: left;
  background: transparent;
  height: 100%;
  width: 50%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  span {
    display: block;
    width: 200%;
    height: 100%;
    box-sizing: border-box;
    float: left;
    background: #2a6dff;
    border: 6px solid #1e2535;
    border-radius: 200%;
    border-left-color: transparent;
    border-top-color: transparent;
    position: absolute;
    z-index: 2;
  }
  .left {
    transform: rotate(${({ values }) => values[1]}deg);
    opacity: ${({ values }) => values[2]};
  }
  .right {
    margin-left: -100%;
    transform: rotate(${({ values }) => values[0]}deg);
    opacity: ${({ values }) => values[2]};
  }
`
