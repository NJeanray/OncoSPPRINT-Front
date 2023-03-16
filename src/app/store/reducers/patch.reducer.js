import { fromJS } from 'immutable'

export default function(state, action) {
  const { data, name, parent } = action.payload

  const stateUpdated = state
    .setIn([name, 'data', data.id.toString()], fromJS(data))
    .setIn([name, 'isFetching'], false)
    .setIn([name, 'errors'], null)
    .setIn([name, 'updated'], fromJS(data)) // TODO maybe we need

  if (parent) {
    const parentName = Object.keys(parent)[0]
    const parentKey = Object.values(parent)[0]
    const parentData = parent.data

    return stateUpdated.updateIn([parentName, 'data', parentKey.toString()], value => {
      return Object.keys(parentData).reduce((acc, key) => {
        acc.set(key, parentData[key])
        return acc
      }, value)
    })
  }

  return stateUpdated
}
