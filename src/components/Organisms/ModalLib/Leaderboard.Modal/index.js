import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { notificationActions } from 'redux/actions'
import { getUsername } from 'datasource/crypto/contracts'

import { ModalOverlay } from 'components/Atoms/ModalOverlay'
import { IconLib } from 'components/Atoms/IconLib'
import { Dropdown } from 'components/Atoms/Dropdown'
import { Table } from 'components/Molecules/Table'

import { getLeaderTableData } from 'datasource/leaderboard'

const columns = [
  { id: 'ranking', caption: 'Ranking' },
  { id: 'userId', caption: 'User ID' },
  { id: 'totalBids', caption: 'Total Bids' },
  { id: 'totalYoloEarned', caption: 'Total YOLO Earned' },
  { id: 'totalGamesWon', caption: 'Total Games' },
  { id: 'winningPercent', caption: 'Winning %', formatter: (data) => `${(data * 100).toFixed(2)}%` }
]

export const LeaderboardModal = ({ closeModal }) => {
  const [sortBy, setSortBy] = useState({ fieldId: columns[0].id, isSortUp: false })
  const [leaderTableData, setLeaderTableData] = useState([])

  const dispatch = useDispatch()

  const walletSelectorObj = {
    // this component will receive `closeModal` prop to close programmatically the modal
    show: true,
    id: 'walletSelector',
    backdropClose: false
  }

  const fetchTableData = useCallback(async () => {
    const data = await getLeaderTableData().catch((err) => {
      //TODO: Toast or other notification on error should be here
      if (err.code === 4001) {
        console.error(`ERROR: "fetchTableData" fails: ${err}`)
        dispatch(notificationActions.updateModal(walletSelectorObj))
      }
    })
    setLeaderTableData(data || [])
  }, [])

  useEffect(() => {
    fetchTableData()
  }, [sortBy])

  return (
    <ModalOverlay>
      <Modal id='leaderboard_modal'>
        <CloseButton id='close' collection='general' name='closeOutline' masking onClick={closeModal} />
        <h1>Leaderboard</h1>
        <LeaderWrapper id='leaderboard_wrapper'>
          <LeaderDropdown id='dashboard_menus_wrapper' label="Sort by" options={columns} onChange={setSortBy} value={sortBy} />
          <Table sortBy={sortBy} columns={columns} data={leaderTableData} onSort={setSortBy} />
        </LeaderWrapper>
      </Modal>
    </ModalOverlay>
  )
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: calc(100vh - 6rem);
  overflow-y: hidden;
  border-radius: 10px;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.7rem;
    position: fixed;
    left: 0;
    top: -1rem;
    width: 100%;
    text-align: center;
    margin: 1rem 0;
    font-weight: 400;
    letter-spacing: 0.1px;
  }
  ${({ theme }) => theme.breakPoints['1024px']} {
    height: calc(100vh - 3rem);
  }
`
const CloseButton = styled(IconLib)`
  cursor: pointer;
  color: #fff;
  font-size: 1.4rem;
  line-height: 100%;
  position: fixed;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 45px;
  text-align: center;
  text-decoration: none;
  top: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 1);
  ${({ theme }) => theme.breakPoints['1024px']} {
    left: 1rem;
  }
`
const LeaderWrapper = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  width: 80vw;
  height: calc(100vh - 12rem);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 28px 0 0 0;
  //margin: 6rem 0;
  ${({ theme }) => theme.breakPoints['1024px']} {
    padding: 5px 0 0 0;
    height: 100vh;
    margin: 0;
    top: 5rem;
    width: 90vw;
  }
`

const LeaderDropdown = styled(Dropdown)`
  display: none;
  ${({ theme }) => theme.breakPoints['1024px']} {
    display: flex;
  }
`;
