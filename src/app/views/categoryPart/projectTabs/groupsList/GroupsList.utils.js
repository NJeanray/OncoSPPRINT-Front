import React from 'react'
import { FormattedMessage } from 'react-intl'

export const groupCreatedText = groupCreated => (
  <FormattedMessage
    id="groupsList.createGroup"
    values={{ groupName: groupCreated ? groupCreated.name : '' }}
  />
)

export const groupUpdatedText = groupUpdated => (
  <FormattedMessage
    id="groupsList.updateGroup"
    values={{ groupName: groupUpdated ? groupUpdated.name : '' }}
  />
)

export const groupDeletedText = <FormattedMessage id="groupsList.deleteGroup" />
