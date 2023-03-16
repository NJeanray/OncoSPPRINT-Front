import React, { useState, useEffect, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import { studyChoiceFieldsEndpoint } from 'app/api/endpoints'
import TextField from 'app/components/textField'
import Select from 'app/components/select'
import StudyFormWrapper from './StudyForm.styled'
import StudyFormButtons from './StudyFormButtons'

const StudyForm = ({
  projectSite,
  isStudyChoiceFieldsFetching,
  fetchEntities,
  action,
  setAction,
  studies,
  handleAmendStudy,
  handleCreateStudy,
  handleDeleteStudy,
  handleRefuseStudy,
  handleSignStudy,
  handleSubmitStudy,
  handleUpdateStudy,
  studySelected,
  projectSelected,
  studyTypes,
  sites,
  studyChoiceFields
}) => {
  const studyUnit = studies.size + 1
  const isFormDisabled = action !== 'create' && action !== 'update'
  const [studyState, setStudyState] = useState(null)
  const [type, setType] = useState(null)
  const [site, setSite] = useState(projectSite)
  const [name, setName] = useState(`ET ${studyUnit.toString()}00`)

  const initializeState = useCallback(() => {
    setType(studySelected.get('type') || null)
    setSite(studySelected.get('site') || null)
    setName(studySelected.get('name') || null)
    setStudyState(studySelected.get('state') || null)
  }, [studySelected])

  useEffect(() => {
    if (studySelected) {
      initializeState()
    }
    if (!studyChoiceFields && !isStudyChoiceFieldsFetching)
      fetchEntities('studyChoiceFields', {
        endpoint: studyChoiceFieldsEndpoint(),
        common: true
      })
  }, [
    isStudyChoiceFieldsFetching,
    studyChoiceFields,
    fetchEntities,
    initializeState,
    action,
    studySelected
  ])

  const isBtnCreateDisabled = () => !type || !site
  const isBtnSubmitDisabled = () => {
    if (action === 'create') return true

    return (
      !projectSelected.get('project_code') ||
      !projectSelected.get('contact_id') ||
      !projectSelected.get('client_id')
    )
  }

  const handleCreate = () => handleCreateStudy({ site, name, type })
  const handleCancel = () => {
    initializeState()
    setAction('view')
  }

  const handleSaveUpdate = () => {
    // TODO Maybe we need a check here
    if (site !== studySelected.get('site') || type !== studySelected.get('type'))
      handleUpdateStudy({ site, type })
  }

  return (
    <StudyFormWrapper>
      {action !== 'create' && (
        <TextField
          disabled
          value={studyState}
          width="100%"
          label={<FormattedMessage id="studyForm.input.status" />}
          margin="normal"
        />
      )}
      <TextField
        disabled
        value={name}
        width="100%"
        label={<FormattedMessage id="studyForm.input.name" />}
        margin="normal"
        required
      />
      <Select
        options={studyTypes}
        disabled={isFormDisabled}
        label="studyForm.select.types"
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <Select
        options={sites}
        disabled={isFormDisabled}
        label="studyForm.select.sites"
        value={site}
        onChange={e => setSite(e.target.value)}
        isOptionDisabled={optLabel => optLabel !== 'DIJ'}
      />
      <StudyFormButtons
        studyState={studyState}
        isBtnCreateDisabled={isBtnCreateDisabled()}
        isBtnSubmitDisabled={isBtnSubmitDisabled()}
        action={action}
        handleCreate={handleCreate}
        handleUpdate={() => setAction('update')}
        handleSaveUpdate={() => handleSaveUpdate()}
        handleAmend={() => handleAmendStudy()}
        handleSubmit={() => handleSubmitStudy()}
        handleSign={() => handleSignStudy()}
        handleRefuse={() => handleRefuseStudy()}
        handleCancel={handleCancel}
        handleDelete={() => handleDeleteStudy()}
      />
    </StudyFormWrapper>
  )
}

export default StudyForm
