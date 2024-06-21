import React from 'react'
import styled from 'styled-components'

import { countries } from 'datasource/restrict'

import { HomeLayout } from 'components/Layouts/home'
import { Typography } from 'components/Atoms/Typography'

export const RestrictPage = () => {
  return (
    <HomeLayout>
      <RestrictedLocation id='restricted_locations'>
        <Title>Restricted Locations</Title>
        <Paragraph size='0.8' weight='400' id='description'>
          Persons that are located in or are a legal resident of the United States, or any region(s) on the following
          list, are not eligible to participate in any of the currency transactions on YOLOrekt.
        </Paragraph>
        {countries.map((item, index) => (
          <Paragraph key={index}>{item}</Paragraph>
        ))}
        <Paragraph weight='400' id='contact'>
          For more information, please{' '}
          <a href='mailto:support@yolorekt.com' data-nsfw-filter-status='swf'>
            contact us
          </a>
          .
        </Paragraph>
      </RestrictedLocation>
    </HomeLayout>
  )
}

const RestrictedLocation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0 0 0;
`
const Title = styled(Typography)`
  font-weight: 400;
  font-size: 2rem;
  text-align: center;
  letter-spacing: -0.03em;
  z-index: 1;
  padding: 0 15px 5px 15px;
  line-height: 105%;
  white-space: nowrap;
`
const Paragraph = styled(Typography)`
  text-align: center;
`

/* span {
    margin: 0 15%;
  }
  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 30px auto;
    list-style: none;
    li {
      text-align: center;
      font-weight: 600;
      font-size: 1.1rem;
    }
  } */
