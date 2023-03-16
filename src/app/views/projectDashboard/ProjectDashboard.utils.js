import React from 'react'
import { FormattedMessage } from 'react-intl'

export const partDeletedText = partDeleted => (
  <FormattedMessage
    id="partCategory.deletePart"
    values={{
      partType: partDeleted ? partDeleted.type : '',
      partName: partDeleted ? partDeleted.name : ''
    }}
  />
)

export const studyDeletedText = studyDeleted => (
  <FormattedMessage
    id="studyCategory.deleteStudy"
    values={{
      studyType: studyDeleted ? studyDeleted.type : '',
      studyName: studyDeleted ? studyDeleted.name : ''
    }}
  />
)

export const projectsListTitle = <FormattedMessage id="projectsList.title" />
