import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { studyDuplicateEndpoint, studiesEndpoint, projectsEndpoint } from 'app/api/endpoints'
import SheetContainer from 'app/components/sheetContainer'
import StudyForm from 'app/components/studyForm'
import TextTitle from 'app/components/textTitle/TextTitle'
import { useStateChanges } from 'app/hooks/useStateChanges'
import TextSubhead from 'app/components/textSubhead/TextSubhead'
import { studyUpdatedText, partCreatedText, manageStudyTitle } from './ManageStudy.utils'
import { SnackbarContext } from 'app/contexts/SnackbarProvider'
import StyledButton from 'app/components/styledButton'
import CustomSpinner from 'app/components/customSpinner'

const StudyHistoric = ({ studySelected }) => (
  <Card style={{ border: '1px solid #E8E8E8', marginTop: '30px' }}>
    <CardContent>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextSubhead text={<FormattedMessage id="projectsList.creationDate" />} />
        {moment(studySelected.get('creation_date')).format('L')}
      </div>
      {studySelected.has('modification_date') && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSubhead text={<FormattedMessage id="projectsList.modificationDate" />} />
          {moment(studySelected.get('modification_date')).format('L')}
        </div>
      )}
      {studySelected.has('submitted_date') && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSubhead text={<FormattedMessage id="projectsList.submissionDate" />} />
          {moment(studySelected.get('submitted_date')).format('L')}
        </div>
      )}
      {studySelected.has('amended_date') && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSubhead text={<FormattedMessage id="manageStudy.amendDate" />} />
          {moment(studySelected.get('amended_date')).format('L')}
        </div>
      )}
      {studySelected.has('signed_date') && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSubhead text={<FormattedMessage id="manageStudy.signedDate" />} />
          {moment(studySelected.get('signed_date')).format('L')}
        </div>
      )}
      {studySelected.has('refused_date') && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextSubhead text={<FormattedMessage id="projectsList.refuseDate" />} />
          {moment(studySelected.get('refused_date')).format('L')}
        </div>
      )}
    </CardContent>
  </Card>
)

const ManageStudy = ({
  isStudyDuplicating,
  fetchStudies,
  studyDuplicate,
  fetchEntities,
  projectSite,
  singlePartCreated,
  hasStudyDuplicateErrors,
  resetState,
  hasStudiesErrors,
  projectSelected,
  studySelected,
  updateEntities,
  deleteEntities,
  history,
  studiesUpdated,
  resetStateUpdated,
  resetStateErrors
}) => {
  const [action, setAction] = useState('view')
  const projectId = projectSelected.get('id')
  const { setLocationStateHasChanged } = useContext(SnackbarContext)

  const handleUpdateStudy = React.useCallback(
    params => {
      updateEntities('studies', {
        endpoint: studiesEndpoint(projectId, studySelected.get('id')),
        params
      })
      setLocationStateHasChanged(false)
    },
    [projectId, studySelected, updateEntities, setLocationStateHasChanged]
  )

  const handleDeleteStudy = React.useCallback(() => {
    deleteEntities('studies', {
      endpoint: studiesEndpoint(projectId, studySelected.get('id')),
      params: studySelected
    })

    history.push(`/projects/${projectId}`)
  }, [deleteEntities, history, projectId, studySelected])

  function actionStudyUpdated() {
    setAction('view')
    fetchStudies()
    fetchEntities('projects', { endpoint: projectsEndpoint(projectId) })
  }

  const handleDuplicate = () => {
    fetchEntities('studyDuplicate', {
      endpoint: studyDuplicateEndpoint(projectId, studySelected.get('id'))
    })
  }

  useStateChanges(
    'studies',
    studiesUpdated,
    'success',
    studyUpdatedText(studiesUpdated),
    resetStateUpdated,
    actionStudyUpdated,
    null
  )

  useStateChanges(
    'singlePart',
    singlePartCreated,
    'success',
    partCreatedText(singlePartCreated),
    resetState
  )

  useStateChanges(
    'studies',
    hasStudiesErrors,
    'error',
    hasStudiesErrors ? hasStudiesErrors.state : '',
    resetStateErrors
  )

  useStateChanges(
    'studyDuplicate',
    hasStudyDuplicateErrors,
    'error',
    hasStudyDuplicateErrors ? hasStudyDuplicateErrors.state : '',
    resetStateErrors
  )

  useEffect(() => {
    if (studyDuplicate) {
      resetState('studyDuplicate')
      fetchStudies()
    }
    // eslint-disable-next-line
  }, [studyDuplicate, resetState])

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <SheetContainer>
        <TextTitle text={manageStudyTitle} />
        <StudyForm
          projectSite={projectSite}
          studySelected={studySelected}
          projectSelected={projectSelected}
          action={action}
          setAction={setAction}
          handleUpdateStudy={handleUpdateStudy}
          handleAmendStudy={() => handleUpdateStudy({ state: 'amended' })}
          handleSubmitStudy={() => handleUpdateStudy({ state: 'submitted' })}
          handleSignStudy={() => handleUpdateStudy({ state: 'signed' })}
          handleRefuseStudy={() => handleUpdateStudy({ state: 'refused' })}
          handleDeleteStudy={handleDeleteStudy}
        />
        <StyledButton
          variant="contained"
          onClick={handleDuplicate}
          style={{ marginBottom: '50px' }}
        >
          {isStudyDuplicating ? (
            <CustomSpinner type="line" backColor="#ffffff" />
          ) : (
            <FormattedMessage id="global.action.duplicate" />
          )}
        </StyledButton>
        {studySelected && <StudyHistoric studySelected={studySelected} />}
      </SheetContainer>
    </Box>
  )
}

export default ManageStudy
