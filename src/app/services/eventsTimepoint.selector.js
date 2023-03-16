import { createSelector } from 'reselect'

const getEventsTypeFiltered = state => state.data.get('eventsTypeFiltered')

const getEventTimepoint = state => state.data.get('eventTimepoint')

function getEventSampleNames(event) {
  return event
    .get('samples')
    .map(item => {
      return ` ${item.get('sample_brick_name')}`
    })
    .toJS()
}

function getRandomizationNames(event) {
  return event
    .get('randomization_criteria')
    .toJS()
    .map(item => ` ${item.brick_name}`)
}

function getSubcontractingQuote(event) {
  return event.get('sales_quote') ? `| Devis n° ${event.get('sales_quote')}` : ''
}

function getTransfertsBrickName(event) {
  return event
    .get('transfers')
    .toJS()
    .map(
      transfer =>
        `${transfer.brick_name} des fragments d'un ${transfer.fragments.map(
          fragment => `${fragment.sample_name}`
        )}`
    )
}

function getFacsPanelsName(event) {
  return event
    .get('panels')
    .toJS()
    .map(panel => panel.name)
}

const getLabel = event => {
  const timepoint = event.get('day') ? `D${event.get('day')}` : ''

  if (event.get('type') === 'imagery')
    return `${timepoint} | ${event.get('group_name')}. ${event.get('imagery_type')}`
  if (event.get('type') === 'sample')
    return `${timepoint} | ${event.get('group_name')}.${getEventSampleNames(event)}`
  if (event.get('type') === 'subcontracting')
    return `${event.get('subcontractor_name')} ${getSubcontractingQuote(event)}`
  if (event.get('type') === 'randomisation')
    return `${timepoint} | ${event.get('group_name')}.${getRandomizationNames(event)}`
  if (event.get('type') === 'facs_ex_vivo_bce')
    return `${getFacsPanelsName(event)} | Transferts:  ${getTransfertsBrickName(event)}`
  return `${timepoint} | ${event.get('group_name')}. ${event.get('brick_name')}`
}

export const getEventsTimepointSelector = createSelector([getEventsTypeFiltered], events => {
  const eventsList = events?.get('data')

  if (eventsList) {
    const eventsArrayImmutable = eventsList.valueSeq().map(event => {
      const eventObj = {
        value: event.get('id'),
        label: getLabel(event)
      }

      return eventObj
    })
    return eventsArrayImmutable.toJS()
  }
})

export const getEventTimepointLabel = createSelector([getEventTimepoint], event => {
  const eventTimepoint = event?.get('data')

  if (eventTimepoint) {
    const eventData = eventTimepoint.valueSeq().get(0)

    return getLabel(eventData)
  }
  return null
})
