import { createSelector } from 'reselect'
import { sortBy } from 'lodash'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { getGroupsSelector, groupsArray } from './groups.selector'
import mapOrder from 'app/utils/mapOrder'

const getEvents = state => state.data.get('events')

export const getEventsTableSelector = createSelector(
  [getEvents, state => getGroupsSelector(state)],
  (events, groups) => {
    const eventsList = events?.get('data')
    const groupsNames = groups && groups.size !== 0 ? groupsArray(groups, 'name') : []

    if (eventsList) {
      const eventsArrayImmutable = eventsList.valueSeq().map(event => {
        let brickName = event.get('brick_name')

        if (event.get('type') === 'imagery') brickName = event.get('imagery_type')
        else if (event.get('type') === 'subcontracting') brickName = event.get('subcontractor_name')
        else if (event.get('type') === 'ihc')
          brickName =
            event.get('ihc_type') === 'parafine' ? (
              <FormattedMessage id="eventIHC.paraffine" />
            ) : (
              <FormattedMessage id="eventIHC.paraffineLame" />
            )
        if (event.get('type') === 'treatment' && event.get('untreated'))
          brickName = <FormattedMessage id="eventTreatmentForm.untreatedGroup" />
        const eventPeriodicity = event.get('periodicity') ? event.get('periodicity').toJS() : null
        const eventObj = {
          id: event.get('id'),
          type: event.get('type'),
          tp: event.get('tp'),
          groupName: event.get('group_name'),
          day: event.get('day'),
          periodicity: { ...eventPeriodicity },
          brickName
        }
        if (event.get('type') === 'randomisation')
          eventObj.brickNames = event
            .get('randomization_criteria')
            .toJS()
            .map(item => item.brick_name)
        if (event.get('type') === 'sample')
          eventObj.brickNames = event
            .get('samples')
            .toJS()
            .map(sample => sample.sample_brick_name)

        return eventObj
      })
      const eventsArrayUnsorted = sortBy(eventsArrayImmutable.toJS(), [
        eventItem => eventItem.id
      ]).reverse()

      return mapOrder(eventsArrayUnsorted, groupsNames, 'groupName')
    }
  }
)

export const eventsGroupSorted = createSelector(
  [getEvents, state => getGroupsSelector(state)],
  (events, groups) => {
    const eventsList = events?.get('data')
    const groupsNames = groups && groups.size !== 0 ? groupsArray(groups, 'name') : []

    if (eventsList) {
      const eventsArrayImmutable = eventsList.valueSeq().map(event => ({
        ...event.toJS(),
        groupName: event.get('group_name')
      }))
      const eventsArrayUnsorted = sortBy(eventsArrayImmutable.toJS(), [
        eventItem => eventItem.id
      ]).reverse()

      return mapOrder(eventsArrayUnsorted, groupsNames, 'groupName')
    }
  }
)
