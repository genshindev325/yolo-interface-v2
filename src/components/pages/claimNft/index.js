import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { formatTimeStamp } from 'utils'
import { LOCAL_WALLET_ID } from 'utils/constants'
import { useLocalStorage } from 'utils/hooks'
import { getWaitingListData } from 'datasource/claimNft'

import { notificationActions, reduxWalletActions } from 'redux/actions'
import { selectClaimExpirationTime, selectWalletConnectionState } from 'redux/selectors'

import { HomeLayout } from 'components/Layouts/home'
import { Table } from 'components/Molecules/Table'

export const ClaimNftPage = () => {
  const columns = [
    { id: 'item', caption: '', dataType: 'number' },
    { id: 'address', caption: 'Address', dataType: 'string' },
    {
      id: 'expiration',
      caption: 'Expiration',
      dataType: 'date',
      formatter: (timestamp) => formatTimeStamp(timestamp * 1000, 'MM/DD/YYYY')
    }
  ]
  const dispatch = useDispatch()
  const claimExpirationTime = useSelector(selectClaimExpirationTime())
  const isConnected = useSelector(selectWalletConnectionState())

  const [sortBy, setSortBy] = useState({ fieldId: columns[0].id, isSortUp: false })
  const [waitingListData, setWaitingListData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const claimNft = useCallback(() => {
    dispatch(reduxWalletActions.claimNFT())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTableData = useCallback(async () => {
    const data = await getWaitingListData().catch((err) => {
      if (err.code === '4003' || err.code === '4002') {
        console.error(`ERROR: "fetchTableData" fails: ${err}`)
        const errorToastObj = {
          show: true,
          id: 'error',
          props: {
            title: 'Fetching data fails'
          }
        }
        dispatch(notificationActions.updateToast(errorToastObj))
      }
    })
    setWaitingListData(data || [])
    setFilteredData(data || [])
  }, [isConnected])

  const onFilterInputChange = (e) => {
    const value = e.target.value
    const filteredData = waitingListData.filter((row) => row.address.includes(value))
    setFilteredData(filteredData)
  }

  useEffect(() => {
    if (isConnected) {
      fetchTableData()
    }
  }, [isConnected, fetchTableData])

  const [LUWID] = useLocalStorage(LOCAL_WALLET_ID)
  useEffect(() => {
    dispatch(reduxWalletActions.connectWallet({ walletProviderId: LUWID?.walletProviderId, fullConnection: false }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeLayout>
      <Content id='content'>
        <Heading>NFT Eligibility</Heading>
        <MenuWrapper>
          <FilterField>
            <InputWrapper>
              <Input placeholder='Filter' onChange={onFilterInputChange} />
            </InputWrapper>
          </FilterField>
          {!!claimExpirationTime && <ClaimBtn onClick={claimNft}>Claim</ClaimBtn>}
        </MenuWrapper>
        <Table sortBy={sortBy} columns={columns} data={filteredData} onSort={setSortBy} />
      </Content>
    </HomeLayout>
  )
}

const Content = styled.div`
  position: relative;
  padding: 30px 30px;
  width: 100%;
  margin: 0 auto;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`
const Heading = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 0 30px 0;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 0 15px 0;
`
const FilterField = styled.div`
  border-radius: 10px;
  margin: 0 0 0 5px;
`
const InputWrapper = styled.div`
  display: grid;
  grid-template-areas: 'select';
  align-items: flex-start;
  position: relative;
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  margin: 0 0 0 0;
  justify-content: flex-start;
`
const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;
  outline: none;
  color: #fff;
  position: relative;
  padding: 6px 30px 6px 15px;
  border-radius: 10px;
`
const ClaimBtn = styled.button`
  outline: none;
  background: transparent;
  text-decoration: none;
  cursor: pointer !important;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 160%;
  background: linear-gradient(0deg, rgba(29, 75, 175, 1) 0%, rgba(42, 109, 255, 1) 100%);
  padding: 12px 16px;
  border-radius: 14px;
  line-height: 100%;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  &:hover {
    background: #2a6dff;
  }
  &:disabled {
    cursor: not-allowed !important;
    background: rgba(30, 33, 41, 1);
  }
`
