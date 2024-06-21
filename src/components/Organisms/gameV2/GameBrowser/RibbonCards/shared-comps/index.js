import styled from 'styled-components'

export const Amount = styled.div`
  font-size: .7rem;
  font-weight: 600;
  line-height: 100%;
  padding: 2px 0 0 0;
`
export const RibbonCardBase = styled.div.attrs((props) => ({ id: 'ribbonCardBase' }))`
  min-width: 300px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  display: flex;
  border-radius: 10px;
  margin: 0 2px;
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(255, 255, 255, .05);
  cursor: pointer;
  height: 38px;
  position: relative;
  font-size: .75rem;
  font-weight: 300;
  opacity: .4;

  ${({ theme }) => theme.breakPoints['1200px']} {
    opacity: .75;
  }
`
export const GameStatus = styled.div`
  justify-content: center;
  flex-direction: column;
  text-align: center;
  line-height: 100%;
  align-items: center;
  display: flex;

  & strong {
    font-size: .6rem;
    color: rgba(255, 255, 255, .6);
    margin-left: 8px;
    line-height: 120%;
    white-space: nowrap;
  }
`
export const DataWrap = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`