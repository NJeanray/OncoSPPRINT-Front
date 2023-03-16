import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import Button from '@material-ui/core/Button'

import InputText, { FormError } from 'app/components/Form'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.setUsername = value => this.setState({ username: value })
    this.setPassword = value => this.setState({ password: value })
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.login(this.state)
  }

  render() {
    return (
      <div className="login-wrapper">
        <form className="login" onSubmit={this.onSubmit}>
          <InputText
            id="login_username"
            label="username"
            value={this.state.username}
            onChange={this.setUsername}
            errors={this.props.errors && this.props.errors['username']}
            margin="normal"
            required
            fullWidth
          />
          <InputText
            id="login_password"
            label="password"
            type="password"
            value={this.state.password}
            onChange={this.setPassword}
            errors={this.props.errors && this.props.errors['password']}
            margin="normal"
            required
            fullWidth
          />
          {this.props.errors &&
            this.props.errors.non_field_errors &&
            this.props.errors.non_field_errors.map(FormError)}
          {this.props.errors && this.props.errors.length && this.props.errors.map(FormError)}
          <p>
            <Button variant="contained" color="primary" type="submit">
              <FormattedMessage id="submitLogin" />
            </Button>
          </p>
        </form>
      </div>
    )
  }
}

export default Login
