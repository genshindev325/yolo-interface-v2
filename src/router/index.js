import React from 'react'
import styled from 'styled-components'
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'

import { AuthProvider } from 'contexts/auth/authContext'

import { NotificationLayout } from 'components/Layouts/Notification.layout'
import { HomePage } from 'components/pages/home'
import { RestrictPage } from 'components/pages/restrict'
import { PressPage } from 'components/pages/press'
import { PrivacyPolicyPage } from 'components/pages/terms/privacy'
import { TOSPage } from 'components/pages/terms/tos'
import { AboutPage } from 'components/pages/about'
import { GamePage } from 'components/pages/games'
import { DashboardPage } from 'components/pages/dashboard'
import { ClaimNftPage } from 'components/pages/claimNft'
import { LocationCheck } from 'router/LocationCheck'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`
const GameWrapper = styled.div`
  height: 100vh;
  display: grid;
`

export const Routes = () => {
  return (
    <AuthProvider>
      <MainWrapper>
        <NotificationLayout>
          <LocationCheck>
            <Switch>
              <Route path='/restricted' render={(props) => <RestrictPage {...props} />} />
              <Route path={`/claim-nft`} exact render={(props) => <ClaimNftPage />} />
              <Route path='/game' render={(props) => <GamesRoutes {...props} />} />
              <Route path='/press' render={(props) => <PressPage {...props} />} />
              <Route path='/about' render={(props) => <AboutPage {...props} />} />
              <Route path='/privacy-policy' render={(props) => <PrivacyPolicyPage {...props} />} />
              <Route path='/tos' render={(props) => <TOSPage {...props} />} />
              <Route exact path='/' render={(props) => <HomePage {...props} />} />
              <Redirect to='/' />
            </Switch>
          </LocationCheck>
        </NotificationLayout>
      </MainWrapper>
    </AuthProvider>
  )
}

// <PrivateRoute path='/issuance' component={TokenIssuancePage} />

const GamesRoutes = (props) => {
  const { path } = useRouteMatch()
  return (
    <GameWrapper>
      <Switch>
        <Route path={`${path}/dashboard`} exact render={(props) => <DashboardPage />} />
        <Route path={`${path}/`} exact render={(props) => <GamePage />} />
      </Switch>
    </GameWrapper>
  )
}
