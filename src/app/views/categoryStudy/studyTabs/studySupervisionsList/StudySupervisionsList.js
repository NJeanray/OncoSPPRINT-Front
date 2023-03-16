import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { studySupervisionsEndpoint } from 'app/api/endpoints'
import TextTitle from 'app/components/textTitle/TextTitle'
import StyledModal from 'app/components/styledModal/StyledModal'
import StudySupervisionsForm from 'app/components/studySupervisionForm'
import CustomSpinner from 'app/components/customSpinner'
import StudySupervisionsListTable from './StudySupervisionsListTable'
import StudySupervisionsListWrapper from './StudySupervisionsList.styled'

const StudySupervisions = ({
  studyState,
  fetchEntities,
  studySupervisionUpdated,
  isStudySupervisionsLoading,
  projectId,
  resetStateErrors,
  studyId,
  studySupervisions,
  updateEntities,
  resetStateUpdated,
  studySupervisionsTable
}) => {
  const [studySupervisionSelected, setStudySupervisionSelected] = React.useState(null)
  const isStudySupervisionsFetching = studySupervisions && studySupervisions.get('isFetching')

  useEffect(() => {
    if (studyId && !isStudySupervisionsLoading) {
      fetchEntities('studySupervisions', {
        endpoint: studySupervisionsEndpoint(projectId, studyId)
      })
    }
    // eslint-disable-next-line
  }, [studyId])

  useEffect(() => {
    if (studySupervisionUpdated) {
      setStudySupervisionSelected(null)
      resetStateUpdated('studySupervisions')
    }
  }, [studySupervisionUpdated, setStudySupervisionSelected, resetStateUpdated])

  if (isStudySupervisionsFetching)
    return (
      <StudySupervisionsListWrapper fetching={true.toString()}>
        <CustomSpinner type="swish" wrapper />
      </StudySupervisionsListWrapper>
    )

  function handleUpdateStudySupervision(workers) {
    updateEntities('studySupervisions', {
      endpoint: studySupervisionsEndpoint(projectId, studyId, studySupervisionSelected.get('id')),
      params: {
        id: studySupervisionSelected.get('id'),
        type: studySupervisionSelected.get('type'),
        workers
      }
    })
  }

  if (isStudySupervisionsFetching) return <CustomSpinner type="square" wrapper />

  return (
    <StudySupervisionsListWrapper>
      <StudySupervisionsListTable
        studySupervisionsTable={studySupervisionsTable}
        handleSelectStudySupervision={studySupervisionId => {
          setStudySupervisionSelected(studySupervisions.get(studySupervisionId.toString()))
        }}
        studyState={studyState}
      />
      <StyledModal
        open={studySupervisionSelected}
        onClose={() => {
          resetStateErrors('studySupervisions')
          setStudySupervisionSelected(null)
        }}
      >
        <TextTitle text={<FormattedMessage id="studySupervision.modalModifying.title" />} />
        <StudySupervisionsForm
          handleUpdateStudySupervision={handleUpdateStudySupervision}
          studySupervisionSelected={studySupervisionSelected}
        />
      </StyledModal>
    </StudySupervisionsListWrapper>
  )
}

StudySupervisions.whyDidYouRender = true

export default React.memo(StudySupervisions)
