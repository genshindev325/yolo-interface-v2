import React from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'

export const Tooltip = ({ className, container, children, ...rest }) => {
  return (
    <TooltipWrapper className={className}>
      {container ? container : <InfoBlocks masking></InfoBlocks>}
      <div className='bottom'>
        {children}
        <i></i>
      </div>
    </TooltipWrapper>
  )
}

const InfoBlocks = styled(IconLib).attrs({ collection: 'general', name: 'info' })`
  background: #797f8c;
  width: 14px;
  height: 14px;
  position: relative;
  margin: 0 0 0 5px;
  display: block;
  cursor: pointer;
`

const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
  color: white;
  & .bottom {
    top: 25px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(45px);
    backdrop-filter: blur(45px);
    border-radius: 8px;
    position: absolute;
    z-index: 9999999;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.8s;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
  }
  &:hover .bottom {
    visibility: visible;
    opacity: 1;
  }
  & .bottom i {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 12px;
    overflow: hidden;
  }
  & .bottom i::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;
    transform: translate(-50%, 50%) rotate(45deg);
    background: rgba(255, 255, 255, 0.1);
    display: none;
  }
`
