import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

import { config } from 'config'
import { getQueryObject } from 'utils'

const isDevEnv = config.IS_DEV || config.IS_BETA || config.IS_STAGING

const initialUserState = {
  isInitialized: false,
  user: { userId: null, currency: 'USD', isLoaded: false, isAllowed: false }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { user } = action.payload

      return {
        ...state,
        isInitialized: true,
        user
      }
    }
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialUserState
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState)
  const params = getQueryObject(window.location.href.split('?')[1])

  useEffect(() => {
    const initialize = async () => {
      const geoResult = await axios.post(config.IP_CHECK, { level: params?.a })
      dispatch({
        type: 'INITIALIZE',
        payload: {
          user: {
            currency: initialUserState.user.currency,
            id: 0,
            isLoaded: true,
            isAllowed: isDevEnv ? true : geoResult?.data?.allowed
          }
        }
      })
    }

    initialize()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
