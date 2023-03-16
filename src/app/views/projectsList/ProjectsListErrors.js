import React from 'react'
import TextError from '../../components/textError'

const ProjectsListErrors = ({ errorsProjects }) => (
  <div className="projects-list__errors-wrapper">
    {errorsProjects && <TextError text={`Get projects : ${errorsProjects.detail}`} />}
  </div>
)

export default ProjectsListErrors
