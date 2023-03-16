import React, { useState, useEffect, useCallback } from 'react'

import { projectsListEndpoint } from 'app/api/endpoints'
import StyledSecondAddBtn from 'app/components/styledSecondAddBtn'
import TextTitle from 'app/components/textTitle'
import CreateProject from 'app/views/createProject'
import CustomSpinner from 'app/components/customSpinner'
import { useStateChanges } from 'app/hooks/useStateChanges'
import { ProjectsListWrapper } from './ProjectsList.styled'
import ProjectsListErrors from './ProjectsListErrors'
import ProjectsListTable from './ProjectsListTable'
import ProjectsFilters from './projectsFilters'
import { projectsListTitle, projectCreatedText } from './ProjectsList.utils'
import { Redirect } from 'react-router-dom'
// TODO FOLLOWING LINE : insert later when pagination will be add
// import ProjectListTableNavBtn from './ProjectListTableNavBtn'

function ProjectsList({
  projectCreated,
  errorsProjects,
  fetchEntities,
  history,
  isProjectsLoading,
  projectsTable,
  resetStateCreated,
  resetStateErrors
}) {
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false)
  const [filterType, setFilterType] = useState(null)
  const [filterStr, setFilterStr] = useState(null)
  const [filterSelect, setFilterSelect] = useState(null)
  const [filterSearchSelect, setFilterSearchSelect] = useState(null)

  const fetchProjects = useCallback(
    (params = {}) => {
      fetchEntities('projects', {
        endpoint: projectsListEndpoint(),
        ammend: true,
        params
      })
    },
    [fetchEntities]
  )

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useStateChanges(
    'projects',
    projectCreated,
    'success',
    projectCreatedText(projectCreated),
    resetStateCreated,
    setIsCreatingModalOpen,
    false
  )

  if (isProjectsLoading && !isCreatingModalOpen) {
    return <CustomSpinner type="square" />
  }

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) return <Redirect to="/" />

  return (
    <ProjectsListWrapper>
      <TextTitle text={projectsListTitle} />
      <div className="projects-list__actions">
        <StyledSecondAddBtn
          text="projectsList.addBtnLabel"
          onClick={() => setIsCreatingModalOpen(true)}
        />
      </div>
      <ProjectsListErrors errorsProjects={errorsProjects} />
      <ProjectsFilters
        filterSearchSelect={filterSearchSelect}
        setFilterSearchSelect={setFilterSearchSelect}
        filterType={filterType}
        setFilterType={setFilterType}
        fetchProjects={fetchProjects}
        filterStr={filterStr}
        setFilterStr={setFilterStr}
        filterSelect={filterSelect}
        setFilterSelect={setFilterSelect}
      />
      <ProjectsListTable history={history} projectsTable={projectsTable} />
      <CreateProject
        open={isCreatingModalOpen}
        onClose={() => {
          resetStateErrors('projects', { value: null })
          setIsCreatingModalOpen(false)
        }}
      />
    </ProjectsListWrapper>
  )
}

export default ProjectsList
