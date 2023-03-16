import React, { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Snackbar from 'app/components/snackbar'
import TopBar from 'app/components/topBar'
import { SnackbarProvider } from 'app/contexts/SnackbarProvider'
import { useSnackbar } from 'app/hooks/useSnackbar'
import PrivateRoute from 'app/utils/privateRoute'
import Login from 'app/views/login'
import ProjectDashboard from 'app/views/projectDashboard'
import ProjectsList from 'app/views/projectsList'

const Dashboard = ({ history }) => {
  return (
    <>
      <TopBar history={history} />
      <Switch>
        <PrivateRoute
          path={[
            '/projects/:projectId/study/:studyId/part/:partId',
            '/projects/:projectId/study/:studyId',
            '/projects/:projectId'
          ]}
          component={ProjectDashboard}
        />
        <PrivateRoute path="/projects" component={ProjectsList} />
      </Switch>
    </>
  )
}

export default function() {
  const { snackbarType, setSnackbarType, snackbarText, setSnackbarText } = useSnackbar()
  const [locationStateHasChanged, setLocationStateHasChanged] = useState(false)

  const setSnackbar = useCallback(
    (type, text) => {
      setSnackbarType(type)
      setSnackbarText(text)
    },
    [setSnackbarText, setSnackbarType]
  )

  return (
    <Router>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Oncospprint</title>
        </Helmet>
        <SnackbarProvider
          value={{ setSnackbar, locationStateHasChanged, setLocationStateHasChanged }}
        >
          <Switch>
            <PrivateRoute path="/projects" component={Dashboard} />
            <Route path="/" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </SnackbarProvider>
      </>
      <Snackbar
        text={snackbarText}
        open={snackbarText}
        handleClose={() => setSnackbarText(null)}
        snackbarType={snackbarType}
      />
    </Router>
  )
}
