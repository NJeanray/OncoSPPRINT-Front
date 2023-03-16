import React, { useContext, useState, useEffect } from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import EventCategory from 'app/components/eventCategory'
import EventForm from 'app/components/eventForm'
import StyledModal from 'app/components/styledModal/StyledModal'
import TextTitle from 'app/components/textTitle/TextTitle'
import { PartContext } from 'app/contexts/PartProvider'
import { eventEndpoint } from 'app/api/endpoints'
import CreateEventWrapper from './CreateEvent.styled'
import { eventCategories, isPartAddedToPayload } from './CreateEvent.utils'

const SelectEventCategory = ({ groupsSize, onSelectCategory }) => (
  <CreateEventWrapper>
    <Grid container>
      {eventCategories.map(category => (
        <Grid item xs={6} key={category.value}>
          <EventCategory groupsSize={groupsSize} category={category} onSelect={onSelectCategory} />
        </Grid>
      ))}
    </Grid>
  </CreateEventWrapper>
)

const CreateEvent = ({
  resetState,
  singleEventTransferNext,
  eventCreated,
  open,
  onClose,
  postEntities,
  groupsSize,
  resetStateErrors
}) => {
  const [isNextEventTransfer, setIsNextEventTransfer] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const { partSelected } = useContext(PartContext)

  const onSelectCategory = category => setCurrentCategory(category)

  const postRequest = (params, transferAfter = false) => {
    postEntities('singleEvent', {
      endpoint: eventEndpoint(),
      params,
      parent: 'events',
      transfertNext: transferAfter
    })
  }

  if (singleEventTransferNext && currentCategory !== 'transfert') {
    setCurrentCategory('transfert')
    setIsNextEventTransfer(false)
  }

  const handleCreateEvent = (payload, transferAfter) => {
    if (transferAfter) setIsNextEventTransfer(true)
    const paramsToSend = { ...payload }
    if (isPartAddedToPayload(currentCategory)) paramsToSend.part_id = partSelected.get('id')
    delete paramsToSend.groupsSelected

    if (Object.keys(payload.groupsSelected).length !== 0)
      payload.groupsSelected.map(groupId =>
        postRequest({ group_id: groupId, ...paramsToSend }, transferAfter)
      )
    else postRequest(paramsToSend, transferAfter)
  }

  useEffect(() => {
    if (eventCreated && currentCategory) {
      if (!isNextEventTransfer && currentCategory !== 'transfert') setCurrentCategory(null)
      setIsNextEventTransfer(false)
    }
    // eslint-disable-next-line
  }, [eventCreated])

  return (
    <StyledModal
      open={open}
      onClose={() => {
        resetStateErrors('event', { value: null })
        setCurrentCategory(null)
        resetState('singleEvent')
        onClose()
      }}
    >
      <TextTitle
        text={<FormattedMessage id="event.modalCreating.title" />}
        subTitle={currentCategory ? <FormattedHTMLMessage id={`event.${currentCategory}`} /> : null}
      />
      {!currentCategory ? (
        <SelectEventCategory groupsSize={groupsSize} onSelectCategory={onSelectCategory} />
      ) : (
        <EventForm
          handleCreateEvent={handleCreateEvent}
          category={currentCategory}
          action="create"
        />
      )}
    </StyledModal>
  )
}

export default CreateEvent
