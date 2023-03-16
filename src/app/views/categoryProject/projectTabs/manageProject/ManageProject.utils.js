import React from 'react'
import { FormattedMessage } from 'react-intl'

export const projectUpdatedText = projectUpdated => (
  <FormattedMessage
    id="projectDashboardTabs.updateProject"
    values={{ projectTitle: projectUpdated ? projectUpdated.title : '' }}
  />
)

export const studyCreatedText = studyCreated => (
  <FormattedMessage
    id="studyCategory.createStudy"
    values={{ studyName: studyCreated ? studyCreated.name : '' }}
  />
)

export const manageProjectTitle = <FormattedMessage id="manageProject.title" />
