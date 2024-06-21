import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { notificationActions } from 'redux/actions'
import { useAuth } from 'contexts/auth/useAuth'

const restrictedBannerObj = {
  show: true,
  id: 'restricted'
}

export const LocationCheck = ({ children }) => {
  const dispatch = useDispatch()
  const { user } = useAuth()

  useEffect(() => {
    if (user.isLoaded && !user.isAllowed) {
      dispatch(notificationActions.updateBanner(restrictedBannerObj))
    }
  }, [user.isLoaded, user.isAllowed, dispatch])

  return children
}
