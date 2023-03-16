import React, { Component } from 'react'
import { injectIntl } from 'react-intl'

import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

import handleErrors from '../higherOrderComponents/handleErrors'
import { consoleLog } from '../../lib/utils'

import FormError from './Error'

const ErrorLengthField = length => ({
  id: 'errorLength',
  defaultMessage: `Make sure this field has less than {length} characters.`,
  values: { length: length }
})

const checkMaxLength = length => {
  return value => (value.length <= length ? null : ErrorLengthField(length))
}

const ErrorNotANumberField = {
  id: 'errorNaN',
  defaultMessage: `This field must be a number.`
}

const ErrorNegativeNumberField = {
  id: 'errorNegativeNumber',
  defaultMessage: `This field must be a positive number.`
}

const checkPositiveNumber = value => {
  const v = parseInt(value)
  if (isNaN(v)) {
    return ErrorNotANumberField
  }
  if (v < 0) {
    return ErrorNegativeNumberField
  }
  return null
}

const styles = theme => ({
  root: {
    width: '100%'
  },
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 300,
    maxWidth: '100%'
  }
})

class InputText extends Component {
  constructor(props) {
    super()

    this.state = {
      value: props.value || '',
      errors: null
    }

    this._setValue = this.setValue.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
    return true
  }

  setValue(event) {
    const value = event.currentTarget.value
    const update = { value }
    if (this.props.validators) {
      update.errors = this.props.validators.reduce
        ? this.props.validators.reduce((res, validator) => {
            const tmp = validator(value)
            if (tmp !== null) {
              res.push(tmp)
            }
            return res
          }, [])
        : [this.props.validators(value)]
    }
    this.setState(update)
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <FormControl className={this.props.classes.formControl}>
          <TextField
            {...{ ...this.props, validators: null }}
            // InputProps={this.props.InputProps}
            i={this.props.i}
            value={this.state.value}
            label={this.props.intl.formatMessage({
              id: this.props.label,
              defaultMessage: this.props.label
            })}
            onChange={this._setValue}
            onFocus={() => {}}
            error={this.state.errors && this.state.errors.length > 0}
          />
          {this.state.errors && this.state.errors.map(FormError)}
          {this.props.errors && this.props.errors.map(FormError)}
          {this.props.children}
        </FormControl>
      </div>
    )
  }
}

export default handleErrors(injectIntl(withStyles(styles)(InputText)), consoleLog)

export { checkMaxLength, checkPositiveNumber }
