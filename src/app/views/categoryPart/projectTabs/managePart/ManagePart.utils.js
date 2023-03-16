import React from 'react'
import { FormattedMessage } from 'react-intl'

export const partUpdatedText = partUpdated => (
  <FormattedMessage
    id="partCategory.updatePart"
    values={{ partName: partUpdated ? partUpdated.name : '' }}
  />
)

export const managePartTitle = <FormattedMessage id="managePart.title" />
