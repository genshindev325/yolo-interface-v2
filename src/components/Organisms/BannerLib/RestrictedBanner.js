import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectWaitListInfo } from 'redux/selectors'

export const RestrictedBanner = ({ closeBanner }) => {
  const history = useHistory()
  const waitlistInfo = useSelector(selectWaitListInfo())

  const redirectOnClick = () => {
    history.push('/claim-nft')
    closeBanner()
  }

  return (
    <RBWrapper id='restrictedBanner'>
      <p>
        Persons that are located in or are a legal resident of the United States, or any region(s) on the following
        list, are not eligible to participate in any of the currency transactions on YOLOrekt.{' '}
        <a href='restricted'>Learn more</a>
      </p>
    </RBWrapper>
  )
}

const RBWrapper = styled.div`
  position: relative;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	min-width: 320px;
	width: 100%;
	background: rgba(0,0,0,.3);
	padding: 10px 30px;
	z-index: 10;
	font-size: .75rem;
	}
`
