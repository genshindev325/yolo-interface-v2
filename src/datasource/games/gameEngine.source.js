import socketIO from 'socket.io-client'
// import { ethers } from 'ethers'

import { config } from 'config'

const { BACKEND_SOCKET } = config

export let gamesSocket
export let lastBidTxHash

//    BACKEND_SOCKET: 'http://ec2-34-220-198-216.us-west-2.compute.amazonaws.com:3570'

export const socketConnect = async (onData) => {
  gamesSocket = socketIO(BACKEND_SOCKET)
  gamesSocket &&
    gameSocketSubscribe({
      onConnect: () => onData.connect(gamesSocket.id),
      onDisconnect: () => onData.disconnect(gamesSocket.id),
      onBroadcast: (data) => {
        onData.broadcast(data)
      }
    })
  console.log('BACKEND_SOCKET-->', BACKEND_SOCKET)
}

export const socketDisconnect = async () => {
  gamesSocket.disconnect()
}

export const gameSocketSubscribe = (eventListenerObj) => {
  const { onConnect, onDisconnect, onBroadcast, onceBroadcast } = eventListenerObj
  gamesSocket && onConnect && gamesSocket.on('connect', onConnect)
  gamesSocket && onDisconnect && gamesSocket.on('disconnect', onDisconnect)
  gamesSocket && onBroadcast && gamesSocket.on('broadcast', onBroadcast)
  gamesSocket && onceBroadcast && gamesSocket.once('broadcast', onceBroadcast)
}

/**
 * This Function checks if the token you are trying to use in Polygon is Approved
 * @param {*} tokenContractData {abi, address}
 * @param {number} amountInCrypto
 * @returns boolean
 */
