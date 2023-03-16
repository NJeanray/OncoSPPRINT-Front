import React from 'react'
import { FormattedMessage } from 'react-intl'

export const studyUpdatedText = studiesUpdated => (
  <FormattedMessage
    id="studyCategory.updateStudy"
    values={{ studyName: studiesUpdated ? studiesUpdated.name : '' }}
  />
)

export const partCreatedText = singlePartCreated => (
  <FormattedMessage
    id="partCategory.createPart"
    values={{ partName: singlePartCreated ? singlePartCreated.name : '' }}
  />
)

export const manageStudyTitle = <FormattedMessage id="manageStudy.title" />
