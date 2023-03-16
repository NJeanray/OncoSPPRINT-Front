import React, { useEffect, useState, useCallback, useContext } from 'react'
import { Switch, useParams } from 'react-router-dom'

import { partsEndpoint, projectsEndpoint, studiesEndpoint } from 'app/api/endpoints'
import PrivateRoute from 'app/utils/privateRoute'
import CategoryProject from 'app/views/categoryProject'
import CategoryStudy from 'app/views/categoryStudy'
import Sidebar from 'app/views/sidebar'
import CustomSpinner from 'app/components/customSpinner'
import CategoryPart from 'app/views/categoryPart'
import { useItemSidebar } from 'app/hooks/useItemSidebar'
import { useStateChanges } from 'app/hooks/useStateChanges'
import { SnackbarContext } from 'app/contexts/SnackbarProvider'
import { CategoryWrapper, Wrapper } from './ProjectDashboard.styled'
import { partDeletedText, studyDeletedText } from './ProjectDashboard.utils'

function ProjectDashboard({
  resetStateErrors,
  location: { state },
  resetStateDeleted,
  partDeleted,
  studyDeleted,
  errorsProjects,
  fetchEntities,
  history,
  isPartsLoading,
  isStudiesLoading,
  partsFromStudies,
  projects,
  studies,
  parts
}) {
  const { projectId, studyId } = useParams()
  const [projectSelected, setProjectSelected] = useState(null)
  const [studiesSideBar, setStudiesSideBar] = useState(null)
  const [partsSideBar, setPartsSideBar] = useState(null)
  const { locationStateHasChanged, setLocationStateHasChanged } = useContext(SnackbarContext)

  const fetchStudies = useCallback(
    () => fetchEntities('studies', { endpoint: studiesEndpoint(projectId) }),
    [fetchEntities, projectId]
  )

  const fetchParts = useCallback(
    () =>
      fetchEntities('parts', {
        endpoint: partsEndpoint(projectId, studyId)
      }),
    [projectId, studyId, fetchEntities]
  )

  useEffect(() => {
    if (state && state.studyUpdated && !locationStateHasChanged) {
      fetchEntities('projects', { endpoint: projectsEndpoint(projectId) })
      fetchStudies()
      setLocationStateHasChanged(true)
      history.push(`/projects/${projectId}/study/${state.studyId}`)
    }
    // eslint-disable-next-line
  }, [state])

  useItemSidebar(studies, setStudiesSideBar)
  useItemSidebar(partsFromStudies, setPartsSideBar)
  useStateChanges(
    'parts',
    partDeleted,
    'success',
    partDeletedText(partDeleted),
    resetStateDeleted,
    fetchParts,
    ''
  )
  useStateChanges(
    'studies',
    studyDeleted,
    'success',
    studyDeletedText(studyDeleted),
    resetStateDeleted,
    fetchStudies
  )

  useEffect(() => {
    if (!projects && !errorsProjects)
      fetchEntities('projects', { endpoint: projectsEndpoint(projectId) })
    else if (projects && projects?.get(projectId.toString()))
      setProjectSelected(projects.get(projectId.toString()))
    else if (!locationStateHasChanged) history.push('/')
    // eslint-disable-next-line
  }, [projects])

  useEffect(() => {
    if (projectId) fetchStudies()
  }, [studyDeleted, fetchStudies, projectId])

  useEffect(() => {
    if (studyId) fetchParts()
  }, [partDeleted, fetchParts, projectId, studyId])

  useEffect(() => {
    resetStateErrors('document')
  }, [resetStateErrors])

  if (!projectSelected) {
    return (
      <Wrapper>
        <CustomSpinner type="square" />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Sidebar
        partsSideBar={partsSideBar}
        studiesSideBar={studiesSideBar}
        setPartsSideBar={setPartsSideBar}
        projectSelected={projectSelected}
        studies={studies}
        isStudiesLoading={isStudiesLoading}
        isPartsLoading={isPartsLoading}
      />
      <CategoryWrapper>
        <Switch>
          <PrivateRoute
            path="/projects/:projectId/study/:studyId/part/:partId"
            component={CategoryPart}
          />
          <PrivateRoute
            path="/projects/:projectId/study/:studyId"
            component={props => (
              <CategoryStudy
                projects={projects}
                studies={studies}
                fetchStudies={fetchStudies}
                {...props}
              />
            )}
          />
          <PrivateRoute
            path="/projects/:projectId"
            component={props => <CategoryProject parts={parts} {...props} />}
            extraProps={{ projectSelected }}
          />
        </Switch>
      </CategoryWrapper>
    </Wrapper>
  )
}

export default ProjectDashboard
