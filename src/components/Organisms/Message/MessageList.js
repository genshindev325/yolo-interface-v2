import React, { useEffect, useRef } from 'react'
import { MessageItem } from '.'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'

import 'react-perfect-scrollbar/dist/css/styles.css'

export const MessageList = ({ messages, address }) => {
  const scrollRef = useRef(null)
  const firstRenderRef = useRef(true)

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current && scrollRef.current._container) {
        let timesRun = 0
        let dh = (scrollRef.current._container.scrollHeight - scrollRef.current._container.scrollTop) / 20
        let interval = setInterval(function () {
          timesRun += 1
          if (timesRun === 5) {
            clearInterval(interval)
          }
          if (scrollRef.current) {
            scrollRef.current._container.scrollTop += dh
          }
        }, 30)
      }
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = false
    } else {
      scrollMessagesToBottom()
    }
  }, [messages])

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current && scrollRef.current._container) {
        scrollRef.current._container.scrollTop = scrollRef.current._container.scrollHeight
      }
    }
    scrollMessagesToBottom()
  }, [])

  return (
    <Container ref={scrollRef} id='perfectScroll'>
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          data={msg}
          isSelfMsg={msg.address === address}
          isNewMsg={index === 0 ? true : messages[index].username !== messages[index - 1].username}
        />
      ))}
    </Container>
  )
}

const Container = styled(PerfectScrollbar)`
  position: absolute;
  padding: 6%;
  width: 100%;
  ${({ theme }) => theme.breakPoints['2xl']} {
    padding: 6% 0;
  }
  ${({ theme }) => theme.breakPoints['xl']} {
    padding: 0 6%;
  }
  &:hover blockquote {
    color: rgba(255, 255, 255, 1.0);
  }
  .ps__rail-y:hover {
    background: transparent;
  }
`
