import React, { useContext, useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { Grid } from '@material-ui/core'

import TextField from 'app/components/textField'
import Select from 'app/components/select'
import StyledGrid from 'app/components/styledGrid'
import RadioGroupField from 'app/components/radioGroupField'
import TextSubtitle from 'app/components/textSubtitle/TextSubtitle'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import {
  periodicityTypes,
  getFrequencyDataValue,
  initializePeriodicityDaily,
  initializePeriodicityWeekly,
  initializePeriodicityIrregular,
  initializePeriodicityEvent,
  WeeklyCheckboxes
} from './EventFrequency.utils'
import PeriodicityTime from './PeriodicityTime'
import IrregularTimepoints from './IrregularTimepoints'
import Alert from 'app/components/alert/Alert'
import EventTimepoints from 'app/components/eventTimepoints'

const EventFrequency = ({ disabledBtn }) => {
  const { action, eventInitData, setEventInitData, eventSelected, category } = useContext(
    EventFormContext
  )
  const [periodicityType, setPeriodicityType] = useState(periodicityTypes[0].value)
  const [isEndPeriodicityDisplayed, setIsEndPeriodicityDisplayed] = useState(true)
  // const nbPerWeekValue = getFrequencyDataValue(eventInitData, 'nb_per_week')
  // const frequencyValue = getFrequencyDataValue(eventInitData, 'frequency')
  const nbPerDayValue = getFrequencyDataValue(eventInitData, 'nb_per_day')
  const intervalValue = getFrequencyDataValue(
    eventInitData,
    periodicityType === 'daily' ? 'interval' : 'week'
  )

  const fixDateSwitchValue = date => {
    if (date) {
      if (Number(date) === 0) return 'plus'
      return Number(date) < 0 ? 'minus' : 'plus'
    }
    return 'plus'
  }

  function onChangePeriodicityType(value) {
    if (value === 'daily') initializePeriodicityDaily(setEventInitData, eventInitData)
    else if (value === 'weekly') initializePeriodicityWeekly(setEventInitData, eventInitData)
    else if (value === 'irregular') initializePeriodicityIrregular(setEventInitData, eventInitData)
    else if (value === 'event') initializePeriodicityEvent(setEventInitData, eventInitData)
    setIsEndPeriodicityDisplayed(true)
    setPeriodicityType(value)
  }

  const checkPeriodicityIntervalDisplayed = () =>
    periodicityType === 'daily' || periodicityType === 'weekly'

  const checkIsWarningDisplayed = () =>
    isEndPeriodicityDisplayed &&
    eventInitData.getIn(['periodicity', 'start']) > eventInitData.getIn(['periodicity', 'end'])

  useEffect(() => {
    if (action === 'update' && eventSelected && eventSelected.has('periodicity')) {
      if (
        eventSelected.getIn(['periodicity', 'type']) === 'daily' ||
        eventSelected.getIn(['periodicity', 'type']) === 'weekly'
      ) {
        if (eventSelected.getIn(['periodicity', 'end'])) setIsEndPeriodicityDisplayed(true)
        else setIsEndPeriodicityDisplayed(false)
      }
      setPeriodicityType(eventSelected.getIn(['periodicity', 'type']))
    }
    // eslint-disable-next-line
  }, [action, eventSelected])

  useEffect(() => {
    if (category === 'randomisation' || (action === 'create' && category === 'induction')) {
      initializePeriodicityIrregular(setEventInitData, eventInitData)
      setPeriodicityType('irregular')
    } else {
      initializePeriodicityDaily(setEventInitData, eventInitData)
    }
    // eslint-disable-next-line
  }, [category])

  return (
    <StyledGrid container>
      <Grid item xs={12}>
        <TextSubtitle text={<FormattedMessage id="eventFrequency.textSubtitle" />} />
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={6}>
          <Select
            disabled={disabledBtn}
            value={periodicityType}
            label="eventFrequency.periodicityType"
            onChange={e => onChangePeriodicityType(e.target.value)}
            options={periodicityTypes}
            isOptionDisabled={optLabel => {
              return category === 'randomisation' && optLabel.toLowerCase() !== 'irregulière'
            }}
          />
        </Grid>
      </Grid>
      {periodicityType === 'daily' && (
        <Grid item xs={6}>
          <TextField
            disabled={disabledBtn}
            width="100%"
            required
            type="number"
            label={<FormattedMessage id="eventFrequency.nbPerDay" />}
            value={nbPerDayValue}
            onChange={e =>
              setEventInitData(
                eventInitData.setIn(['periodicity', 'nb_per_day'], Number(e.target.value))
              )
            }
            inputProps={{
              onInput: e => {
                e.target.value = Number(e.target.value)
              },
              min: 0
            }}
          />
        </Grid>
      )}
      {checkPeriodicityIntervalDisplayed() && (
        <Grid item xs={6}>
          <TextField
            disabled={disabledBtn}
            width="100%"
            required
            type="number"
            label={<FormattedMessage id="eventFrequency.interval" />}
            value={intervalValue}
            onChange={e =>
              setEventInitData(
                eventInitData.setIn(
                  ['periodicity', periodicityType === 'daily' ? 'interval' : 'week'],
                  Number(e.target.value)
                )
              )
            }
            inputProps={{
              onInput: e => {
                e.target.value = Number(e.target.value)
              },
              min: 1
            }}
          />
        </Grid>
      )}
      {periodicityType === 'weekly' && (
        <WeeklyCheckboxes
          disabled={disabledBtn}
          setEventInitData={setEventInitData}
          eventInitData={eventInitData}
        />
      )}
      {checkPeriodicityIntervalDisplayed() && (
        <>
          <RadioGroupField
            formDisabled={disabledBtn}
            label=""
            labelRadioRight="eventFrequency.iteration"
            labelRadioLeft="eventFrequency.radio.endPeriodicity"
            value={isEndPeriodicityDisplayed}
            setValue={value => {
              setIsEndPeriodicityDisplayed(value)
              if (!value) setEventInitData(eventInitData.setIn(['periodicity', 'end'], null))
              else setEventInitData(eventInitData.setIn(['periodicity', 'iteration'], null))
            }}
            direction="column"
            align="flex-start"
          />
          <PeriodicityTime
            disabled={disabledBtn}
            eventInitData={eventInitData}
            setEventInitData={setEventInitData}
            fixDateSwitchValue={fixDateSwitchValue}
            isEndPeriodicityDisplayed={isEndPeriodicityDisplayed}
          />
          <Grid item xs={12}>
            {checkIsWarningDisplayed() && (
              <Alert severity="warning" onClose={() => {}}>
                <FormattedMessage id="eventFrequency.alert.periodicityFalse" />
              </Alert>
            )}
          </Grid>
        </>
      )}
      {periodicityType === 'irregular' && (
        <IrregularTimepoints
          category={category}
          disabled={disabledBtn}
          fixDateSwitchValue={fixDateSwitchValue}
          eventInitData={eventInitData}
          setEventInitData={setEventInitData}
        />
      )}
      {periodicityType === 'event' && (
        <EventTimepoints disabled={disabledBtn} fixDateSwitchValue={fixDateSwitchValue} />
      )}
    </StyledGrid>
  )
}

export default EventFrequency
