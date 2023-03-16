import { FormattedMessage } from 'react-intl'
import React from 'react'
import { Grid } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export const getFrequencyDataValue = (data, field) =>
  data.hasIn(['periodicity', field]) ? data.getIn(['periodicity', field]) : ''

export const periodicityTypes = [
  {
    label: 'Quotidienne',
    value: 'daily'
  },
  {
    label: 'Hebdomadaire',
    value: 'weekly'
  },
  {
    label: 'Irregulière',
    value: 'irregular'
  },
  {
    label: 'Evénement',
    value: 'event'
  }
]

export const weekDays = [
  {
    value: 0,
    label: <FormattedMessage id="days.monday" />
  },
  {
    value: 1,
    label: <FormattedMessage id="days.tuesday" />
  },
  {
    value: 2,
    label: <FormattedMessage id="days.wednesday" />
  },
  {
    value: 3,
    label: <FormattedMessage id="days.thursday" />
  },
  {
    value: 4,
    label: <FormattedMessage id="days.friday" />
  },
  {
    value: 5,
    label: <FormattedMessage id="days.saturday" />
  },
  {
    value: 6,
    label: <FormattedMessage id="days.sunday" />
  }
]

export function initializePeriodicityDaily(setEventInitData, eventInitData) {
  setEventInitData(
    eventInitData
      .setIn(['periodicity', 'type'], 'daily')
      .setIn(['periodicity', 'start'], 0)
      .setIn(['periodicity', 'interval'], 1)
      .setIn(['periodicity', 'nb_per_day'], 1)
      .set('day', null)
  )
}

export function initializePeriodicityWeekly(setEventInitData, eventInitData) {
  setEventInitData(
    eventInitData
      .setIn(['periodicity', 'type'], 'weekly')
      .setIn(['periodicity', 'start'], 0)
      .setIn(['periodicity', 'week'], 1)
      .setIn(['periodicity', 'days'], [])
  )
}

export function initializePeriodicityIrregular(setEventInitData, eventInitData) {
  setEventInitData(
    eventInitData.setIn(['periodicity', 'type'], 'irregular').setIn(['periodicity', 'days'], [])
  )
}

export function initializePeriodicityEvent(setEventInitData, eventInitData) {
  setEventInitData(
    eventInitData
      .setIn(['periodicity', 'type'], 'event')
      .setIn(['periodicity', 'days'], null)
      .setIn(['periodicity', 'shift'], 0)
  )
}

export const WeeklyCheckboxes = ({ disabled = false, setEventInitData, eventInitData }) => {
  function onChangeCheckbox(value) {
    if (
      eventInitData.getIn(['periodicity', 'days']) &&
      !eventInitData.getIn(['periodicity', 'days']).includes(value)
    )
      setEventInitData(eventInitData.updateIn(['periodicity', 'days'], days => [...days, value]))
    else
      setEventInitData(
        eventInitData.updateIn(['periodicity', 'days'], days => days.filter(item => item !== value))
      )
  }

  return (
    <Grid container>
      {weekDays.map(day => (
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={disabled}
                checked={
                  eventInitData.getIn(['periodicity', 'days']) &&
                  eventInitData.getIn(['periodicity', 'days']).includes(day.value)
                }
                onChange={() => onChangeCheckbox(day.value)}
                name={day.label}
                color="primary"
              />
            }
            label={day.label}
          />
        </Grid>
      ))}
    </Grid>
  )
}
