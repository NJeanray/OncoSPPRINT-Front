import React, { Fragment } from 'react'
import { IntlProvider } from 'react-intl'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import classNames from 'classnames'

import StudyList from 'app/components/StudiesList'
import Header from 'app/components/Header'
import Login from 'app/components/Login'
import Study from 'app/components/Study'
import CreateStudy from 'app/components/CreateStudy'

const Logout = props => {
  props.logout()
  props.history.push('/')
  return <div className="spinner" />
}

const RouteRenderer = (Child, props, subProps) => (
  <Fragment>
    <Header history={subProps.history} location={subProps.location} />
    <main
      className={classNames('container', {
        'container-login': !props.jwtToken
      })}
    >
      {(props.jwtToken && (
        <Child getIntlMessages={props.getIntlMessages} {...subProps} {...props} />
      )) || (
        <IntlProvider messages={props.getIntlMessages('Login')}>
          <Login getIntlMessages={props.getIntlMessages} {...subProps} {...props} />
        </IntlProvider>
      )}
    </main>
  </Fragment>
)

const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/logout" render={subProps => RouteRenderer(Logout, props, subProps)} />
        <Route
          exact
          path="/new-study"
          render={subProps => RouteRenderer(CreateStudy, props, subProps)}
        />
        <Route path="/study/:id" render={subProps => RouteRenderer(Study, props, subProps)} />
        <Route exact path="/" render={subProps => RouteRenderer(StudyList, props, subProps)} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
