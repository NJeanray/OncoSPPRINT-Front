import { fromJS } from 'immutable'

export default function(state, action) {
  const { parent, name, data, multiple = false, transfertNext = false } = action.payload

  let stateUpdated = state
    .setIn(
      [name, 'data', name !== 'login' ? data.id.toString() : 'status'],
      name !== 'login' ? fromJS(data) : 'connected'
    )
    .setIn([name, 'isFetching'], false)
    .updateIn([name, 'errors'], prevErrors => {
      if (multiple) return prevErrors
      return null
    })
    .setIn([name, 'created'], fromJS(data))

  if (name === 'singleEvent')
    stateUpdated = stateUpdated.setIn([name, 'transfertNext'], transfertNext)
  if (parent) {
    return stateUpdated.setIn([parent, 'data', data.id.toString()], fromJS(data))
  }
  return stateUpdated
}
