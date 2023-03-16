import React from 'react'
import { FormattedMessage } from 'react-intl'
import StyledModal from '../../components/styledModal/StyledModal'
import TextTitle from '../../components/textTitle/TextTitle'
import CustomConsumableForm from 'app/components/customConsumableForm'
import { customConsumablesEndpoint } from '../../api/endpoints'

const ModifyCustomConsumable = ({
  projectId,
  studyId,
  partId,
  updateEntities,
  customConsumableSelected,
  open,
  onClose
}) => {
  const handleModifyCustomConsumable = customConsumableFields =>
    updateEntities('customConsumables', {
      endpoint: customConsumablesEndpoint(
        projectId,
        studyId,
        partId,
        customConsumableSelected?.get('id')
      ),
      params: customConsumableFields
    })

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="customConsumable.modalModifying.title" />} />
      <CustomConsumableForm
        handleModifyCustomConsumable={handleModifyCustomConsumable}
        action="update"
        customConsumableSelected={customConsumableSelected}
      />
    </StyledModal>
  )
}

export default ModifyCustomConsumable
