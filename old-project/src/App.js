import React from 'react'

import { Provider } from 'react-redux'

import MainI18n from './components/MainI18n'
import store from './store'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#025590' },
    secondary: { main: '#FFFFFF' }
  },
  typography: {
    useNextVariants: true
  }
})

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MainI18n />
    </MuiThemeProvider>
  </Provider>
)

export default App
