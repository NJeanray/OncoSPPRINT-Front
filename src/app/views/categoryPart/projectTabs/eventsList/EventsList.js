import React, { useContext, useState, useEffect } from 'react'
import { sortBy, isEmpty } from 'lodash'

import { eventEndpoint } from 'app/api/endpoints'
import CustomSpinner from 'app/components/customSpinner'
import StyledTableContainer from 'app/components/styledTableContainer'
import CreateEvent from 'app/views/createEvent'
import ModifyEvent from 'app/views/modifyEvent'
import EventsListTable from 'app/views/categoryPart/projectTabs/eventsList/EventsListTable'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import { PartContext } from 'app/contexts/PartProvider'
import { useStateChanges } from 'app/hooks/useStateChanges'
import Switch from 'app/components/switch/Switch'
import EventsArray from './eventArrays'
import { eventCreatedText, eventUpdatedText, eventDeletedText } from './EventsList.utils'
import EventsFilters from './EventsFilters'

const EventsList = ({
  disabledBtn,
  singleEventTransferNext,
  isEventsLoading,
  events,
  eventCreated,
  resetStateCreated,
  eventUpdated,
  resetStateUpdated,
  eventDeleted,
  resetStateDeleted,
  fetchEvents,
  deleteEntities,
  eventsTable,
  groups,
  resetStateErrors,
  groupsOptions
}) => {
  const [typeSelected, setTypeSelected] = useState(null)
  const [daySelected, setDaySelected] = useState(0)
  const [groupSelected, setGroupSelected] = useState(null)
  const [filterType, setFilterType] = useState(null)
  const { partSelected } = useContext(PartContext)
  const [sortOrder, setSortOrder] = useState(-1)
  const [eventsTableSorted, setEventsTableSorted] = useState(eventsTable)
  const [arrayEventTypeSelected, setArrayEventTypeSelected] = useState(null)
  const [displayType, setDisplayType] = useState('list')
  const [eventSelected, setEventSelected] = useState(null)
  const [openCreatingModal, setOpenCreatingModal] = useState(false)
  const [openModifyingModal, setOpenModifyingModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const groupsSize = groups?.size

  function getParams() {
    if (filterType === 'type') return { types: typeSelected }
    if (filterType === 'day') return { day: daySelected }
    if (filterType === 'group') return { group_id: groupSelected }
    return null
  }

  const handleFilter = () => {
    if (filterType === 'day') {
      if (!isEmpty(eventsTable))
        setEventsTableSorted(
          eventsTable.filter(item => !isEmpty(item.tp) && item.tp.includes(`D${daySelected || 0}`))
        )
    } else fetchEvents(getParams())
  }

  const handleResetFilters = () => {
    fetchEvents()
    setFilterType(null)
    setDaySelected(null)
    setTypeSelected(null)
  }

  useEffect(() => {
    if (eventsTable) setEventsTableSorted(eventsTable)
  }, [eventsTable])

  useEffect(() => {
    if (eventsTable) setEventsTableSorted(eventsTable)
  }, [eventsTable])

  useEffect(() => {
    if (displayType === 'list') fetchEvents()
    else setArrayEventTypeSelected(null)
  }, [displayType, fetchEvents])

  useEffect(() => {
    if (partSelected) {
      fetchEvents()
      setDisplayType('list')
      setArrayEventTypeSelected(null)
    }
  }, [fetchEvents, partSelected])

  function afterStateUpdated(action) {
    if (action === 'create' && !singleEventTransferNext) setOpenCreatingModal(false)
    else if (action === 'update') setOpenModifyingModal(false)
    fetchEvents(displayType === 'array' ? { types: arrayEventTypeSelected } : {})
    // setArrayEventTypeSelected(null)
    // handleResetFilters()
  }

  useStateChanges(
    'singleEvent',
    eventCreated,
    'success',
    eventCreatedText(eventCreated),
    resetStateCreated,
    afterStateUpdated,
    'create'
  )

  useStateChanges(
    'events',
    eventUpdated,
    'success',
    eventUpdatedText(eventUpdated),
    resetStateUpdated,
    afterStateUpdated,
    'update'
  )

  useStateChanges(
    'events',
    eventDeleted,
    'success',
    eventDeletedText(eventDeleted),
    resetStateDeleted,
    afterStateUpdated,
    null
  )

  const handleSort = type => {
    if (type === 'categoryName') {
      if (sortOrder === -1) {
        setEventsTableSorted(sortBy(eventsTable, [item => item.type]))
        setSortOrder(1)
      } else {
        setEventsTableSorted(sortBy(eventsTable, [item => item.type]).reverse())
        setSortOrder(-1)
      }
    } else if (type === 'day') {
      if (sortOrder === -1) {
        setEventsTableSorted(sortBy(eventsTable, [item => item.day]))
        setSortOrder(1)
      } else {
        setEventsTableSorted(sortBy(eventsTable, [item => item.day]).reverse())
        setSortOrder(-1)
      }
    }
  }

  const handleView = eventId => {
    setEventSelected(events.get(eventId.toString()))
    setOpenViewModal(true)
  }

  const handleDelete = eventToDeleteId =>
    deleteEntities('events', {
      endpoint: eventEndpoint(eventToDeleteId),
      params: events.get(eventToDeleteId.toString())
    })

  const handleModify = eventId => {
    setEventSelected(events.get(eventId.toString()))
    setOpenModifyingModal(true)
  }

  const onCloseModal = action => {
    setEventSelected(null)
    if (action === 'modify') setOpenModifyingModal(false)
    else if (action === 'create') setOpenCreatingModal(false)
    else if (action === 'view') setOpenViewModal(false)
    resetStateErrors('events')
    resetStateErrors('singleEvent')
  }

  if (isEventsLoading) return <CustomSpinner type="square" wrapper />

  return (
    <StyledTableContainer>
      {!disabledBtn && (
        <div className="styled-table-container__header">
          <StyledMainAddBtn onClick={() => setOpenCreatingModal(true)} />
        </div>
      )}
      {!openCreatingModal && !openModifyingModal && (
        <div style={{ height: '100px', display: 'flex', justifyContent: 'flex-start' }}>
          <Switch
            value={displayType === 'list' ? 'minus' : 'plus'}
            setValue={value => setDisplayType(value === 'minus' ? 'list' : 'array')}
            labelLeft="eventsList.list"
            labelRight="eventsList.array"
          />
        </div>
      )}
      {displayType === 'list' ? (
        <>
          <EventsFilters
            filterType={filterType}
            daySelected={daySelected}
            setDaySelected={setDaySelected}
            setFilterType={setFilterType}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
            handleFilter={handleFilter}
            handleResetFilters={handleResetFilters}
            groupSelected={groupSelected}
            setGroupSelected={setGroupSelected}
            groupsOptions={groupsOptions}
          />
          <EventsListTable
            disabledBtn={disabledBtn}
            eventsTable={eventsTableSorted}
            handleModify={handleModify}
            handleDelete={handleDelete}
            handleSort={handleSort}
            handleView={handleView}
            fetchEvents={fetchEvents}
          />
        </>
      ) : (
        <EventsArray
          handleView={handleView}
          disabledBtn={disabledBtn}
          fetchEvents={fetchEvents}
          handleModify={handleModify}
          handleDelete={handleDelete}
          arrayEventTypeSelected={arrayEventTypeSelected}
          setArrayEventTypeSelected={setArrayEventTypeSelected}
        />
      )}
      <CreateEvent
        groupsSize={groupsSize}
        open={openCreatingModal}
        onClose={() => onCloseModal('create')}
      />
      <ModifyEvent
        viewDisplay={openViewModal}
        eventSelected={eventSelected}
        open={openModifyingModal || openViewModal}
        onClose={() => onCloseModal(openViewModal ? 'view' : 'modify')}
      />
    </StyledTableContainer>
  )
}

export default EventsList
