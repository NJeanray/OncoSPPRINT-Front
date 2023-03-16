import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import ListFormBtn from 'app/components/listFormBtn'
import TextField from 'app/components/textField'
import TextError from 'app/components/textError'
import BrickSelect from 'app/components/brickSelect'
import getBrickIdRequest from 'app/utils/getBrickIdRequest'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { PartContext } from 'app/contexts/PartProvider'

const brickCategory = 'MONITORING'

const EventMonitoringForm = ({
  brickParamsValues,
  brickParamsList,
  brickParams,
  isBricksFetching,
  monitoringNames
}) => {
  const { partSelected } = useContext(PartContext)
  const {
    action,
    formDisabled,
    fetchBricks,
    fetchBrickParams,
    handleCreateModify,
    eventSelected,
    nbAnimalsDefault
  } = useContext(EventFormContext)
  const [hasBrickParamsError, setHasbrickParamsError] = useState(false)
  const [monitoringType, setMonitoringType] = useState(null)
  const [animalsNumber, setAnimalsNumber] = useState(0)
  const isBtnDisabled = !monitoringType || (brickParams && brickParams.get('isFetching'))

  useEffect(() => {
    setAnimalsNumber(nbAnimalsDefault)
  }, [nbAnimalsDefault])

  useEffect(() => {
    if (eventSelected) {
      setAnimalsNumber(eventSelected.get('nb_animals'))
      setMonitoringType(eventSelected.get('brick_name'))
    }
  }, [eventSelected])

  const handleClickBtn = async () => {
    const brickId = await getBrickIdRequest(
      action,
      eventSelected,
      partSelected.get('site'),
      brickCategory,
      monitoringType,
      brickParamsValues
    )

    if (brickId === -1) setHasbrickParamsError(true)
    else {
      const payload = {
        brick_id: brickId,
        nb_animals: animalsNumber
      }

      if (action === 'create') payload.type = 'monitoring'
      handleCreateModify(payload)
    }
  }

  useEffect(() => {
    fetchBricks(brickCategory)
  }, [fetchBricks])

  function onSelectMonitoringType(monitoringTypeSelected) {
    setMonitoringType(monitoringTypeSelected)
    fetchBrickParams(monitoringTypeSelected)
  }
  return (
    <div>
      {hasBrickParamsError && (
        <TextError text={<FormattedMessage id="events.brickParamsError" />} />
      )}
      <BrickSelect
        disabled={formDisabled}
        brickLabel="eventMonitoringForm.monitoringType"
        onSelectBrick={e => onSelectMonitoringType(e.target.value)}
        brickValue={monitoringType}
        isBrickLoading={isBricksFetching}
        brickOptions={monitoringNames}
        brickParamsList={brickParamsList}
      />
      <Grid item xs={6}>
        <TextField
          disabled={formDisabled}
          width="100%"
          required
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
      {!formDisabled && (
        <Grid item xs={12}>
          <ListFormBtn
            isBtnDisabled={isBtnDisabled}
            action={action}
            handleCreate={handleClickBtn}
            handleModify={handleClickBtn}
          />
        </Grid>
      )}
    </div>
  )
}

export default EventMonitoringForm
