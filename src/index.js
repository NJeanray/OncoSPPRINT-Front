import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import { ConnectedRouter } from 'connected-react-router'

import messagesFr from 'app/translations/fr.json'
import GlobalStyle, { theme } from './app/styles/styled-index'

import * as serviceWorker from './serviceWorker'
import Router from './app/router'
import store, { history } from './app/store'

const messages = {
  fr: messagesFr
}

const language = 'fr'

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
