import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import StyledModal from 'app/components/styledModal/StyledModal'
import TextTitle from 'app/components/textTitle/TextTitle'
import PartForm from 'app/components/partForm'
import { partsEndpoint } from 'app/api/endpoints'

const CreatePart = ({
  projectSite,
  singlePartCreated,
  projectId,
  studyId,
  open,
  onClose,
  postEntities
}) => {
  const handleCreatePart = partFields => {
    postEntities('singlePart', {
      endpoint: partsEndpoint(projectId, studyId),
      params: partFields,
      parent: 'parts'
    })
  }

  useEffect(() => {
    if (singlePartCreated) {
      // reset
    }
  }, [singlePartCreated])

  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id="createPart.title" />} />
      <PartForm action="create" handleCreatePart={handleCreatePart} projectSite={projectSite} />
    </StyledModal>
  )
}

export default CreatePart
