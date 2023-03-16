import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const getProjects = state => {
  return state.data.get('projects')
}

export const getProjectsSelector = createSelector([getProjects], projects => projects?.get('data'))

export const getProjectsTableSelector = createSelector([getProjectsSelector], projects => {
  if (!projects || projects?.size === 0) return []

  const projectsTable = projects.valueSeq().map(project => ({
    id: project.get('id'),
    code: project.get('project_code'),
    name: project.get('title'),
    state: project.get('state'),
    site: project.get('site'),
    client: project.get('client_name'),
    creation_date: project.get('creation_date'),
    owner: project.get('owner_name')
  }))
  return sortBy(projectsTable.toJS(), [project => project.id]).reverse()
})
