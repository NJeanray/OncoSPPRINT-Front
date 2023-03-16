// @flow
import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import Snackbar from 'app/components/snackbar'
import TextField from 'app/components/textField'
import StyledButton from 'app/components/styledButton'
import TextTitleUnderline from 'app/components/textTitleUnderline'
import logo from 'app/assets/logo.png'
import { tokenEndpoint } from 'app/api/endpoints'
import TextError from 'app/components/textError'
import LoginWrapper from './Login.styled'

type Props = {
  postEntities: (string, Object) => void,
  refreshErrors: Object,
  refreshErrors: Object,
  resetStateErrors: (string, Object) => void,
  loginErrors: Object
}

export default function Login({
  loginErrors,
  postEntities,
  refreshErrors,
  resetStateErrors
}: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const isSubmitBtnDisabled = () => isEmpty(username.trim()) || isEmpty(password.trim())
  const handleSubmit = e => {
    e.preventDefault()
    postEntities('login', {
      endpoint: tokenEndpoint(),
      params: {
        username,
        password
      }
    })
  }

  if (refreshErrors && !isSnackbarOpen) setIsSnackbarOpen(true)
  const displayError = loginErrors || null
  const accessToken = localStorage.getItem('accessToken')
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false)
    resetStateErrors('refresh', { value: null })
  }

  if (accessToken) return <Redirect to="/projects" />

  return (
    <LoginWrapper container component="main" className="login">
      <Grid item xs={false} sm={false} md={4} component={Paper}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          className="login__left-side"
        >
          <img src={logo} alt="oncospprint logo" className="left-side__logo" />
          <div className="left-side__motto">
            <FormattedHTMLMessage id="login.motto" />
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={8} component={Paper} elevation={6}>
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mb={20}>
            <TextTitleUnderline text={<FormattedMessage id="login.title" />} />
          </Box>
          <div className="login__right-side-form">
            {displayError && <TextError text={displayError.non_field_errors[0]} />}
            <form onSubmit={handleSubmit}>
              <TextField
                error={displayError}
                bold="true"
                spacing="true"
                id="username-input"
                label={<FormattedMessage id="login.username" />}
                value={username}
                onChange={e => setUsername(e.target.value)}
                margin="normal"
              />
              <TextField
                error={displayError}
                id="password-input"
                label={<FormattedMessage id="login.password" />}
                onChange={e => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />
              <Box mt={5}>
                <StyledButton
                  disabled={isSubmitBtnDisabled()}
                  primary="true"
                  variant="contained"
                  bgcolor="primary"
                  type="submit"
                >
                  <FormattedMessage id="login.submitBtn" />
                </StyledButton>
              </Box>
            </form>
          </div>
        </Box>
      </Grid>
      <Snackbar
        error
        text={<FormattedMessage id="login.refreshTokenExpired" />}
        open={isSnackbarOpen}
        handleClose={() => handleCloseSnackbar()}
      />
    </LoginWrapper>
  )
}
