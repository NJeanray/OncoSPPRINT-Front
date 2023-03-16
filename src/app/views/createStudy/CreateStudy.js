import { studiesEndpoint } from 'app/api/endpoints'
import StudyForm from 'app/components/studyForm'
import StyledModal from 'app/components/styledModal/StyledModal'
import TextTitle from 'app/components/textTitle/TextTitle'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useParams } from 'react-router-dom'

const CreateStudy = ({ projectSite, open, onClose, postEntities }) => {
  const { projectId } = useParams()

  const handleCreateStudy = ({ type, site }) => {
    postEntities('studies', {
      endpoint: studiesEndpoint(projectId),
      params: {
        site,
        type
      }
    })
    onClose()
  }

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="createStudy.title" />} />
      <StudyForm action="create" projectSite={projectSite} handleCreateStudy={handleCreateStudy} />
    </StyledModal>
  )
}

export default CreateStudy
