import React from 'react'
import styled from 'styled-components'

import { Link } from 'components/Atoms/Link'
import { IconLib } from 'components/Atoms/IconLib'

const ModalHeader = styled.strong`
  font-weight: 600;
  display: block;
  font-size: 1.3rem;
  padding: 0 0 15px 0;
`
const BrowserIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0 0 0;
`

export const InstallMetamaskModal = () => {
  return (
    <>
      <ModalHeader>Metamask plugin not found</ModalHeader>
      Please install or activate
      <Link variant='simple' href='https://metamask.io/download.html' target='_blank'>
        Metamask
      </Link>
      and reload
      <BrowserIconsContainer>
        <Link href='https://metamask.io/download.html' target='_blank'>
          <IconLib collection='brands' name='metamask' dimension='50px' />
        </Link>
      </BrowserIconsContainer>
    </>
  )
}
