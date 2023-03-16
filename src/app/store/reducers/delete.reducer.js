import { fromJS } from 'immutable'

export default function(state, action) {
  const { data, name } = action.payload

  const stateUpdated = state
    .deleteIn([name, 'data', data.get('id').toString()])
    .setIn([name, 'isFetching'], false)
    .setIn([name, 'errors'], null)
    .setIn([name, 'deleted'], fromJS(data))

  return stateUpdated
}
