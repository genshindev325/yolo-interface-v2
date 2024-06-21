import { textMiddleTruncate } from 'utils'

export function Exception(code, message) {
  this.code = code
  this.message = message
  this.toString = function () {
    return `(${this.code}) - ${this.message}`
  }
}

export const getQueryObject = (param) => {
  if (!Boolean(param)) return null
  return JSON.parse('{"' + decodeURI(param).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export const openNewURL = (url) => {
  window.open(url, '_blank').focus()
}

export const getThreeDotAddress = (address) => textMiddleTruncate(address, [5, 4], '...')
export const getThreeDotHash = (hash) => textMiddleTruncate(hash, [11, 4], '...')
export const getThreeDotHashEnd = (hash) => textMiddleTruncate(hash, [28, 0], '...')

export const getIsGameOpen = (openTimeUtc, closeTimeUtc) => {
  const utcDate = new Date((Date.now() / 1000 + new Date().getTimezoneOffset() * 60) * 1000)
  if (!(utcDate.getDay() % 6)) {
    return false
  }
  const YYYY = utcDate.getFullYear()
  const MM = utcDate.getMonth()
  const DD = utcDate.getDate()

  const [oh, om, os] = openTimeUtc.split(':')
  const [ch, cm, cs] = closeTimeUtc.split(':')

  const openDateUtc = new Date(YYYY, MM, DD, oh, om, os) //in UTC
  const closeDateUtc = new Date(YYYY, MM, DD, ch, cm, cs) //in UTC
  const utcTimeStamp = utcDate.getTime()
  const openTimeStamp = openDateUtc.getTime()
  const closeTimeStamp = closeDateUtc.getTime()

  if (utcTimeStamp > openTimeStamp && utcTimeStamp < closeTimeStamp) {
    return true
  }
  return false
}
