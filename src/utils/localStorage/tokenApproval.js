import { getLocalStorage, setLocalStorage } from './baseFunction'

import { LOCAL_WALLET_ID, TX_TYPE, YOLO_TOKEN_APPROVAL } from 'utils/constants'
import { soliditySha3 } from 'utils'
import { getSmartContractsInfo } from 'config/smartContracts.config'

const getLocalAllTokenApproved = () => getLocalStorage(YOLO_TOKEN_APPROVAL) || {}
const setLocalAllTokenApproved = (localItems) => setLocalStorage(YOLO_TOKEN_APPROVAL, localItems)

export const composeTokenLocalKey = (address, gameAddress) => soliditySha3(address, gameAddress.toLowerCase())

export const setLocalTokenApprove = (address, gameId, isAllowed) => {
  const [gameContractInfo] = getSmartContractsInfo([gameId])
  const localItems = getLocalAllTokenApproved()
  const YTKNLocalKey = composeTokenLocalKey(address, gameContractInfo.address)
  Object.assign(localItems, {
    [YTKNLocalKey]: isAllowed
  })
  setLocalAllTokenApproved(localItems)
}

export const getLocalTokenApprovalStatus = (address, gameId) => {
  const [gameContractInfo] = getSmartContractsInfo([gameId])
  const localItems = getLocalAllTokenApproved()
  const YTKNLocalKey = composeTokenLocalKey(address, gameContractInfo.address)
  return localItems[YTKNLocalKey] || false
}
