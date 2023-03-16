import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'

import TextError from '../components/textError'

const displayFormErrors = errorsObj => {
  return Object.keys(errorsObj).map(errorField => {
    if (typeof errorsObj[errorField][0] === 'string')
      return <TextError key={errorField} text={`${errorField} : ${errorsObj[errorField]}`} />
    if (Array.isArray(errorsObj[errorField])) {
      const errorsArray = errorsObj[errorField].filter(item => !isEmpty(item))
      return Object.keys(errorsArray[0]).map(key => {
        return <TextError key={key} text={`${key} : ${errorsArray[0][key]}`} />
      })
    }
    if (typeof errorsObj[errorField] === 'object')
      return Object.keys(errorsObj[errorField]).map(key => (
        <TextError text={`${errorField} : ${key} ${errorsObj[errorField][key][0]}`} />
      ))
    return <TextError text={<FormattedMessage id="global.action.error" />} />
  })
}
export default displayFormErrors
