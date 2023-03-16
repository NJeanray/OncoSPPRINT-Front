import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import Grid from '@material-ui/core/Grid'

import Alert from 'app/components/alert'
import { modelsEndpoint } from 'app/api/endpoints'
import RadioGroupField from 'app/components/radioGroupField'
import Select from 'app/components/select'
import TextField from 'app/components/textField'
import defaultModelsFields from './TumorLineRadio.utils'

const TumorLineRadio = ({
  isTumorLineCreated = false,
  setIsTumorLineCreated,
  inductedMaterialType,
  modelsTumorLines,
  isModelsFetching,
  models,
  partSelected,
  fetchEntities,
  formDisabled,
  tumorLine,
  setIsMatrigelUsed,
  isMatrigelUsed,
  handleSetTumorLine,
  setInductedMaterialType,
  inductedMaterialTypesOptions,
  setDefaultModel
}) => {
  const [isWarningDisplayed, setIsWarningDisplayed] = useState(null)

  useEffect(() => {
    if (partSelected && partSelected.has('inducted_material_type')) setIsTumorLineCreated(true)
  }, [partSelected, setIsTumorLineCreated])

  useEffect(() => {
    if (!models)
      fetchEntities('models', {
        endpoint: modelsEndpoint()
      })
  }, [models, fetchEntities])

  function checkModelInductedMaterialType(modelSelected) {
    if (modelSelected[0].inducted_material_type === 'fragment') setIsWarningDisplayed(true)
    else if (isWarningDisplayed) setIsWarningDisplayed(false)
  }

  function checkModelIsMatrigelUsed(modelSelected) {
    if (modelSelected[0].matrigel) setIsMatrigelUsed(true)
    else if (isMatrigelUsed) setIsMatrigelUsed(false)
  }

  function handleSetDefaultModelFromModelFiltered(modelFiltered) {
    const initializeDefaultModel = modelFiltered.reduce((acc, item) => {
      defaultModelsFields.forEach(defaultItem => {
        if (!isEmpty(acc[defaultItem.key]))
          acc[defaultItem.key] = !acc[defaultItem.key].includes(
            item[defaultItem.field].toString().toLowerCase()
          )
            ? [...acc[defaultItem.key], item[defaultItem.field].toLowerCase()]
            : acc[defaultItem.key]
        else
          acc[defaultItem.key] = item[defaultItem.field]
            ? [item[defaultItem.field].toString().toLowerCase()]
            : []
      })
      return acc
    }, {})

    setDefaultModel(initializeDefaultModel)
  }

  function onSelectTumorLine(tumorLineSelected) {
    const modelFiltered = models
      .valueSeq()
      .toJS()
      .filter(item => item.tumor_line === tumorLineSelected)

    checkModelInductedMaterialType(modelFiltered)
    checkModelIsMatrigelUsed(modelFiltered)
    handleSetDefaultModelFromModelFiltered(modelFiltered)
    handleSetTumorLine(tumorLineSelected)
  }

  function handleChangeTumorLineRadio(newValue) {
    setIsTumorLineCreated(newValue)
    if (!newValue) setInductedMaterialType(null)
    handleSetTumorLine(null)
    setDefaultModel(null)
  }

  return (
    <>
      <Grid item xs={12}>
        <RadioGroupField
          formDisabled={formDisabled}
          label={<FormattedMessage id="partForm.input.tumorLineRadio" />}
          labelRadioRight="partForm.input.selectTumorLine"
          labelRadioLeft="partForm.input.createTumorLine"
          value={isTumorLineCreated}
          setValue={value => handleChangeTumorLineRadio(value)}
          direction="column"
          align="flex-start"
        />
      </Grid>
      <Grid item xs={12}>
        {isWarningDisplayed && (
          <Alert severity="warning" onClose={() => setIsWarningDisplayed(false)}>
            <FormattedMessage id="partForm.snackbar.tumorLineSelected" />
          </Alert>
        )}
      </Grid>
      {!isTumorLineCreated ? (
        <Grid item xs={6}>
          <Select
            disabled={formDisabled}
            required
            label="partForm.input.tumorLine"
            value={tumorLine}
            onChange={e => onSelectTumorLine(e.target.value)}
            options={modelsTumorLines}
            isLoading={isModelsFetching}
          />
        </Grid>
      ) : (
        <Grid container xs={12}>
          <Grid item xs={6}>
            <TextField
              disabled={formDisabled}
              value={tumorLine || ''}
              label={<FormattedMessage id="partForm.input.tumorLine" />}
              margin="normal"
              onChange={e => handleSetTumorLine(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              disabled={formDisabled}
              value={inductedMaterialType}
              label="partForm.input.inductedMaterialType"
              onChange={e => setInductedMaterialType(e.target.value)}
              options={inductedMaterialTypesOptions}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default TumorLineRadio
