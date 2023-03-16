export const getErrorFieldName = errorField => {
  switch (errorField) {
    case 'part_id':
      return 'part id'
    case 'worker_title':
      return 'worker title'
    case 'nb_animals_per_group':
      return 'number of animals per group'
    case 'nb_groups':
      return 'number of groups'
    case 'animal_weight':
      return 'animal weight'
    case 'samples':
      return 'samples'
    default:
      return errorField
  }
}

export const initializeEventInitData = () => ({
  groupsSelected: [],
  fromD0: 'after',
  periodicity: {
    type: 'daily',
    start: 0,
    interval: 1,
    nb_per_day: 0,
    day: null
  },
  nbAnimalsDefault: 0
})

const initializePeriodicityObj = (type, periodicity) => {
  if (type === 'daily')
    return {
      type: 'daily',
      nb_per_day: periodicity.get('nb_per_day'),
      start: periodicity.get('start'),
      iteration: periodicity.has('iteration') ? periodicity.get('iteration') : null,
      end: periodicity.has('end') ? periodicity.get('end') : null,
      interval: periodicity.get('interval')
    }
  if (type === 'weekly')
    return {
      type: 'weekly',
      week: periodicity.has('week') ? periodicity.get('week') : null,
      days: periodicity.get('days'),
      start: periodicity.get('start'),
      iteration: periodicity.has('iteration') ? periodicity.get('iteration') : null,
      end: periodicity.has('end') ? periodicity.get('end') : null
    }
  if (type === 'irregular')
    return {
      type: 'irregular',
      days: periodicity.get('days')
    }
  return {
    type: 'event',
    event_id: periodicity.get('event_id'),
    shift: periodicity.get('shift')
  }
}

export function initializePeriodicity(eventSelected) {
  if (eventSelected.has('periodicity')) {
    if (eventSelected.getIn(['periodicity', 'type']) === 'daily')
      return initializePeriodicityObj('daily', eventSelected.get('periodicity'))
    if (eventSelected.getIn(['periodicity', 'type']) === 'weekly')
      return initializePeriodicityObj('weekly', eventSelected.get('periodicity'))
    if (eventSelected.getIn(['periodicity', 'type']) === 'irregular')
      return initializePeriodicityObj('irregular', eventSelected.get('periodicity'))
    return initializePeriodicityObj('event', eventSelected.get('periodicity'))
  }
  return {}
}
