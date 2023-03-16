import React, { useState, useEffect } from 'react'
import { sortBy } from 'lodash'
import { injectIntl } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import Select from 'app/components/select'
import CustomSpinner from 'app/components/customSpinner'
import eventTypes from 'app/utils/eventsTypes'
import EventArraySample from './EventArraySample'
import EventArrayRandomisation from './EventArrayRandomisation'
import EventArrayInduction from './EventArrayInduction'
import EventArrayMonitoring from './EventArrayMonitoring'
import EventArrayImaging from './EventArrayImaging'
import EventArrayTreatment from './EventArrayTreatment'
import EventArraySubcontracting from './EventArraySubcontracting'
import EventArrayFacs from './EventArrayFacs'
import EventArrayDosageElisa from './EventArrayDosageElisa'
import EventArrayIHC from './EventArrayIHC'

const EventsArray = ({
  eventsSorted,
  disabledBtn = false,
  arrayEventTypeSelected,
  setArrayEventTypeSelected,
  handleModify,
  handleDelete,
  groups,
  events,
  fetchEvents,
  handleView
}) => {
  const [eventsData, setEventsData] = useState([])

  useEffect(() => {
    if (eventsSorted) {
      setEventsData(eventsSorted)
    }
  }, [events, eventsSorted])

  if (events && events.get('isFetching')) return <CustomSpinner type="square" />

  return (
    <div>
      <Grid item xs={4}>
        <Select
          label="eventsList.filter.eventType"
          value={arrayEventTypeSelected}
          onChange={e => {
            setArrayEventTypeSelected(e.target.value)
            fetchEvents({ types: e.target.value })
          }}
          options={sortBy(eventTypes({ withFacs: true, withIhc: true, withDosageElisa: true }), [
            item => item.value
          ])}
        />
      </Grid>
      {arrayEventTypeSelected === 'randomisation' && (
        <EventArrayRandomisation
          disabledBtn={disabledBtn}
          groups={groups}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'induction' && (
        <EventArrayInduction
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'monitoring' && (
        <EventArrayMonitoring
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'imagery' && (
        <EventArrayImaging
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'treatment' && (
        <EventArrayTreatment
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'subcontracting' && (
        <EventArraySubcontracting
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'sample' && (
        <EventArraySample
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'facs_ex_vivo_bce' && (
        <EventArrayFacs
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'dosage_elisa' && (
        <EventArrayDosageElisa
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
      {arrayEventTypeSelected === 'ihc' && (
        <EventArrayIHC
          disabledBtn={disabledBtn}
          eventsData={eventsData}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleView={handleView}
        />
      )}
    </div>
  )
}

export default injectIntl(EventsArray)
