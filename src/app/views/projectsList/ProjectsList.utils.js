import React from 'react'
import { FormattedMessage } from 'react-intl'

export const projectCreatedText = projectCreated => (
  <FormattedMessage
    id="projectsList.snackbarText"
    values={{ projectTitle: projectCreated ? projectCreated.title : '' }}
  />
)

export const projectsListTitle = <FormattedMessage id="projectsList.title" />
