import React from 'react'
import { FormattedMessage } from 'react-intl'

import FormHelperText from '@material-ui/core/FormHelperText'

const renderError = (errorMessage, index) => {
  if (typeof errorMessage === 'object' && errorMessage.id) {
    return (
      <FormHelperText error key={index}>
        <FormattedMessage {...errorMessage} />
      </FormHelperText>
    )
  }
  if (typeof errorMessage === 'object' && errorMessage.detail) {
    errorMessage = errorMessage.detail
  }
  return (
    <FormHelperText error key={index}>
      {errorMessage}
    </FormHelperText>
  )
}

export default renderError
