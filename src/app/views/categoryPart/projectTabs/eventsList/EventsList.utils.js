import { FormattedMessage } from 'react-intl'
import React from 'react'

export const eventCreatedText = eventCreated => {
  const eventType = eventCreated ? <FormattedMessage id={`event.${eventCreated.type}`} /> : ''

  return <FormattedMessage id="eventsList.createEvent" values={{ eventType }} />
}

export const eventUpdatedText = eventUpdated => {
  const eventType = eventUpdated ? <FormattedMessage id={`event.${eventUpdated.type}`} /> : ''

  return <FormattedMessage id="eventsList.updateEvent" values={{ eventType }} />
}

export const eventDeletedText = eventDeleted => {
  const eventType = eventDeleted ? <FormattedMessage id={`event.${eventDeleted.type}`} /> : ''

  return <FormattedMessage id="eventsList.deleteEvent" values={{ eventType }} />
}
