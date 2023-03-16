import React from 'react'
import { FormattedMessage } from 'react-intl'
import StyledModal from '../../components/styledModal/StyledModal'
import TextTitle from '../../components/textTitle/TextTitle'
import CustomTaskForm from '../../components/customTaskForm'
import { customTasksEndpoint } from '../../api/endpoints'

const ModifyCustomTask = ({
  projectId,
  studyId,
  partId,
  updateEntities,
  customTaskSelected,
  open,
  onClose
}) => {
  const handleModifyCustomTask = customTasksFields =>
    updateEntities('customTasks', {
      endpoint: customTasksEndpoint(projectId, studyId, partId, customTaskSelected.get('id')),
      params: customTasksFields
    })

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="customTask.modalModifying.title" />} />
      <CustomTaskForm
        handleModifyCustomTask={handleModifyCustomTask}
        action="update"
        customTaskSelected={customTaskSelected}
      />
    </StyledModal>
  )
}

export default ModifyCustomTask
