import styled from 'styled-components'
import { icons } from 'common'
import { Typography } from 'components/Atoms/Typography'
import { Link } from 'components/Atoms/Link'

export const LitePaper = () => {
  return (
    <LightPaperLink href='docs/YOLOrekt-LitePaper.pdf' target='blank'>
      <LightPaperIcon />
      <Typography variant='caption' size='0.8'>
        LitePaper
      </Typography>
    </LightPaperLink>
  )
}

const LightPaperLink = styled(Link)`
  display: flex;
  color: ${({ theme }) => theme.themeColors.textPrimary};
  text-decoration: none;
  position: relative;
  z-index: 3;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 10px 15px;
  white-space: nowrap;
  cursor: pointer;
  height: 38px;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`
const LightPaperIcon = styled.div`
  background: url(${icons.LightPaperIcon}) center center / 18px auto no-repeat;
  width: 18px;
  height: 18px;
  margin: 0 7px 0 0;
`
