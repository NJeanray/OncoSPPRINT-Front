import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import SubBar from 'app/components/subBar'
import { eventEndpoint, groupsEndpoint } from 'app/api/endpoints'
import { PartProvider } from 'app/contexts/PartProvider'
import { useEventChanges } from 'app/hooks/useEventChanges'
import ManagePart from './projectTabs/managePart'
import CustomTasksList from './projectTabs/customTasksList'
import CustomConsumablesList from './projectTabs/customConsumablesList'
import GroupsList from './projectTabs/groupsList'
import EventsList from './projectTabs/eventsList'

const CategoryPart = ({
  // fetchParts,
  studies,
  parts,
  groups,
  groupsName,
  history,
  fetchEntities,
  eventCreated,
  eventUpdated,
  eventDeleted
}) => {
  const { projectId, studyId, partId } = useParams()
  const [partSelected, setPartSelected] = useState(null)
  const studyState = studies?.getIn([studyId.toString(), 'state'])

  const fetchGroups = useCallback(() => {
    fetchEntities('groups', {
      endpoint: groupsEndpoint(projectId, studyId, partId)
    })
  }, [fetchEntities, projectId, studyId, partId])

  const fetchEvents = useCallback(
    (filters = {}) => {
      if (partSelected) {
        fetchEntities('events', {
          endpoint: eventEndpoint(),
          params: {
            part_id: partSelected.get('id'),
            ...filters
          }
        })
      }
    },
    [fetchEntities, partSelected]
  )

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useEventChanges(eventCreated, fetchGroups)
  useEventChanges(eventUpdated, fetchGroups)
  useEventChanges(eventDeleted, fetchGroups)

  useEffect(() => {
    if (parts) setPartSelected(parts.get(partId.toString()))
  }, [parts, partId])

  return (
    <>
      <SubBar
        tabs={[
          'partCategory.tab.part',
          'partCategory.tab.events',
          'partCategory.tab.groups',
          'partCategory.tab.customTasks',
          'partCategory.tab.customConsumables'
        ]}
      >
        <ManagePart
          disabledBtn={studyState === 'amended'}
          partSelected={partSelected}
          projectId={projectId}
          studyId={studyId}
          history={history}
        />
        <PartProvider value={{ partSelected, groups, groupsName }}>
          <EventsList
            fetchEvents={fetchEvents}
            disabledBtn={studyState === 'amended'}
            projectId={projectId}
            studyId={studyId}
            partId={partId}
          />
        </PartProvider>
        <GroupsList
          fetchEvents={fetchEvents}
          disabledBtn={studyState === 'amended'}
          projectId={projectId}
          studyId={studyId}
          partId={partId}
          fetchGroups={fetchGroups}
        />
        <CustomTasksList
          disabledBtn={studyState === 'amended'}
          projectId={projectId}
          studyId={studyId}
          partId={partId}
        />
        <CustomConsumablesList
          disabledBtn={studyState === 'amended'}
          projectId={projectId}
          studyId={studyId}
          partId={partId}
        />
      </SubBar>
    </>
  )
}

export default CategoryPart
