import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const getState = state => state.data

export const getValueInObjectSelector = createSelector(
  [getState, (_, obj) => obj, (_, __, field) => field],
  (state, obj, field) => {
    const objData = state.getIn([obj, 'data'])

    if (!objData) return []

    return sortBy(
      objData
        .valueSeq()
        .map(eachField => ({ label: eachField.get(field), value: eachField.get('id') }))
        .filter(item => item.label)
        .toJS(),
      [item => item.label]
    )
  }
)

export const getFieldValueInObjectSelector = createSelector(
  [getState, (_, obj) => obj, (_, __, field) => field],
  (state, obj, field) => {
    const objData = state.getIn([obj, 'data'])

    if (!objData) return []

    return sortBy(
      objData
        .valueSeq()
        .map(eachField => ({ label: eachField.get(field), value: eachField.get(field) }))
        .filter(eachField => eachField.label)
        .toJS(),
      [item => item.label]
    )
  }
)
