import copy from 'copy-to-clipboard'

/**
 * It mask a text with a predefined character, i.e. password
 */
export function maskString(str, maskLength?, maskStart = 15) {
  return str.substring(0, maskStart) + '●'.repeat(maskLength || str.length - maskStart)
}

/**
 * It generate an Promise that resolve when the str has copied into the clipboard
 *
 * @export doCopy
 * @param {*} str
 * @returns Promise
 */
export function doCopy(str) {
  return new Promise((resolve, reject) => {
    try {
      copy(str)
      resolve(true)
    } catch (e) {
      reject('Could not copy')
    }
  })
}

/**
 *
 * It truncate a string by adding a separator (ellipsis default) and keeping the same number of character on both sides
 *
 * @export textMiddleTruncate
 * @param {string} fullStr
 * @param {number | array} strLen
 * @param {string} separator
 * @returns a new string with separator in the middle
 */
export function textMiddleTruncate(fullStr, strLen, separator) {
  const charArray = []
  const strLenType = Array.isArray(strLen) ? 'array' : typeof strLen
  separator = separator || '...'

  if (strLenType === 'number') {
    if (fullStr.length <= strLen) return fullStr
    const separatorLength = separator.length
    const charsToShow = strLen - separatorLength
    charArray.push(Math.ceil(charsToShow / 2))
    charArray.push(Math.floor(charsToShow / 2))
  }
  if (strLenType === 'array') {
    if (strLen.length === 1) {
      return textMiddleTruncate(fullStr, strLen[0], separator)
    }
    charArray.push(strLen[0])
    charArray.push(strLen[1])
  }
  return fullStr && fullStr.substr(0, charArray[0]) + separator + fullStr.substr(fullStr.length - charArray[1])
}

/**
 * This function takes a number and convert to a defined locale currency format,
 * by default it uses 'es-US' as language and 'USD' as currency
 * @exportscurrencyFormatter
 * @param {Number} amountOrAmountInString
 * @param {String, String } optionsObj configuration Object {language, currency, decimals}
 * @returns {String} locale formatted currency amount
 */
export const currencyFormatter = (amountOrAmountInString, optionsObj) => {
  const defaultOptions = { language: 'en-US', currency: 'USD', decimalDigits: 2 }
  const mergedOptions = { ...defaultOptions, ...optionsObj }
  const { language, currency, decimalDigits } = mergedOptions
  const options = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits
  }

  const numberFormatter = new Intl.NumberFormat(language, options)

  return numberFormatter.format(amountOrAmountInString || 0)
}

export const capitalizeFirst = (str) => (str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()) || ''


export const trimString = (str, maxLength = 9, symbol = '...') => {
  if (str?.length > maxLength) {
    return `${str.substr(0, maxLength + 1)}${symbol}`
  }
  return str
}

export const replaceAll = (str, search, replacement) => {
  return str.split(search).join(replacement)
}
