import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const TABS_VALUES = {
  '/': true,
  '/logout': true
}

const Header = props => {
  return (
    <header className="Header">
      <Grid container spacing={0} style={{ padding: 0 }} className="MuiGrid">
        <Grid item xs={false} sm={2} lg={1} xl={1} style={{ padding: 0 }}>
          <Link to="/" className="Header-logo">
            <div className="brand">
              <span>Onco</span>
              <span className="brand-suffix">SPPRINT</span>
              <span className="brand-version">version {process.env.REACT_APP_VERSION}</span>
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} sm={10} lg={11} xl={11} className="Header-menu" style={{ padding: 0 }}>
          <Tabs
            value={TABS_VALUES[props.location.pathname] ? props.location.pathname : '/'}
            onChange={(_, value) => props.history.push(value)}
            classes={{ flexContainer: 'Header-menu-tabs' }}
            indicatorColor="secondary"
            className="header__tab-wrapper"
          >
            {props.jwtToken && (
              <Fragment>
                <Tab label={props.intl.formatMessage({ id: 'Studies' })} value="/" />
                <Tab label={props.intl.formatMessage({ id: 'Logout' })} onClick={props.logout} />
              </Fragment>
            )}
          </Tabs>
        </Grid>
      </Grid>
    </header>
  )
}

export default Header
