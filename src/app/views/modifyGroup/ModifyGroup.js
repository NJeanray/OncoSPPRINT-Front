import React from 'react'
import { FormattedMessage } from 'react-intl'

import StyledModal from 'app/components/styledModal/StyledModal'
import TextTitle from 'app/components/textTitle/TextTitle'
import GroupForm from 'app/components/groupForm'
import { groupsEndpoint } from 'app/api/endpoints'

const ModifyGroup = ({
  projectId,
  studyId,
  partId,
  updateEntities,
  groupSelected,
  open,
  onClose
}) => {
  const handleModifyGroup = groupsFields =>
    updateEntities('groups', {
      endpoint: groupsEndpoint(projectId, studyId, partId, groupSelected.get('id')),
      params: groupsFields
    })

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="group.modalModifying.title" />} />
      <GroupForm
        handleModifyGroup={handleModifyGroup}
        action="update"
        groupSelected={groupSelected}
      />
    </StyledModal>
  )
}

export default ModifyGroup
