import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'contexts/auth/useAuth'
export const PrivateRoute = ({ render: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isLoaded ? <></> : user.isAllowed ? <Component {...props} /> : <Redirect to='/restricted' />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any
}
