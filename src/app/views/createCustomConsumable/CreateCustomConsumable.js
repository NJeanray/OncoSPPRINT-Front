import React from 'react'
import { FormattedMessage } from 'react-intl'

import { customConsumablesEndpoint } from 'app/api/endpoints'
import TextTitle from 'app/components/textTitle/TextTitle'
import StyledModal from 'app/components/styledModal/StyledModal'
import CustomConsumableForm from 'app/components/customConsumableForm'

const CreateCustomConsumable = ({
  projectId,
  studyId,
  partId,
  postEntities,
  open,
  onClose
}) => {
  const handleCreateCustomConsumable = customConsumableFields => {
    postEntities('customConsumables', {
      endpoint: customConsumablesEndpoint(projectId, studyId, partId),
      params: customConsumableFields
    })
  }

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="customConsumable.modalCreating.title" />} />
      <CustomConsumableForm
        action="create"
        handleCreateCustomConsumable={handleCreateCustomConsumable}
      />
    </StyledModal>
  )
}

export default CreateCustomConsumable
