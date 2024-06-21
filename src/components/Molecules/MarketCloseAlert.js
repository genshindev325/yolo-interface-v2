import React from 'react'
import styled from 'styled-components'

import { IconLib } from 'components/Atoms/IconLib'
import { Typography } from 'components/Atoms/Typography'

export const MarketCloseAlert = React.memo(({ assetName, openTimeUtc, closeTimeUtc }) => {
  return (
    <AlertWrapper>
      <ModalPad>
        <AlertIcon />
        <ModalTitle> Markets are currently closed</ModalTitle>
        <ModalParagrah>
          {`${assetName} market hours are ${openTimeUtc} - ${closeTimeUtc} form Monday to Friday. Please return when they're open.`}
        </ModalParagrah>
      </ModalPad>
    </AlertWrapper>
  )
})

const AlertWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 55vw;
  height: 100%;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2em;
  font-weight: 800;
  flex-direction: column;
`
const ModalPad = styled.div`
  position: relative;
  width: 320px;
  border-radius: 20px;
  //transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  &:after {
    width: 100%;
    height: 100%;
    background: rgba(42, 109, 255, 0.2);
    -webkit-filter: blur(50px);
    z-index: -1;
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 480px) {
    padding: 20px;
    display: flex;
    min-width: 300px;
  }
`
const AlertIcon = styled(IconLib).attrs({
  collection: 'general',
  name: 'error',
  masking: true
})`
  width: 46px;
  height: 46px;
  margin: 0 0 10px 0;
`

const ModalTitle = styled(Typography)`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  line-height: 120%;
`
const ModalParagrah = styled(Typography)`
  text-align: center;
  font-size: 0.9rem;
  padding: 5px 0 0 0;
`
