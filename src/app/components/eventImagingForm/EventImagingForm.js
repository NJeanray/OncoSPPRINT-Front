import React, { useState, useEffect, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import Grid from '@material-ui/core/Grid'

import Select from 'app/components/select'
import StyledGrid from 'app/components/styledGrid'
import ListFormBtn from '../listFormBtn'
import TextField from '../textField'
import { eventChoiceFieldsEndpoint } from 'app/api/endpoints'
import { PartContext } from 'app/contexts/PartProvider'
import { EventFormContext } from 'app/contexts/EventFormProvider'

const EventImagingForm = ({
  eventChoiceFields,
  fetchEntities,
  imagingTypes,
  imagingPositionsOptions,
  imagingDurationOptions
}) => {
  const { partSelected } = useContext(PartContext)
  const { action, formDisabled, handleCreateModify, eventSelected, nbAnimalsDefault } = useContext(
    EventFormContext
  )
  const [animalsNumber, setAnimalsNumber] = useState(0)
  const [imagingType, setImagingType] = useState(null)
  const [imagingPositions, setImagingPositions] = useState([])
  const [imagingDuration, setImagingDuration] = useState(null)
  const isBtnDisabled = !imagingType || !imagingDuration || isEmpty(imagingPositions)

  const handleClickBtn = () => {
    const payload = {
      nb_animals: animalsNumber,
      imagery_type: imagingType.toLowerCase(),
      imagery_duration: imagingDuration,
      imagery_positions: imagingPositions,
      animals_lot: animalsNumber ? Math.ceil(animalsNumber / 5) : 0
    }

    if (action === 'create') payload.type = 'imagery'
    handleCreateModify(payload)
  }

  useEffect(() => {
    setAnimalsNumber(nbAnimalsDefault)
  }, [nbAnimalsDefault])

  useEffect(() => {
    if (!eventChoiceFields) {
      fetchEntities('eventChoiceFields', {
        endpoint: eventChoiceFieldsEndpoint(),
        common: true
      })
    }
  }, [eventChoiceFields, fetchEntities])

  useEffect(() => {
    if (eventSelected) {
      setAnimalsNumber(eventSelected.get('nb_animals'))
      setImagingType(eventSelected.get('imagery_type'))
      setImagingDuration(eventSelected.get('imagery_duration'))
      setImagingPositions(eventSelected.get('imagery_positions').toJS())
    }
  }, [eventSelected])

  return (
    <div style={{ width: '100%' }}>
      <Select
        disabled={formDisabled}
        label="eventImagingForm.imagingType"
        value={imagingType}
        onChange={e => setImagingType(e.target.value)}
        options={imagingTypes}
        isOptionDisabled={() => partSelected.get('animal_species') === 'rat'}
      />
      <StyledGrid container>
        <Grid item xs={6}>
          <TextField
            disabled={formDisabled}
            width="100%"
            required={true}
            type="number"
            label={<FormattedMessage id="eventImagingForm.animalsNumber" />}
            value={animalsNumber}
            onChange={e => setAnimalsNumber(e.target.value)}
            inputProps={{
              onInput: e => {
                e.target.value = Number(e.target.value)
              },
              min: 0
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            multiple
            disabled={formDisabled}
            label="eventImagingForm.positions"
            value={imagingPositions}
            onChange={e => setImagingPositions(e.target.value)}
            options={imagingPositionsOptions}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={formDisabled}
            label="eventImagingForm.duration"
            value={imagingDuration}
            onChange={e => setImagingDuration(e.target.value)}
            options={imagingDurationOptions}
          />
        </Grid>
      </StyledGrid>
      {!formDisabled && (
        <ListFormBtn
          isBtnDisabled={isBtnDisabled}
          action={action}
          handleCreate={handleClickBtn}
          handleModify={handleClickBtn}
        />
      )}
    </div>
  )
}

export default EventImagingForm
