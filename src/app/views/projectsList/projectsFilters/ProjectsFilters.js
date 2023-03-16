import React, { useEffect, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import Select from 'app/components/select'
import TextField from 'app/components/textField'
import StyledButton from 'app/components/styledButton'
import { projectsFilters } from './ProjectsFilters.utils'
import { clientsEndpoint, studyChoiceFieldsEndpoint, usersEndpoint } from 'app/api/endpoints'
import SearchSelect from 'app/components/searchSelect'

const ProjectsFilters = ({
  filterSearchSelect,
  setFilterSearchSelect,
  clientsName,
  projectStates,
  sites,
  nameUsers,
  users,
  isUsersLoading,
  filterType,
  setFilterType,
  filterStr,
  setFilterStr,
  filterSelect,
  setFilterSelect,
  fetchProjects,
  studyChoiceFields,
  isStudyChoiceFieldsFetching,
  fetchEntities
}) => {
  const checkFilterTypeString = () => filterType === 'title' || filterType === 'project_code'

  const isFilterBtnDisplayed = () => {
    if (filterType && checkFilterTypeString() && filterStr) return true
    if (filterType && filterType === 'client' && filterSearchSelect) return true
    return !!(filterType && filterSelect)
  }

  const handleFilter = () => {
    let filterTypeValue = checkFilterTypeString() ? filterStr : filterSelect

    if (filterType === 'owner')
      filterTypeValue = nameUsers.filter(item => item.value === filterSelect)[0].label
    else if (filterType === 'client') filterTypeValue = filterSearchSelect?.label

    fetchProjects({
      [filterType]: filterTypeValue
    })
  }

  const handleResetFilters = () => {
    setFilterType(null)
    if (checkFilterTypeString()) setFilterStr(null)
    fetchProjects()
  }

  useEffect(() => {
    if (!studyChoiceFields && !isStudyChoiceFieldsFetching)
      fetchEntities('studyChoiceFields', {
        endpoint: studyChoiceFieldsEndpoint(),
        common: true
      })
  }, [isStudyChoiceFieldsFetching, fetchEntities, studyChoiceFields])

  useEffect(() => {
    if (!users && !isUsersLoading) fetchEntities('users', { endpoint: usersEndpoint() })
  }, [users, isUsersLoading, fetchEntities])

  const fetchClients = useCallback(
    name => {
      const params = name ? { name } : {}

      fetchEntities('clients', {
        endpoint: clientsEndpoint(),
        params
      })
    },
    [fetchEntities]
  )

  return (
    <Grid container>
      <Grid item xs={2}>
        <Select
          label="projectsList.filters"
          value={filterType}
          onChange={e => {
            setFilterType(e.target.value)
            setFilterStr(null)
            setFilterSelect(null)
          }}
          options={projectsFilters}
        />
      </Grid>
      <Grid item xs={2} style={{ margin: '0 30px' }}>
        {checkFilterTypeString() && filterType !== 'project_code' && (
          <TextField
            width="100%"
            label={<FormattedMessage id={`projectsList.filter.${filterType}`} />}
            value={filterStr || ''}
            onChange={e => setFilterStr(e.target.value)}
          />
        )}
        {filterType && filterType === 'project_code' && (
          <TextField
            width="100%"
            label={<FormattedMessage id={`projectsList.filter.${filterType}`} />}
            value={filterStr || ''}
            onChange={e => setFilterStr(e.target.value)}
            onInput={e => {
              e.target.value = e.target.value.slice(0, 6)
            }}
          />
        )}
        {filterType && filterType === 'site' && (
          <Select
            label="projectForm.input.site"
            value={filterSelect}
            onChange={e => setFilterSelect(e.target.value)}
            options={sites}
            isOptionDisabled={optLabel => optLabel !== 'DIJ'}
          />
        )}
        {filterType && filterType === 'owner' && (
          <Select
            label="projectForm.input.studyDirector"
            value={filterSelect}
            onChange={e => {
              setFilterSelect(e.target.value)
            }}
            options={nameUsers}
          />
        )}
        {filterType && filterType === 'state' && (
          <Select
            label="projectsList.filters.state"
            value={filterSelect}
            onChange={e => {
              setFilterSelect(e.target.value)
            }}
            options={projectStates}
          />
        )}
        {filterType && filterType === 'client' && (
          <SearchSelect
            value={filterSearchSelect}
            setValue={setFilterSearchSelect}
            fetchOptions={fetchClients}
            options={clientsName}
            label="projectForm.input.clientName"
            required
            onSelect={itemSelected => setFilterSearchSelect(itemSelected)}
          />
        )}
      </Grid>
      {isFilterBtnDisplayed() && (
        <Grid item xs={2}>
          <StyledButton onClick={handleFilter}>
            <FormattedMessage id="global.action.filter" />
          </StyledButton>
        </Grid>
      )}
      {isFilterBtnDisplayed() && (
        <Grid item xs={2} style={{ marginLeft: '30px' }}>
          <StyledButton variant="outlined" onClick={handleResetFilters}>
            <FormattedMessage id="global.action.cancel" />
          </StyledButton>
        </Grid>
      )}
    </Grid>
  )
}

export default ProjectsFilters
