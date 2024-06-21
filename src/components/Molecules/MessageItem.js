import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { Typography } from 'components/Atoms/Typography'
import { useAuth } from 'contexts/auth/useAuth'
import { IconLib } from 'components/Organisms/IconLib'

const MessageItem = ({ body }) => {
  const {
    user: { id }
  } = useAuth()

  const theme = {
    isMe: body.id === 0
  }

  const MessageText = ({ children }) =>
    body.id === 0 ? <MsgTextMine>{children}</MsgTextMine> : <MsgText>{children}</MsgText>

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SenderName size='1.1' color='grey'>
          {body.name}
        </SenderName>
        <MsgArea>
          <Avatar>
            <IconLib dimension='30px' collection='general' name='ethereum' />
          </Avatar>
          {/* <Image src={body.img} /> */}
          <MessageText>
            <span></span>
            {body.msg}
          </MessageText>
        </MsgArea>
      </Container>
    </ThemeProvider>
  )
}

export default MessageItem

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

const MsgArea = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: ${({ theme: { isMe } }) => {
    return isMe ? 'flex-end' : 'flex-start'
  }};
`
const SenderName = styled(Typography)`
  text-align: ${({ theme: { isMe } }) => (isMe ? 'end !important' : '')};
`
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  order: ${({ theme: { isMe } }) => (isMe ? '2' : '1')};
`
const Avatar = styled.div`
  order: ${({ theme: { isMe } }) => (isMe ? '2' : '1')};
  g {
    fill: white;
  }
  border: 3px ${({ theme: { isMe } }) => (isMe ? '#244895' : '#172068')} solid;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  ${({ theme: { isMe } }) => isMe && 'background-color: #101798;'}
`
const MsgTextMine = styled.div`
  background-color: #101116;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  position: relative;
  border-bottom-right-radius: 0;
  margin-right: 10px;
  order: 1;
  span {
    display: block;
    position: absolute;
    left: 100%;
    bottom: 0;
    width: 15px;
    height: 15px;
    overflow: hidden;
    &:before {
      content: '';
      display: block;
      width: 200%;
      height: 200%;
      position: absolute;
      border-radius: 45%;
      bottom: 0;
      left: 0;
      box-shadow: -10px 10px 0 0 #101116;
    }
  }
`
const MsgText = styled.div`
  background-color: #3e4248;
  margin-left: 10px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  position: relative;
  border-bottom-left-radius: 0;
  order: 2;
  span {
    display: block;
    position: absolute;
    right: 100%;
    bottom: 0;
    width: 15px;
    height: 15px;
    overflow: hidden;
    &:before {
      content: '';
      display: block;
      width: 200%;
      height: 200%;
      position: absolute;
      border-radius: 45%;
      bottom: 0;
      right: 0;
      box-shadow: 10px 10px 0 0 #3e4248;
    }
  }
`
