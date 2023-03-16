import React, { useState, useCallback, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'

import {
  clientsEndpoint,
  studyChoiceFieldsEndpoint,
  contactsEndpoint,
  usersEndpoint,
  projectsListEndpoint
} from 'app/api/endpoints'
import StyledGrid from 'app/components/styledGrid'
import CustomSpinner from 'app/components/customSpinner'
import Select from 'app/components/select'
import TextField from 'app/components/textField'
import displayFormErrors from 'app/utils/displayFormErrors'
import SearchSelect from 'app/components/searchSelect'
import ClearButton from 'app/components/clearButton'
import Alert from 'app/components/alert/Alert'
import ProjectFormWrapper from './ProjectForm.styled'
import { getYearsReference, getProjectErrorFieldName } from './ProjectForm.utils'
import ProjectFormButtons from './ProjectFormButtons'

const ProjectForm = ({
  isStudyChoiceFieldsFetching,
  isUsersLoading,
  isContactsFetching,
  isProjectsFetching,
  action,
  clientsName,
  clientsAddress,
  contactsClientEmail,
  createProject,
  fetchEntities,
  handleUpdateProject,
  hasProjectsErrors,
  nameUsers,
  projectSelected,
  projectTypes,
  refuseProject,
  resetStateErrors,
  sites,
  studyChoiceFields,
  setAction,
  users,
  projectSequence
}) => {
  const [clientToDisplay, setClientToDisplay] = useState(action === 'update')
  const initializeCodeYearRef = getYearsReference()[0].label
  const isFormDisabled = action !== 'create' && action !== 'update'
  const [clientName, setClientName] = useState(null)
  const [clientId, setClientId] = useState(null)
  const [codeSequence, setCodeSequence] = useState('')
  const [codeYearRef, setCodeYearRef] = useState(initializeCodeYearRef)
  const [contact, setContact] = useState(null)
  const [description, setDescription] = useState(null)
  const [flux, setFlux] = useState(null)
  const [ownerId, setOwnerId] = useState(null)
  const [secondOwnerId, setSecondOwnerId] = useState(null)
  const [site, setSite] = useState(null)
  const [title, setTitle] = useState(null)
  const [isAlertDisplayed, setIsAlertDisplayed] = useState(false)

  const initializeState = useCallback(() => {
    setClientName(
      projectSelected && projectSelected.has('client_name')
        ? {
            label: projectSelected?.get('client_name'),
            value: projectSelected?.get('client_name')
          }
        : null
    )
    setClientId(projectSelected.get('client_id') || null)
    setCodeSequence(
      projectSelected
        .get('project_code')
        ?.toString()
        .substring(2, 6) || ''
    )
    setCodeYearRef(
      projectSelected
        .get('project_code')
        ?.toString()
        .substring(0, 2) || initializeCodeYearRef
    )
    setContact(
      projectSelected && projectSelected.has('contact_id')
        ? {
            label: projectSelected?.get('contact_name'),
            value: projectSelected?.get('contact_id')
          }
        : null
    )
    setDescription(projectSelected.get('description') || null)
    setFlux(projectSelected.get('type') || null)
    setOwnerId(projectSelected.get('owner_id') || null)
    setSecondOwnerId(projectSelected.get('second_owner_id') || null)
    setSite(projectSelected.get('site') || null)
    setTitle(projectSelected.get('title') || null)
  }, [initializeCodeYearRef, projectSelected])

  const fetchClients = useCallback(
    name => {
      const params = name ? { name } : {}

      fetchEntities('clients', {
        endpoint: clientsEndpoint(),
        params
      })
    },
    [fetchEntities]
  )

  const fetchContactsClient = useCallback(
    (email, clientSelectedId) => {
      const params = email ? { email } : {}

      fetchEntities('contactsClient', {
        endpoint: contactsEndpoint(clientSelectedId),
        params
      })
    },
    [fetchEntities]
  )

  const fetchProjectWithCodeSequence = codeSeq =>
    fetchEntities('projectSequence', {
      endpoint: projectsListEndpoint(),
      params: {
        project_code: codeYearRef.toString().concat(codeSeq)
      }
    })

  useEffect(() => {
    if (projectSequence && codeSequence && codeSequence.length === 4) {
      if (projectSequence.size !== 0) setIsAlertDisplayed(true)
      else setIsAlertDisplayed(false)
    }
    // eslint-disable-next-line
  }, [projectSequence])

  useEffect(() => {
    if (!clientToDisplay && action === 'update') setClientToDisplay(true)
    else setClientToDisplay(false)
    // eslint-disable-next-line
  }, [action])

  useEffect(() => {
    if (!users && !isUsersLoading) fetchEntities('users', { endpoint: usersEndpoint() })
  }, [users, isUsersLoading, fetchEntities])

  useEffect(() => {
    if (action === 'create') fetchClients()
    // eslint-disable-next-line
  }, [action])

  useEffect(() => {
    if (!studyChoiceFields && !isStudyChoiceFieldsFetching)
      fetchEntities('studyChoiceFields', {
        endpoint: studyChoiceFieldsEndpoint(),
        common: true
      })
  }, [isStudyChoiceFieldsFetching, fetchEntities, studyChoiceFields])

  const initializeStateAndFetchEntities = () => {
    if (projectSelected) {
      initializeState()
      fetchClients(projectSelected.get('client_name') || '')
      if (projectSelected.has('client_id'))
        fetchContactsClient(null, projectSelected.get('client_id'))
    }
  }
  useEffect(() => {
    if (projectSelected && !flux) {
      initializeStateAndFetchEntities()
    }
    // eslint-disable-next-line
  }, [projectSelected])

  const onSelectClientName = clientSelected => {
    setClientName(clientSelected)
    setClientId(null)
    setContact(null)
  }

  function onSelectClientAddress(clientSelectedId) {
    if (clientSelectedId) {
      fetchContactsClient(null, clientSelectedId)
    }
    setClientId(clientSelectedId)
  }

  const handleCreateModify = () => {
    const paramsToSend = {
      title,
      clientId,
      contactId: contact?.value,
      flux,
      site,
      ownerId,
      secondOwnerId,
      codeSequence,
      codeYearRef,
      description
    }
    if (action === 'create') {
      createProject(paramsToSend)
    } else {
      handleUpdateProject(paramsToSend)
    }
  }

  const handleCancel = () => {
    initializeState()
    initializeStateAndFetchEntities()
    setAction('view')
    resetStateErrors('projects')
  }

  if (isProjectsFetching) {
    return <CustomSpinner type="circle" />
  }

  return (
    <ProjectFormWrapper>
      {hasProjectsErrors && displayFormErrors(hasProjectsErrors, getProjectErrorFieldName)}
      {isAlertDisplayed && (
        <Alert severity="warning" onClose={() => {}}>
          <FormattedMessage id="projectForm.alert.codeSequenceAlreadyExist" />
        </Alert>
      )}
      {action !== 'create' && projectSelected && !projectSelected.get('project_code') && (
        <Alert severity="warning" onClose={() => {}}>
          <FormattedMessage id="projectForm.alert.codeSequenceDoNotExist" />
        </Alert>
      )}
      <StyledGrid container style={{ marginTop: '15px' }}>
        <Grid item xs={6}>
          <TextField
            disabled={isFormDisabled}
            value={title || ''}
            label={<FormattedMessage id="projectForm.input.title" />}
            margin="normal"
            required
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <div className="project-form__code-label-inputs-wrapper">
            <InputLabel htmlFor="code-label" className="code-label" required>
              <FormattedMessage id="projectForm.input.code" />
            </InputLabel>
            <div className="code-wrapper">
              <div className="project-form__code-year-ref">
                <Select
                  disabled={isFormDisabled}
                  value={codeYearRef || ''}
                  onChange={e => setCodeYearRef(e.target.value)}
                  options={getYearsReference()}
                />
              </div>
              <TextField
                disabled={isFormDisabled}
                type="number"
                value={codeSequence}
                onChange={e => {
                  if (e.target.value.length === 4) fetchProjectWithCodeSequence(e.target.value)
                  else setIsAlertDisplayed(false)
                  setCodeSequence(e.target.value)
                }}
                onInput={e => {
                  e.target.value = e.target.value.slice(0, 4)
                }}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={isFormDisabled}
            label="projectForm.input.flux"
            value={flux}
            onChange={e => setFlux(e.target.value)}
            options={projectTypes}
            isOptionDisabled={optLabel => {
              return optLabel.toLowerCase() !== 'service'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={isFormDisabled}
            required
            label="projectForm.input.site"
            value={site}
            onChange={e => setSite(e.target.value)}
            options={sites}
            isOptionDisabled={optLabel => optLabel !== 'DIJ'}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isLoading={isUsersLoading}
            disabled={isFormDisabled}
            required
            label="projectForm.input.studyDirector"
            value={ownerId}
            onChange={e => setOwnerId(e.target.value)}
            options={nameUsers}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            isLoading={isUsersLoading}
            disabled={isFormDisabled}
            label="projectForm.input.studyDirectorAssociate"
            value={secondOwnerId}
            onChange={e => setSecondOwnerId(e.target.value)}
            options={nameUsers}
          />
        </Grid>
        <Grid item xs={6}>
          {clientToDisplay ? (
            <div style={{ display: 'flex' }}>
              <TextField
                disabled
                width="100%"
                label={<FormattedMessage id="projectForm.input.clientName" />}
                value={clientName?.label}
              />
              <ClearButton
                onClickFn={() => {
                  onSelectClientName('')
                  setClientToDisplay(false)
                  fetchClients()
                }}
              />
            </div>
          ) : (
            <SearchSelect
              value={clientName}
              setValue={setClientName}
              fetchOptions={fetchClients}
              options={clientsName}
              disabled={isFormDisabled}
              label="projectForm.input.clientName"
              required
              onSelect={itemSelected => onSelectClientName(itemSelected)}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={isFormDisabled || !clientName}
            label="projectForm.input.clientAddress"
            value={clientId}
            onChange={e => onSelectClientAddress(e.target.value)}
            options={
              clientName &&
              clientsAddress &&
              clientsAddress.filter(client => client.name === clientName.value)
            }
          />
        </Grid>
        <Grid item xs={6}>
          <SearchSelect
            isLoading={isContactsFetching}
            value={contact}
            setValue={setContact}
            fetchOptions={fetchContactsClient}
            fetchParam={clientId}
            options={contactsClientEmail}
            disabled={!clientId || isFormDisabled}
            label="projectForm.input.contact"
            required
            onSelect={itemSelected => setContact(itemSelected)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={isFormDisabled}
            value={description || ''}
            label={<FormattedMessage id="projectForm.input.description" />}
            margin="normal"
            multiline
            rowsMax="6"
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>
      </StyledGrid>
      <ProjectFormButtons
        projectState={action !== 'create' ? projectSelected.get('state') : null}
        action={action}
        handleCreate={handleCreateModify}
        handleRefuse={refuseProject}
        handleCancel={handleCancel}
        handleUpdate={() => setAction('update')}
        handleSaveUpdate={handleCreateModify}
      />
    </ProjectFormWrapper>
  )
}

export default ProjectForm
