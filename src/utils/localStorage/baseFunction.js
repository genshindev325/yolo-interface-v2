export const getLocalStorage = (key) => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : undefined
  } catch (err) {
    console.warn(`'getLocalStorage' request failed: ${err}`)
    return undefined
  }
}

export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn('Local storage setter failed: ', err)
  }
}
