import { getWeb3 } from 'utils'

export let gamesSocket
export let lastBidTxHash

//    BACKEND_SOCKET: 'http://ec2-34-220-198-216.us-west-2.compute.amazonaws.com:3570'

/**
 * This Function checks if the token you are trying to use in Polygon is Approved
 * @param {*} tokenContractData {abi, address}
 * @param {number} amountInCrypto
 * @returns boolean
 */

///TODO: DELETE THIS AND TEST ALL IS GOOD
export const isPolygonTokenApproved = async (tokenContractData, spenderAddress, amountInCrypto = 0) => {
  const web3 = getWeb3()
  if (web3 && web3.eth) {
    try {
      const tokenContract = new web3.eth.Contract(tokenContractData.abi, tokenContractData.address)
      const from = web3.eth.defaultAccount
      const spender = spenderAddress //gameContract
      const amountAllowed = from && (await tokenContract.methods.allowance(from, spender).call())

      if (!amountAllowed) {
        return false
      }
      return Boolean(amountInCrypto < amountAllowed)
    } catch (e) {
      return false
    }
  }
}

export const getWeb3LatestBlock = async () => {
  const web3 = getWeb3()
  if (web3 && web3.eth) {
    const blockInfo = await web3.eth?.getBlock('latest')
    return blockInfo
  }
  return undefined
}
