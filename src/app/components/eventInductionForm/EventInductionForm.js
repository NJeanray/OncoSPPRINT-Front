import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Grid } from '@material-ui/core'

import ListFormBtn from 'app/components/listFormBtn'
import TextError from 'app/components/textError'
import TextField from 'app/components/textField'
import BrickSelect from 'app/components/brickSelect'
import getBrickIdRequest from 'app/utils/getBrickIdRequest'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { PartContext } from 'app/contexts/PartProvider'
import Select from 'app/components/select'

const getBrickCategory = materialType => {
  if (materialType === 'fragment') return 'GREFFE'
  return 'INDUCTION'
}

const brickTypes = [
  {
    label: <FormattedMessage id="eventInductionForm.induction" />,
    value: 'induction'
  },
  {
    label: <FormattedMessage id="eventInductionForm.greffe" />,
    value: 'greffe'
  }
]

const EventInductionForm = ({
  brickParamsList,
  isBricksFetching,
  inductionNames,
  brickParamsValues
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
  const [inductionType, setInductionType] = useState(null)
  const [nbCell, setNbCell] = useState(0)
  const [animalsNumber, setAnimalsNumber] = useState(0)
  const isBtnDisabled = !inductionType
  const [brickType, setBrickType] = useState('induction')
  const isNbCellulesDisplay = partSelected.has('inducted_material_type')
    ? partSelected.get('inducted_material_type')?.toLowerCase() !== 'fragment'
    : brickType?.toLowerCase() !== 'greffe'

  useEffect(() => {
    setAnimalsNumber(nbAnimalsDefault)
  }, [nbAnimalsDefault])

  useEffect(() => {
    if (partSelected.get('inducted_material_type'))
      fetchBricks(getBrickCategory(partSelected.get('inducted_material_type')))
    else fetchBricks('INDUCTION')
    // eslint-disable-next-line
  }, [fetchBricks])

  useEffect(() => {
    if (eventSelected) {
      setAnimalsNumber(eventSelected.get('nb_animals'))
      setInductionType(eventSelected.get('brick_name'))
      setNbCell(eventSelected.get('nb_cell'))
    }
  }, [eventSelected])

  const handleClickBtn = async () => {
    const brickId = await getBrickIdRequest(
      action,
      eventSelected,
      partSelected.get('site'),
      partSelected.get('inducted_material_type')
        ? getBrickCategory(partSelected.get('inducted_material_type'))
        : brickType.toUpperCase(),
      inductionType,
      brickParamsValues
    )

    if (brickId === -1) setHasbrickParamsError(true)
    else {
      const payload = {
        brick_id: brickId,
        nb_cell: nbCell,
        nb_animals: animalsNumber
      }

      if (action === 'create') payload.type = 'induction'
      handleCreateModify(payload)
    }
  }

  function onSelectInductionType(inductionTypeSelected) {
    setHasbrickParamsError(false)
    setInductionType(inductionTypeSelected)
    fetchBrickParams(inductionTypeSelected)
  }

  return (
    <div style={{ width: '100%' }}>
      {hasBrickParamsError && (
        <TextError text={<FormattedMessage id="events.brickParamsError" />} />
      )}
      {!partSelected.get('inducted_material_type') && (
        <Select
          width="100%"
          label="eventInductionForm.brickType"
          value={brickType}
          onChange={e => {
            fetchBricks(e.target.value.toUpperCase())
            setBrickType(e.target.value)
            setInductionType(null)
          }}
          options={brickTypes}
        />
      )}
      <BrickSelect
        disabled={formDisabled}
        brickLabel="eventInductionForm.inductionType"
        onSelectBrick={e => onSelectInductionType(e.target.value)}
        brickValue={inductionType}
        isBrickLoading={isBricksFetching}
        brickOptions={inductionNames}
        brickParamsList={brickParamsList}
      />
      <Grid container spacing={4}>
        <Grid item xs>
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
        <Grid item xs>
          {isNbCellulesDisplay && (
            <TextField
              disabled={formDisabled}
              width="100%"
              required
              type="number"
              label={<FormattedMessage id="eventInductionForm.nbCellules" />}
              value={nbCell}
              onChange={e => setNbCell(e.target.value)}
              inputProps={{
                onInput: e => {
                  e.target.value = Number(e.target.value)
                },
                min: 0
              }}
            />
          )}
        </Grid>
      </Grid>
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

export default EventInductionForm
