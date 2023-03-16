import React, { useEffect, useCallback, useState, useContext } from 'react'
import { fromJS } from 'immutable'
import { EventFormProvider } from 'app/contexts/EventFormProvider'
import classNames from 'classnames'

import { brickGenericCategoryEndpoint, brickParamsEndpoint, eventEndpoint } from 'app/api/endpoints'
import EventInitialize from './EventInitialize/EventInitialize'
import EventContent from './EventContent'
import displayFormErrors from 'app/utils/displayFormErrors'
import { PartContext } from 'app/contexts/PartProvider'
import CustomSpinner from '../customSpinner'
import Wrapper from './EventFormWrapper.styled'
import { initializeEventInitData, initializePeriodicity } from './EventForm.utils'

const EventForm = ({
  disabledBtn,
  hasEventsError,
  hasSingleEventError,
  eventSelected,
  isEventLoading,
  fetchEntities,
  action,
  category,
  handleCreateEvent,
  handleModifyEvent
}) => {
  const [isFrequencyDisplayed, setIsFrequencyDisplayed] = useState(true)
  const [eventInitData, setEventInitData] = useState(fromJS(initializeEventInitData()))
  const { partSelected } = useContext(PartContext)
  const fetchBricks = useCallback(
    (
      brickCategory,
      stateField = 'bricks',
      paramsToSend = `animal_specie:${partSelected.get('animal_species')}`
    ) =>
      fetchEntities(stateField, {
        endpoint: brickGenericCategoryEndpoint(),
        params: {
          generic_category: brickCategory,
          site: partSelected.get('site'),
          params: paramsToSend
        }
      }),
    [fetchEntities, partSelected]
  )

  const fetchBrickParams = useCallback(
    (brickName, stateField = 'brickParams') =>
      fetchEntities(stateField, {
        endpoint: brickParamsEndpoint(),
        params: {
          brick_name: brickName
        },
        common: true
      }),
    [fetchEntities]
  )

  useEffect(() => {
    if (action === 'update' && eventSelected) {
      setEventInitData(
        fromJS({
          groupsSelected: [eventSelected.get('group_id')],
          fromD0: eventSelected.get('day') < 0 ? 'before' : 'after',
          periodicity: initializePeriodicity(eventSelected)
          // nbAnimalsDefault: 0
        })
      )
      if (eventSelected.getIn(['periodicity', 'type']) === 'event')
        fetchEntities('eventTimepoint', {
          endpoint: eventEndpoint(eventSelected.getIn(['periodicity', 'event_id']))
        })
    }
    // eslint-disable-next-line
  }, [action, eventSelected])

  const handleCreateModify = (eventContentPayload, transferAfter = false) => {
    const eventInitParams = { ...eventInitData.toJS() }

    if (!(eventInitData.get('periodicity') && eventInitData.get('periodicity').size !== 0))
      delete eventInitParams.periodicity
    const payload = {
      ...eventInitParams,
      ...eventContentPayload
    }

    if (action === 'create') handleCreateEvent(payload, transferAfter)
    else handleModifyEvent(payload, transferAfter)
  }

  return (
    <Wrapper>
      <div
        className={classNames({
          'event-form__circle-spinner--display': isEventLoading,
          'event-form__circle-spinner--hidden': !isEventLoading
        })}
      >
        <CustomSpinner type="circle" />
      </div>
      <div
        className={classNames({
          'event-form__allForms--display': !isEventLoading,
          'event-form__allForms--hidden': isEventLoading
        })}
      >
        {hasEventsError && displayFormErrors(hasEventsError)}
        {hasSingleEventError && displayFormErrors(hasSingleEventError)}
        <EventFormProvider
          value={{
            category,
            formDisabled: disabledBtn,
            action,
            nbAnimalsDefault: eventInitData ? eventInitData.get('nbAnimalsDefault') : 0,
            eventInitData,
            setEventInitData,
            fetchBricks,
            fetchBrickParams,
            handleCreateModify,
            eventSelected,
            setIsFrequencyDisplayed,
            isFrequencyDisplayed
          }}
        >
          <EventInitialize disabledBtn={disabledBtn} category={category} action={action} />
          <EventContent disabledBtn={disabledBtn} category={category} />
        </EventFormProvider>
      </div>
    </Wrapper>
  )
}

export default EventForm
