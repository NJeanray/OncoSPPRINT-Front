import React from 'react'
import { isEmpty } from 'lodash'

import TextError from 'app/components/textError'

export const displayStudySupervisionErrors = studySupervisionErrors => {
  const studySupervisionErrorsFiltered = studySupervisionErrors.filter(error => !isEmpty(error))

  return studySupervisionErrorsFiltered.map(errorField =>
    Object.keys(errorField).map(key => (
      <TextError key={errorField} text={`${key}: ${errorField[key]}`} />
    ))
  )
}
