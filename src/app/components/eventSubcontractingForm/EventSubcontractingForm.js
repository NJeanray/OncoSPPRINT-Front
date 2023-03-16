import React, { useContext, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import TextField from 'app/components/textField'
import { subcontractorsEndpoint } from 'app/api/endpoints'
import ListFormBtn from 'app/components/listFormBtn'
import RadioGroupField from 'app/components/radioGroupField'
import Select from 'app/components/select'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { PartContext } from 'app/contexts/PartProvider'
import StyledGrid from 'app/components/styledGrid'
import EventSubcontractingFormWrapper from './EventSubcontractingForm.styled'

const EventSubcontractingForm = ({
  subcontractors,
  subcontractorNames,
  isSubcontractorsFetching,
  fetchEntities
}) => {
  const { partSelected } = useContext(PartContext)
  const { action, formDisabled, handleCreateModify, eventSelected } = useContext(EventFormContext)
  const [cost, setCost] = useState(null)
  const [description, setDescription] = useState(null)
  const [quoteNumber, setQuoteNumber] = useState(null)
  const [isSubcontractorToCreate, setIsSubcontractorToCreate] = useState(true)
  const [subcontractorName, setSubcontractorName] = useState(null)
  const isBtnDisabled = !cost || !subcontractorName || subcontractorName.trim() === ''

  const handleClickBtn = () => {
    const payload = {
      cost,
      subcontractor_name: subcontractorName,
      sales_quote: quoteNumber,
      description
    }

    if (action === 'create') {
      payload.type = 'subcontracting'
      payload.part_id = partSelected.get('id')
    }
    handleCreateModify(payload)
  }

  useEffect(() => {
    if (!subcontractors)
      fetchEntities('subcontractors', {
        endpoint: subcontractorsEndpoint()
      })
  }, [subcontractors, fetchEntities])

  useEffect(() => {
    if (eventSelected && !isEmpty(subcontractorNames)) {
      setSubcontractorName(eventSelected.get('subcontractor_name'))
      setCost(eventSelected.get('cost'))
      setQuoteNumber(eventSelected.get('sales_quote'))
      setDescription(eventSelected.get('description'))
      if (
        isEmpty(
          subcontractorNames.filter(
            subcontractor => subcontractor.label === eventSelected.get('subcontractor_name')
          )
        )
      )
        setIsSubcontractorToCreate(true)
      else setIsSubcontractorToCreate(false)
    }
  }, [eventSelected, subcontractorNames])

  return (
    <EventSubcontractingFormWrapper>
      <StyledGrid container>
        <Grid item xs={12}>
          <RadioGroupField
            formDisabled={formDisabled}
            label={<FormattedMessage id="eventSubcontractingForm.subcontractor" />}
            labelRadioLeft="eventSubcontractingForm.input.subcontractor"
            labelRadioRight="eventSubcontractingForm.select.subcontractor"
            value={isSubcontractorToCreate}
            setValue={value => {
              setIsSubcontractorToCreate(value)
              setSubcontractorName(null)
            }}
            direction="column"
            align="flex-start"
          />
        </Grid>
        <Grid item xs={12}>
          {!isSubcontractorToCreate && (
            <Select
              disabled={formDisabled}
              label="eventSubcontractingForm.select.subcontractor"
              value={subcontractorName}
              onChange={e => {
                setSubcontractorName(e.target.value)
              }}
              options={subcontractorNames}
              isLoading={isSubcontractorsFetching}
            />
          )}
          {isSubcontractorToCreate && (
            <TextField
              disabled={formDisabled}
              width="100%"
              required={true}
              label={<FormattedMessage id="eventSubcontractingForm.input.subcontractor" />}
              value={subcontractorName}
              onChange={e => setSubcontractorName(e.target.value)}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            width="100%"
            required={true}
            disabled={formDisabled}
            type="number"
            label={<FormattedMessage id="eventSubcontractingForm.cost" />}
            value={cost || ''}
            onChange={e => setCost(e.target.value)}
            inputProps={{
              onInput: e => {
                e.target.value = Number(e.target.value)
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={formDisabled}
            width="100%"
            label={<FormattedMessage id="eventSubcontractingForm.quoteNumber" />}
            value={quoteNumber || ''}
            onChange={e => setQuoteNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={formDisabled}
            width="100%"
            rowsMax="6"
            label={<FormattedMessage id="eventSubcontractingForm.description" />}
            value={description || ''}
            onChange={e => setDescription(e.target.value)}
            multiline
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
    </EventSubcontractingFormWrapper>
  )
}

export default EventSubcontractingForm
