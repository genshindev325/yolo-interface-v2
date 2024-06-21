import { useState, useRef, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import { config } from 'config'
import { icons } from 'common'
import { getThreeDotAddress } from 'utils'

import { selectWalletConnectionState, selectWalletAddress, selectUsername, selectWalletHasNFT } from 'redux/selectors'

import { getUsername } from 'datasource/crypto/contracts'

// import { useDraggable } from 'utils/hooks/useDraggable'
import { MessageList } from '.'

const { CHAT_SOCKET, CHAT_API } = config

const ws = new WebSocket(CHAT_SOCKET)

export const ChatWindow = () => {
  const isConnected = useSelector(selectWalletConnectionState())
  const address = useSelector(selectWalletAddress())
  const walletUsername = useSelector(selectUsername())

  const [msgs, setMsgs] = useState([])
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [isUsernamesFetched, setIsUsernamesFetched] = useState(false)
  const [myUsername, setMyUsername] = useState(walletUsername)

  const windowRef = useRef(null)
  // const moverRef = useRef(null)

  useEffect(() => {
    ws.onopen = () => {
      console.log('chat webSocket connected')
    }

    ws.onmessage = (evt) => {
      const onSendMessage = async () => {
        const receivedMsg = JSON.parse(evt.data)
        if (Object.keys(receivedMsg).length) {
          setNewMessage(receivedMsg)
        }
      }
      onSendMessage()
    }

    ws.onclose = () => {
      console.log('chat socket disconnected')
    }

    return () => ws.close()
  }, [])

  const onSendMsg = () => {
    if (message === '' || address === '') return
    const messageObj = {
      action: 'sendmessage',
      data: { address, message, timestamp: new Date().toISOString() }
    }
    const newMsg = {
      ...messageObj.data,
      username: walletUsername
    }
    setMsgs((prev) => [...prev, newMsg])
    setMessage('')
    ws.send(JSON.stringify(messageObj))
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      onSendMsg()
    }
  }

  useEffect(() => {
    const getMessage = async () => {
      const res = await axios.get(`${CHAT_API}/messages?count=30`)
      const datas = res.data

      if (datas.length !== 0) {
        const sortedArray = datas
          .map((data) => {
            return {
              ...data,
              username: getThreeDotAddress(data.address)
            }
          })
          .sort(function (a, b) {
            return new Date(a.timestamp) - new Date(b.timestamp)
          })
        setMsgs(sortedArray)
      }
    }

    getMessage()
  }, [])

  useEffect(() => {
    if (!isUsernamesFetched) {
      if (isConnected && msgs.length) {
        setIsUsernamesFetched(true)

        const getSetUsernames = async () => {
          const usernamesResponse = await Promise.all(msgs.map((data) => getUsername(data.address)))

          const processedMsgs = usernamesResponse.map((username, index) => {
            const msg = msgs[index]
            return {
              ...msg,
              username: username === '' ? getThreeDotAddress(msg.address) : username
            }
          })

          setMsgs(processedMsgs)
        }

        getSetUsernames()
      }
    }
  }, [isConnected, msgs, isUsernamesFetched])

  useEffect(() => {
    const addNewMsg = async () => {
      if (newMessage === null || newMessage.address === address) {
        return
      }
      const username = await getUsername(newMessage.address)

      const newMsg = {
        ...newMessage,
        username: username === '' ? getThreeDotAddress(newMessage.address) : username
      }

      setMsgs((prev) => [...prev, newMsg])
    }

    addNewMsg()
  }, [newMessage, address])

  useEffect(() => {
    // first check is important to prevent extra render on load and subsequent weird scroll bounce in MessageList
    if (!myUsername && walletUsername) {
      setMyUsername(walletUsername)
    } else if (
      isUsernamesFetched &&
      walletUsername &&
      myUsername &&
      walletUsername !== myUsername &&
      msgs.length &&
      address
    ) {
      setMyUsername(walletUsername)
      console.log('username effect hit gv')

      const updateMyUsername = async () => {
        const processedMsgs = msgs.map((msg) => {
          let pMsg

          if (msg.address !== address) {
            pMsg = msg
          } else {
            pMsg = {
              ...msg,
              username: walletUsername
            }
          }

          return pMsg
        })

        setMsgs(processedMsgs)
      }

      updateMyUsername()
    }
  }, [walletUsername, msgs, address, myUsername])

  return (
    <Container ref={windowRef}>
      {useMemo(
        () => (
          <MessageContent>{!!msgs.length && <MessageList messages={msgs} address={address} />}</MessageContent>
        ),
        [msgs.length, address]
      )}
      <Composer>
        <ComposerIconWrapper>
          <SenderIcon></SenderIcon>
        </ComposerIconWrapper>
        <ComposerArea>
          <textarea
            placeholder='Send a message'
            maxLength='100'
            value={message}
            onKeyDown={onEnterPress}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!address}
          />
        </ComposerArea>
        <SendButton onClick={onSendMsg} disabled={!address} />
      </Composer>
    </Container>
  )
}

const Container = styled.div`
  min-width: 250px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: transparent;
  border-radius: 10px;
  left: 0;
  position: relative;
  align-items: center;
  flex-direction: column;

  &:before {
    position: absolute;
    top: calc(50% + 7px);
    left: 0;
    background: linear-gradient(90deg, rgba(32, 37, 47, 0.8) 0%, rgba(32, 37, 47, 0.1) 100%);
    transform: translateY(-50%);
    content: '';
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  ${({ theme }) => theme.breakPoints['xl']} {
    max-width: 100vw;
    width: 100vw;
    margin: 0;
    border-radius: 0;
    overflow-x: hidden;
    top: 15px;

    &:before {
      display: none;
    }
  }
`
const MessageContent = styled.div`
  position: relative;
  overflow: auto;
  flex: 1;
  min-width: 100%;
  max-width: 100%;
  ${({ theme }) => theme.breakPoints['xl']} {
    width: 100%;
    padding-bottom: 70px;
  }
  ${({ theme }) => theme.breakPoints['xs']} {
    padding-bottom: 10px;
  }
`
const Composer = styled.div`
  padding: 20px;
  bottom: 0;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
const ComposerArea = styled.div`
  width: calc(100% - 56px);
  padding: 0 10px 0 8px;
  position: relative;

  & textarea {
    border: 1px solid rgba(42, 109, 255, 0.5);
    border-radius: 20px;
    overflow: hidden;
    color: #fff;
    padding: 12px 18px;
    resize: none;
    font-size: 0.8rem;
    height: 60px;
    outline: none;
    background: transparent;
    width: 100%;
    z-index: 9;

    ${({ theme }) => theme.breakPoints['xl']} {
      width: 100%;
    }
  }

  & textarea:focus {
    border: 1px solid rgba(42, 109, 255, 1);
  }

  ${({ theme }) => theme.breakPoints['xl']} {
    width: 100%;
    display: flex;
    align-items: center;
  }
`
const ComposerIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin: '0 0 -1px -5px';
`
const SendButton = styled.button`
  background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  cursor: pointer;
  position: relative;

  &:hover {
    background: rgba(42, 109, 255, 1);
  }

  &::before {
    -webkit-mask: url(${icons.ArrowUpIcon}) center center / auto 12px no-repeat;
    background: #fff;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    left: calc(50% + 1px);
    transform: translate(-50%, -50%) rotate(90deg);
    z-index: 9;
    content: '';
  }
`
const SenderIcon = styled.div`
  background: rgba(0, 0, 0, 0.05) url(${icons.ChatYoloIcon}) center center / auto 20px no-repeat;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(42, 109, 255, 0.8);
  position: relative;
`
