// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import ProjectStateWrapper from './ProjectState.styled'

type Props = {
  state: string
}

const ProjectState = ({ state }: Props) => {
  return (
    <ProjectStateWrapper>
      <div className={`project__state-circle project__state-circle--${state}`} />
      <FormattedMessage id={`global.status.${state}`} />
    </ProjectStateWrapper>
  )
}

export default ProjectState
