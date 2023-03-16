import React from 'react'
import TextTitle from '../../components/textTitle/TextTitle'
import { FormattedMessage } from 'react-intl'
import StyledModal from '../../components/styledModal/StyledModal'
import { groupsEndpoint } from 'app/api/endpoints'
import GroupForm from 'app/components/groupForm'

const CreateGroup = ({ open, onClose, projectId, studyId, partId, postEntities }) => {
  const handleCreateGroup = groupFields =>
    postEntities('groups', {
      endpoint: groupsEndpoint(projectId, studyId, partId),
      params: {
        part_id: partId,
        ...groupFields
      }
    })

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="group.modalCreating.title" />} />
      <GroupForm handleCreateGroup={handleCreateGroup} action="create" />
    </StyledModal>
  )
}

export default CreateGroup
