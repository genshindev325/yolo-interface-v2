import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { config } from 'config'
import { store } from 'redux/store'

import { AuthProvider } from 'contexts/auth/authContext'
import { ViewportProvider } from 'contexts/viewport/viewportContext'

import { Routes } from 'router'

import './assets/css/index.css'
import { themeSelector } from './themes'

if (config.DISABLED_CONSOLE_MSG) {
  console.log = () => {}
  console.warn = () => {}
  //console.error = () => {}
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themeSelector('steelMoon')}>
        <ViewportProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ViewportProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
