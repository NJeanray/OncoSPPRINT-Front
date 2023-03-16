import React, { useContext, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { sortBy } from 'lodash'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import TextSubhead from 'app/components/textSubhead/TextSubhead'
import Timepoint from 'app/components/timepoint'
import eventTypes from 'app/utils/eventsTypes'
import Select from 'app/components/select'
import { eventEndpoint } from 'app/api/endpoints'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import { PartContext } from 'app/contexts/PartProvider'
import { EventFormContext } from 'app/contexts/EventFormProvider'

const EventTimepoints = ({
  disabled,
  eventLabel,
  fetchEntities,
  eventsTypeFiltered,
  fixDateSwitchValue
}) => {
  const { partSelected } = useContext(PartContext)
  const [day, setDay] = useState(0)
  const [eventSelectedTimepoint, setEventSelectedTimepoint] = useState(null)
  const [eventSelectedTimepointLabel, setEventSelectedTimepointLabel] = useState(null)
  const [arrayEventTypeSelected, setArrayEventTypeSelected] = useState(null)
  const { action, eventInitData, setEventInitData, eventSelected } = useContext(EventFormContext)

  const fetchEvents = (filters = {}) => {
    fetchEntities('eventsTypeFiltered', {
      endpoint: eventEndpoint(),
      params: {
        part_id: partSelected.get('id'),
        ...filters
      }
    })
  }

  function handleAddEventTimepoint() {
    setEventInitData(
      eventInitData
        .updateIn(['periodicity', 'event_id'], () => eventSelectedTimepoint)
        .setIn(['periodicity', 'shift'], day)
    )
    setEventSelectedTimepointLabel(
      eventsTypeFiltered.filter(item => item.value === eventSelectedTimepoint)[0].label
    )
    setEventSelectedTimepoint(null)
    setArrayEventTypeSelected(null)
    setDay(0)
  }

  useEffect(() => {
    if (
      action === 'update' &&
      eventSelected.getIn(['periodicity', 'type']) === 'event' &&
      !eventSelectedTimepointLabel &&
      eventLabel
    )
      setEventSelectedTimepointLabel(eventLabel)
    // eslint-disable-next-line
  }, [action, eventSelected, eventLabel])

  return (
    <>
      <Grid container>
        <TextSubhead text={<FormattedMessage id="eventFrequency.eventTimepoints.set" />} />
        <Timepoint
          disabled={disabled}
          dayValue={Math.abs(day)}
          onChangeDay={value => setDay(value)}
          switchValue={fixDateSwitchValue(day)}
          onChangeSwitch={() => setDay(day * -1)}
          displayD0={false}
        />
        <Grid item xs={3} style={{ margin: '0 20px' }}>
          <Select
            disabled={disabled}
            label="eventsList.filter.eventType"
            value={arrayEventTypeSelected}
            onChange={e => {
              setArrayEventTypeSelected(e.target.value)
              setEventSelectedTimepoint(null)
              fetchEvents({ types: e.target.value })
            }}
            options={sortBy(eventTypes({ withFacs: true }), [item => item.value])}
          />
        </Grid>
        <Grid item xs={3} style={{ margin: '0 20px' }}>
          <Select
            disabled={!arrayEventTypeSelected || disabled}
            label="eventTimepoints.chooseEvent"
            value={eventSelectedTimepoint}
            onChange={e => {
              setEventSelectedTimepoint(e.target.value)
            }}
            options={eventsTypeFiltered}
            htmlTag
          />
        </Grid>
        <StyledMainAddBtn
          disabled={!eventSelectedTimepoint}
          onClick={() => handleAddEventTimepoint()}
        />
      </Grid>
      {eventInitData.getIn(['periodicity', 'event_id']) && (
        <Grid xs={12} style={{ marginTop: '20px' }}>
          <TextSubhead
            text={<FormattedMessage id="eventFrequency.irregularTimepoints.selected" />}
          />
          <Paper style={{ padding: '15px' }}>
            <Chip
              disabled={disabled}
              style={{ marginLeft: '5px' }}
              label={`${eventInitData.getIn([
                'periodicity',
                'shift'
              ])} jour(s) avant/après ${eventSelectedTimepointLabel}`}
            />
          </Paper>
        </Grid>
      )}
    </>
  )
}

export default EventTimepoints
