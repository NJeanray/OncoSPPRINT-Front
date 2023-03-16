import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { projectDuplicateEndpoint, projectsEndpoint } from 'app/api/endpoints'
import ProjectForm from 'app/components/projectForm'
import SheetContainer from 'app/components/sheetContainer'
import TextTitle from 'app/components/textTitle/TextTitle'
import { useStateChanges } from 'app/hooks/useStateChanges'
import TextSubhead from 'app/components/textSubhead'
import { projectUpdatedText, studyCreatedText, manageProjectTitle } from './ManageProject.utils'
import StyledButton from 'app/components/styledButton'
import CustomSpinner from 'app/components/customSpinner'

const ManageProject = ({
  isProjectDuplicating,
  resetStateErrors,
  hasProjectDuplicateErrors,
  history,
  resetState,
  studyCreated,
  resetStateCreated,
  resetStateUpdated,
  projectUpdated,
  projectSelected,
  updateEntities,
  fetchEntities,
  projectDuplicate
}) => {
  const [action, setAction] = useState('view')
  const handleRefuseProject = React.useCallback(() => {
    updateEntities('projects', {
      endpoint: projectsEndpoint(projectSelected.get('id')),
      params: {
        state: 'refused'
      }
    })
  }, [projectSelected, updateEntities])

  useStateChanges(
    'projects',
    projectUpdated,
    'success',
    projectUpdatedText(projectUpdated),
    resetStateUpdated,
    setAction,
    'view'
  )

  useStateChanges(
    'studies',
    studyCreated,
    'success',
    studyCreatedText(studyCreated),
    resetStateCreated
  )

  useStateChanges(
    'projectDuplicate',
    hasProjectDuplicateErrors,
    'error',
    hasProjectDuplicateErrors ? hasProjectDuplicateErrors.state : '',
    resetStateErrors
  )

  useEffect(() => {
    if (projectDuplicate) {
      resetState('projectDuplicate')
      history.push('/')
    }
    // eslint-disable-next-line
  }, [projectDuplicate, resetState])

  const handleUpdateProject = React.useCallback(
    ({
      title,
      clientId,
      contactId,
      flux,
      site,
      ownerId,
      secondOwnerId,
      codeSequence,
      codeYearRef,
      description
    }) => {
      const getProjectCode = codeSequence ? codeYearRef.toString().concat(codeSequence) : '19'
      const projectSelectedUpdated = {
        id: projectSelected.get('id'),
        state: projectSelected.get('state'),
        title,
        site,
        type: flux,
        client_id: clientId,
        contact_id: contactId,
        owner_id: ownerId,
        project_code: getProjectCode,
        second_owner_id: secondOwnerId,
        description
      }

      updateEntities('projects', {
        endpoint: projectsEndpoint(projectSelected.get('id')),
        params: projectSelectedUpdated
      })
    },
    [projectSelected, updateEntities]
  )

  const handleDuplicate = () => {
    fetchEntities('projectDuplicate', {
      endpoint: projectDuplicateEndpoint(projectSelected.get('id'))
    })
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <SheetContainer>
        <TextTitle text={manageProjectTitle} />
        <ProjectForm
          action={action}
          setAction={setAction}
          projectSelected={projectSelected}
          refuseProject={handleRefuseProject}
          handleUpdateProject={handleUpdateProject}
        />
        <StyledButton
          variant="contained"
          onClick={handleDuplicate}
          style={{ marginBottom: '50px' }}
        >
          {isProjectDuplicating ? (
            <CustomSpinner type="line" backColor="#ffffff" />
          ) : (
            <FormattedMessage id="global.action.duplicate" />
          )}
        </StyledButton>
        <Card style={{ border: '1px solid #E8E8E8' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextSubhead text={<FormattedMessage id="projectsList.creationDate" />} />
              {moment(projectSelected.get('creation_date')).format('L')}
            </div>
            {projectSelected.has('modification_date') && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextSubhead text={<FormattedMessage id="projectsList.modificationDate" />} />
                {moment(projectSelected.get('modification_date')).format('L')}
              </div>
            )}
            {projectSelected.has('submitted_date') && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextSubhead text={<FormattedMessage id="projectsList.submissionDate" />} />
                {moment(projectSelected.get('submitted_date')).format('L')}
              </div>
            )}
            {projectSelected.has('accepted_date') && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextSubhead text={<FormattedMessage id="projectsList.acceptationDate" />} />
                {moment(projectSelected.get('accepted_date')).format('L')}
              </div>
            )}
            {projectSelected.has('refused_date') && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextSubhead text={<FormattedMessage id="projectsList.refuseDate" />} />
                {moment(projectSelected.get('refused_date')).format('L')}
              </div>
            )}
          </CardContent>
        </Card>
      </SheetContainer>
    </Box>
  )
}

export default withRouter(ManageProject)
