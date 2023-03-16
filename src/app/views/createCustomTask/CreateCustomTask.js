import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextTitle from '../../components/textTitle/TextTitle'
import CustomTaskForm from '../../components/customTaskForm'
import StyledModal from '../../components/styledModal/StyledModal'
import { customTasksEndpoint } from 'app/api/endpoints'

const CreateCustomTask = ({ postEntities, projectId, studyId, partId, open, onClose }) => {
  const handleCreateCustomTask = customTaskField => {
    postEntities('customTasks', {
      endpoint: customTasksEndpoint(projectId, studyId, partId),
      params: customTaskField
    })
  }

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="customTask.modalCreating.title" />} />
      <CustomTaskForm action="create" handleCreateCustomTask={handleCreateCustomTask} />
    </StyledModal>
  )
}

export default CreateCustomTask
