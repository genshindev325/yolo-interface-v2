import React from 'react'

const thunkDispatch = (dispatch, state) => (input) =>
  input instanceof Function ? input(thunkDispatch(dispatch, state), state) : dispatch(input)

const BaseContext = ({ children, reducer, initialStore, storeContext, dispatchContext }) => {
  const [state, dispatch] = React.useReducer(reducer, initialStore)
  return (
    <storeContext.Provider value={state}>
      <dispatchContext.Provider value={thunkDispatch(dispatch, state)}>{children}</dispatchContext.Provider>
    </storeContext.Provider>
  )
}

const useStateHook = (storeContext) => {
  const context = React.useContext(storeContext)
  if (context === undefined) {
    throw new Error(`Custom State hook must be used within the corresponding provider, ${storeContext.displayName}`)
  }
  return context
}

const useDispatchHook = (dispatchContext) => {
  const context = React.useContext(dispatchContext)
  if (context === undefined) {
    throw new Error(
      `Custom Dispatch hook must be used within the corresponding provider, ${dispatchContext.displayName}`
    )
  }
  return context
}

export { BaseContext, useStateHook, useDispatchHook }
