import React, { useState, useEffect, useCallback } from 'react'
import { fromJS } from 'immutable'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import displayFormErrors from 'app/utils/displayFormErrors'
import { PartAnimalsDataProvider } from 'app/contexts/PartAnimalsDataProvider'
import { ethicalProtocolsEndpoint, studyChoiceFieldsEndpoint } from 'app/api/endpoints'
import RadioGroupField from 'app/components/radioGroupField'
import TumorLineRadio from 'app/components/tumorLineRadio'
import TextField from 'app/components/textField'
import Select from 'app/components/select'
import CustomSpinner from 'app/components/customSpinner'
import {
  getCurrentDate,
  initializeAnimalsData,
  healthyPartTypes,
  setAnimalsDataFromPartSelected
} from './PartForm.utils'
import PartFormWrapper from './PartForm.styled'

import CegidAnimalsForm from '../cegidAnimalsForm'
import PartFormButtons from './PartFormButtons'
import { getProjectErrorFieldName } from '../projectForm/ProjectForm.utils'

const PartForm = ({
  projectSite,
  disabledBtn,
  isStudyChoiceFieldsFetching,
  studyChoiceFields,
  handleDeletePart,
  handleUpdatePart,
  handleCreatePart,
  parts,
  sites,
  partTypes,
  isEthicalProtocolsFetching,
  ethicalProtocols,
  ethicalProtocolsProcedures,
  fetchEntities,
  action,
  setAction,
  partSelected,
  resetStateErrors,
  hasSinglePartErrors,
  isSinglelPartFetching,
  hasPartsErrors
}) => {
  const partUnit = parts ? parts.size + 1 : 0
  const isFormDisabled = action !== 'create' && action !== 'update'
  const [isInitialized, setIsInitialized] = useState(false)
  const [name, setName] = useState(`PART ${partUnit.toString()}`)
  const [title, setTitle] = useState(null)
  const [site, setSite] = useState(projectSite)
  const [type, setType] = useState(null)
  const [isPartHealthy, setIsPartHealthy] = useState(false)
  const [tumorLine, setTumorLine] = useState(null)
  const [defaultModel, setDefaultModel] = useState(null)
  const [inductedMaterialType, setInductedMaterialType] = useState(null)
  const [d0Date, setD0Date] = useState(getCurrentDate())
  const [ethicalProtocol, setEthicalProtocol] = useState(null)
  const [isMatrigelUsed, setIsMatrigelUsed] = useState(false)
  const [isTumorLineCreated, setIsTumorLineCreated] = useState(false)
  const [animalsData, setAnimalsData] = useState(fromJS(initializeAnimalsData()))
  const isBtnDisabled = !animalsData.get('animalId')
  const resetAnimalsData = () => setAnimalsData(fromJS(initializeAnimalsData()))
  const resetDefaultModel = () => setDefaultModel(null)

  const initializeState = useCallback(() => {
    setIsInitialized(true)
    setName(partSelected.get('name'))
    setType(partSelected.get('type'))
    setTitle(partSelected.get('title'))
    setSite(partSelected.get('site'))
    setD0Date(partSelected.get('starting_date'))
    setIsPartHealthy(!partSelected.has('tumor_line'))
    setTumorLine(partSelected.get('tumor_line'))
    setIsMatrigelUsed(partSelected.get('matrigel'))
    setEthicalProtocol(partSelected.get('ethical_protocol'))
    setIsTumorLineCreated(partSelected.get('new_tumor_line'))
    setInductedMaterialType(
      partSelected.has('inducted_material_type') ? partSelected.get('inducted_material_type') : null
    )
    setAnimalsDataFromPartSelected(setAnimalsData, partSelected)
  }, [partSelected])

  useEffect(() => {
    if (!ethicalProtocols)
      fetchEntities('ethicalProtocols', {
        endpoint: ethicalProtocolsEndpoint()
      })
  }, [fetchEntities, ethicalProtocols])

  useEffect(() => {
    if (!studyChoiceFields && !isStudyChoiceFieldsFetching)
      fetchEntities('studyChoiceFields', {
        endpoint: studyChoiceFieldsEndpoint(),
        common: true
      })
  }, [isStudyChoiceFieldsFetching, fetchEntities, studyChoiceFields])

  useEffect(() => {
    if (partSelected) {
      initializeState()
    }
  }, [initializeState, partSelected])

  function resetTumorLine() {
    setTumorLine(null)
    setInductedMaterialType(null)
  }

  function resetAnimalsDataAndDefaultModel() {
    resetAnimalsData()
    resetDefaultModel()
  }

  function onSelectPartType(typeSelected) {
    setType(typeSelected)
    if (
      partTypes
        .filter(item => item.value === typeSelected)[0]
        .partHealth.toLowerCase()
        .includes('healthy')
    )
      if (healthyPartTypes.includes(typeSelected.toLowerCase())) setIsPartHealthy(true)
      else setIsPartHealthy(false)
    resetTumorLine()
    resetAnimalsDataAndDefaultModel()
  }

  function handleChangeIsPartHealthy(value) {
    if (value)
      setAnimalsData(animalsData.set('isAnimalIrradiated', false).set('irradiation_dose', null))
    setIsPartHealthy(value)
    resetAnimalsDataAndDefaultModel()
  }

  function handleSetTumorLine(tumorLineToSet) {
    setTumorLine(tumorLineToSet)
    resetAnimalsData()
  }

  function handleCreateModify() {
    const payload = {
      site,
      title,
      type,
      starting_date: d0Date,
      tumor_line: isPartHealthy ? null : tumorLine,
      matrigel: isMatrigelUsed,
      ethical_protocol: ethicalProtocol,
      new_tumor_line: isPartHealthy ? null : isTumorLineCreated,
      animal_id: animalsData.get('animalId'),
      irradiation_dose: animalsData.get('irradiationDose'),
      inducted_material_type: inductedMaterialType,
      inoculation_method: animalsData.get('animalInoculationMethod'),
      animal_per_cage: animalsData.get('animalsPerCage'),
      animal_irradiation: animalsData.get('isAnimalIrradiated')
    }

    if (action === 'create') handleCreatePart(payload)
    else handleUpdatePart(payload)
  }

  function handleCancel() {
    initializeState()
    setAction('view')
    resetStateErrors('parts')
  }

  if (isSinglelPartFetching) {
    return <CustomSpinner type="circle" />
  }

  return (
    <PartFormWrapper>
      {hasPartsErrors && displayFormErrors(hasPartsErrors, getProjectErrorFieldName)}
      {hasSinglePartErrors && displayFormErrors(hasSinglePartErrors, getProjectErrorFieldName)}
      <Grid container>
        <Grid item xs={6}>
          <TextField
            disabled
            value={name || ''}
            label={<FormattedMessage id="partForm.input.name" />}
            margin="normal"
            required
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={isFormDisabled}
            value={title || ''}
            label={<FormattedMessage id="partForm.input.title" />}
            margin="normal"
            required
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={isFormDisabled}
            label="partForm.input.site"
            value={site}
            onChange={e => setSite(e.target.value)}
            options={sites}
            isOptionDisabled={optLabel => optLabel !== 'DIJ'}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={isFormDisabled}
            required
            label="partForm.input.type"
            value={type}
            onChange={e => onSelectPartType(e.target.value)}
            options={partTypes}
            isOptionDisabled={optLabel => {
              return optLabel.toLowerCase() === 'pk'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            required
            disabled={isFormDisabled}
            label="partForm.input.ethicalProtocol"
            value={ethicalProtocol || ''}
            onChange={e => setEthicalProtocol(e.target.value)}
            options={ethicalProtocolsProcedures}
            isLoading={isEthicalProtocolsFetching}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={isFormDisabled}
            label={<FormattedMessage id="partForm.input.d0date" />}
            value={d0Date}
            type="date"
            onChange={e => setD0Date(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <RadioGroupField
            formDisabled={isFormDisabled}
            label={<FormattedMessage id={'partForm.input.isTumorModel'} />}
            labelRadioRight="global.boolean.yes"
            labelRadioLeft="global.boolean.no"
            value={isPartHealthy}
            setValue={value => handleChangeIsPartHealthy(value)}
            direction="column"
            align="flex-start"
          />
        </Grid>
        {!isPartHealthy && (
          <TumorLineRadio
            isTumorLineCreated={isTumorLineCreated}
            setIsTumorLineCreated={setIsTumorLineCreated}
            partSelected={partSelected}
            setDefaultModel={setDefaultModel}
            handleSetTumorLine={handleSetTumorLine}
            tumorLine={tumorLine}
            formDisabled={isFormDisabled}
            inductedMaterialType={inductedMaterialType}
            setInductedMaterialType={setInductedMaterialType}
            setIsMatrigelUsed={setIsMatrigelUsed}
            isMatrigelUsed={isMatrigelUsed}
          />
        )}
        <Grid item xs={12}>
          <RadioGroupField
            formDisabled={!tumorLine || isFormDisabled}
            value={isMatrigelUsed}
            setValue={value => setIsMatrigelUsed(value)}
            label={<FormattedMessage id="partForm.input.matrigel" />}
            direction="row"
            content="space-between"
          />
        </Grid>
        <PartAnimalsDataProvider value={{ animalsData, setAnimalsData, isFormDisabled, action }}>
          <CegidAnimalsForm
            isPartHealthy={isPartHealthy}
            setIsInitialized={setIsInitialized}
            isInitialized={isInitialized}
            partSelected={partSelected}
            defaultModel={defaultModel}
          />
        </PartAnimalsDataProvider>
      </Grid>
      {!disabledBtn && (
        <PartFormButtons
          isBtnDisabled={isBtnDisabled}
          action={action}
          handleCreate={handleCreateModify}
          handleUpdate={() => setAction('update')}
          handleSaveUpdate={handleCreateModify}
          handleCancel={handleCancel}
          handleDelete={() => handleDeletePart()}
        />
      )}
    </PartFormWrapper>
  )
}

export default PartForm
