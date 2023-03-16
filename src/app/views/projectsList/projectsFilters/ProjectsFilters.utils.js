import { FormattedMessage } from 'react-intl'
import React from 'react'

export const projectsFilters = [
  {
    label: <FormattedMessage id="projectsList.filter.title" />,
    value: 'title'
  },
  {
    label: <FormattedMessage id="projectsList.filter.project_code" />,
    value: 'project_code'
  },
  {
    label: <FormattedMessage id="projectsList.filter.state" />,
    value: 'state'
  },
  {
    label: <FormattedMessage id="projectsList.filter.site" />,
    value: 'site'
  },
  {
    label: <FormattedMessage id="projectsList.filter.client" />,
    value: 'client'
  },
  {
    label: <FormattedMessage id="projectsList.filter.owner" />,
    value: 'owner'
  }
]
