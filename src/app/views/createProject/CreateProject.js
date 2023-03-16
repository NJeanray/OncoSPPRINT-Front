// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import StyledModal from 'app/components/styledModal'
import ProjectForm from 'app/components/projectForm'
import TextTitle from 'app/components/textTitle/TextTitle'
import { projectsEndpoint } from 'app/api/endpoints'

type Props = {
  open: boolean,
  onClose: () => void,
  afterCreation: String => void,
  postEntities: (string, Object) => void
}

const CreateProject = ({ open, onClose, postEntities }: Props) => {
  const createProject = React.useCallback(
    ({
      title,
      clientId,
      contactId,
      flux,
      site,
      ownerId,
      secondOwnerId,
      codeSequence,
      codeYearRef,
      description
    }) => {
      const getProjectCode = codeSequence ? codeYearRef.toString().concat(codeSequence) : '19'

      postEntities('projects', {
        endpoint: projectsEndpoint(),
        params: {
          title,
          site,
          type: flux,
          client_id: clientId,
          contact_id: contactId,
          owner_id: ownerId,
          project_code: Number(getProjectCode),
          second_owner_id: secondOwnerId,
          description
        }
      })
    },
    [postEntities]
  )

  return (
    <StyledModal open={open} onClose={onClose}>
      {/* $FlowFixMe */}
      <TextTitle text={<FormattedMessage id="projectCreate.title" />} />
      <ProjectForm action="create" createProject={createProject} />
    </StyledModal>
  )
}

export default CreateProject
