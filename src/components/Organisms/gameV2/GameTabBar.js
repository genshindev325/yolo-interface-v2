import { icons } from 'common'
import { Typography } from 'components/Atoms/Typography'
import styled from 'styled-components'

export const GameTabBar = ({ tabIndex, onChangeTab, newMsgs = 3 }) => {
  return (
    <Container id='GameTabBar'>
      <TabItem
        activated={tabIndex === 0}
        onClick={() => onChangeTab(0)}
        src={icons.LiveGameIcon}
        iconSrc={icons.LiveGameHoverIcon}
      >
        <div />
        <Typography variant='caption' size='0.7' color='grey' weight='600'>
          ROUNDS
        </Typography>
      </TabItem>
      <TabItem
        activated={tabIndex === 1}
        onClick={() => onChangeTab(1)}
        src={icons.ChatIcon}
        iconSrc={icons.ChatHoverIcon}
      >
        <div />
        <Typography variant='caption' size='0.7' color='grey' weight='600'>
          CHAT
        </Typography>
      </TabItem>
      <TabItem activated={tabIndex === 2} onClick={() => onChangeTab(2)} iconSrc={icons.LiveStatsHoverIcon}>
        <div />
        <Typography size='0.7' variant='caption' color='grey' weight='600'>
          LIVE STATS
        </Typography>
      </TabItem>
    </Container>
  )
}

const Container = styled.div`
  display: none;
  width: 100vw;
  padding: 0 15px;
  align-items: center;
  ${({ theme }) => theme.breakPoints['xl']} {
    justify-content: space-between;
    display: flex;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`
const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 33.33%;
  height: 60px;
  filter: grayscale(${({ activated }) => (activated ? 0 : '100%')});
  transition: all 0.2s ease-in;
  div {
    background: url(${({ iconSrc }) => iconSrc}) center center / auto 26px no-repeat;
    width: 26px;
    height: 26px;
    ${({ theme }) => theme.breakPoints['xs']} {
      background: url(${({ iconSrc }) => iconSrc}) center center / auto 22px no-repeat;
      width: 22px;
      height: 22px;
    }
  }
  h5 {
    color: ${({ theme }) => theme.themeColors.primary};
    margin-top: 10px;
    ${({ theme }) => theme.breakPoints['xs']} {
      margin: 5px 0 0 0;
    }
  }
`
