import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (err) {
      console.warn('Local storage hook getter failed: ', err)
      return initialValue
    }
  })
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.warn('Local storage hook setter failed: ', err)
    }
  }
  const clearKey = () => {
    try {
      setStoredValue(null)
      window.localStorage.removeItem(key)
    } catch (err) {
      console.log(err)
    }
  }

  return [storedValue, setValue, clearKey]
}
