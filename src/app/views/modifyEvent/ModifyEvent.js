import React from 'react'
import { FormattedMessage } from 'react-intl'

import { eventEndpoint } from 'app/api/endpoints'
import TextTitle from 'app/components/textTitle/TextTitle'
import EventForm from 'app/components/eventForm'
import StyledModal from 'app/components/styledModal/StyledModal'

const ModifyEvent = ({ viewDisplay, updateEntities, eventSelected, open, onClose }) => {
  const handleModifyEvent = payload => {
    delete payload.groupsSelected

    updateEntities('events', {
      endpoint: eventEndpoint(eventSelected.get('id')),
      params: {
        ...payload
      }
    })
  }

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle
        text={
          <FormattedMessage
            id={viewDisplay ? 'event.modalViewing.title' : 'event.modalModifying.title'}
          />
        }
        subTitle={
          eventSelected ? <FormattedMessage id={`event.${eventSelected.get('type')}`} /> : null
        }
      />
      <EventForm
        disabledBtn={viewDisplay}
        category={eventSelected?.get('type') || null}
        action="update"
        onCloseForm={onClose}
        eventSelected={eventSelected}
        handleModifyEvent={handleModifyEvent}
      />
    </StyledModal>
  )
}

export default ModifyEvent
