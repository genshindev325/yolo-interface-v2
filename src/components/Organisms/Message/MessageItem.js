import { icons } from 'common'
import { ThemeProvider } from 'styled-components'
import React from 'react'
import styled from 'styled-components'
import { formatTimeFromNow } from 'utils'

export const MessageItem = ({ data, isSelfMsg, isNewMsg }) => {
  const extendedTheme = (theme) => ({
    ...theme,
    isSelfMsg
  })

  return (
    <ThemeProvider theme={extendedTheme}>
      <Container>
        {isNewMsg && (
          <MsgTopWrap>
            <MsgName>{data.username}</MsgName>
          </MsgTopWrap>
        )}
        <MsgMidWrap>
          <IconWrapper>
            <SenderIcon />
          </IconWrapper>
          <MsgContent>
            <MsgQuote>{data.message}</MsgQuote>
          </MsgContent>
        </MsgMidWrap>
        <MsgBottomWrap>
          <MsgDate>{formatTimeFromNow(new Date(data.timestamp) / 1000)}</MsgDate>
        </MsgBottomWrap>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  ${({ theme }) => theme.breakPoints['xl']} {
    padding: 10px 0 5px 0;
  }
`
const MsgTopWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 0.8rem;
  padding: ${({ theme }) => (!theme.isSelfMsg ? '0 0 5px 40px' : '0 40px 5px 0')};
  justify-content: ${({ theme }) => (!theme.isSelfMsg ? 'flex-start' : 'flex-end')};
`
const MsgName = styled.div`
  color: ${({ theme }) => (!theme.isSelfMsg ? '#2a6dff' : '#fff')};
  font-weight: 700;
`
const MsgMidWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`
const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin: ${({ theme }) => (theme.isSelfMsg ? '0 0 -1px -5px' : '-1px -5px 0 0')};
  bottom: 4px;
  position: absolute;
  ${({ theme }) => (!theme.isSelfMsg ? 'left: 0;' : 'right: 0;')}
`
const SenderIcon = styled.div`
  background: rgba(0, 0, 0, 0.05) url(${({ theme }) => (theme.isSelfMsg ? icons.ChatYoloGrayIcon : icons.ChatYoloIcon)})
    center center / auto 20px no-repeat;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => (theme.isSelfMsg ? 'rgba(255, 255, 255, 0.4)' : 'rgba(42, 109, 255, 0.8)')};
  position: relative;
`
const MsgContent = styled.div`
  position: relative;
  display: flex;
  ${({ theme }) => (theme.isSelfMsg ? 'justify-content: flex-end' : '')};
  ${({ theme }) => (theme.isSelfMsg ? 'min-width: 100%' : '')};
`
const MsgQuote = styled.blockquote`
  border-radius: 20px;
  position: relative;
  margin: 0;
  max-width: 100%;
  padding: 12px 18px;
  color: rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
  box-shadow: 0px 0px 45px -1px rgba(23, 27, 34, 0.31);
  font-size: 0.75rem;

  ${({ theme }) => (!theme.isSelfMsg ? 'background-color: rgba(152, 183, 253, .1)' : 'background: rgba(0, 0, 0, .25)')};
  ${({ theme }) => (!theme.isSelfMsg ? 'margin-left: 40px' : 'margin-right: 40px')};
  ${({ theme }) => (!theme.isSelfMsg ? 'border-bottom-left-radius: 0' : 'border-bottom-right-radius: 0')};
  ${({ theme }) => (theme.isSelfMsg ? 'order: -1' : '')};
  ${({ theme }) => (theme.isSelfMsg ? 'text-align: right' : '')};
  webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);

  ${({ theme }) => (!theme.isSelfMsg ? '&::before' : '&::after')} {
    position: absolute;
    display: block;
    content: '';
    width: 0;
    height: 0;
    -webkit-mask: url(${({ theme }) => (!theme.isSelfMsg ? icons.MsgEndLeftIcon : icons.MsgEndRightIcon)}) no-repeat;
    background: ${({ theme }) => (!theme.isSelfMsg ? 'rgba(152,183,253,.1)' : 'rgba(0, 0, 0, .2)')};
    -webkit-mask-size: auto 22px;
    -webkit-mask-position: center center;
    width: 10px;
    height: 22px;
    ${({ theme }) => (!theme.isSelfMsg ? 'left: -10px' : 'right: -10px')};
    bottom: 0;
  }
`
const MsgBottomWrap = styled.div`
  display: flex;
  margin: 3px 0 0 0;
  position: relative;
  ${({ theme }) => (!theme.isSelfMsg ? 'margin-left: 55px;' : 'margin-right: 55px;')}
  justify-content: ${({ theme }) => (!theme.isSelfMsg ? 'flex-start' : 'flex-end')};
`
const MsgDate = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.6rem;
  color: #999;
`
