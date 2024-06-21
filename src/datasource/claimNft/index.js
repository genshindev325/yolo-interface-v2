import axios from 'axios'

import { config } from 'config'
import { Exception } from 'utils'

import { getClaimExpirationTime } from 'datasource/crypto/contracts'

const yoloApiBaseUrl = config.YOLO_API_BASE_URL

const fetchDataFromDB = async () => {
  try {
    const eligibleAddressDataResponse = await axios.post(`${yoloApiBaseUrl}/get-eligible-waitlist`)
    const eligibleAddressData = JSON.parse(eligibleAddressDataResponse.data.body)
    return eligibleAddressData.rows
  } catch (err) {
    throw new Exception('4003', `${err.message}`)
  }
}

const composeRows = (rows, expiration) => rows.map((row, idx) => Object.assign(row, { expiration, item: idx + 1 }))

export const getWaitingListData = async () => {
  try {
    const elegibleAddressRows = await fetchDataFromDB()
    const firstAddress = elegibleAddressRows[0].address.toLowerCase()
    const expirationTime = await getClaimExpirationTime(firstAddress)
    const composedRows = composeRows(elegibleAddressRows, expirationTime)
    return composedRows
  } catch (err) {
    throw err
  }
}

export const confirmNftClaimed = async ({ address, nftId, complainMode = true }) => {
  await axios.post(`${yoloApiBaseUrl}/YogNewEndPoint`).catch((err) => {
    if (complainMode) throw err
  })
}
