/* formatTimeStamp helpers */
const pad = (number, digits) => String(number).padStart(digits, '0')

//year
const YYYY = (time) => pad(time.getFullYear(), 4)

//month
const MM = (time) => pad(time.getMonth() + 1, 2)

//day
const DD = (time) => pad(time.getDate(), 2)

// hours format
const hh = (time) => pad(time.getHours(), 2)

// minutes format
const m = (time) => pad(time.getMinutes(), 1)
const mm = (time) => pad(time.getMinutes(), 2)

// seconds format
const ss = (time) => pad(time.getSeconds(), 2)

/**
 * Formatted Seconds
 *
 * @param {number} time Time in Seconds
 * @return {string} Fomatted string
 */
export const formattedSeconds = (time) => {
  const second = Math.floor(time / 1000)
  const ms = Math.floor((time % 1000) / 10)

  return `${second}:${ms > 9 ? ms : `0${ms}`}`
}

export const formattedTimeArray = (time) => {
  const second = Math.floor(time / 1000)
  const ms = Math.floor((time % 1000) / 10)

  return [second > 9 ? second : `0${second}`, ms > 9 ? ms : `0${ms}`]
}

export const formatTimeStamp = (milliseconds, format) => {
  const time = new Date(milliseconds)
  const formattedTime = format
    .replace('YYYY', YYYY(time))
    .replace('MM', MM(time))
    .replace('DD', DD(time))
    .replace('mm', mm(time))
    .replace('hh', hh(time))
    .replace('m', m(time))
    .replace('ss', ss(time))
  return formattedTime
}

export const formatUTCTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  let hours = date.getUTCHours()
  let minutes = date.getUTCMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours %= 12
  hours = hours || 12
  // minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`
  const strDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
  const today = new Date()
  const isToday =
    today.getUTCFullYear() === date.getUTCFullYear() &&
    today.getUTCMonth() === date.getUTCMonth() &&
    today.getUTCDate() === date.getUTCDate()
  const formattedDate = (isToday ? 'Today' : strDate) + ' @ ' + strTime + ' UTC'
  return formattedDate
}

export const setExactTimeout = function (callback, duration, resolution = 100) {
  const start = new Date().getTime()
  const timeout = setInterval(function () {
    if (new Date().getTime() - start > duration) {
      callback()
      clearInterval(timeout)
    }
  }, resolution)

  return timeout
}

export const formatTimeFromNow = (timestamp) => {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
  })
  
  const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
  ]
  
  let duration = (new Date(timestamp * 1000) - new Date()) / 1000

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}