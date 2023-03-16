import { fromJS, merge } from 'immutable'
import { isEmpty } from 'lodash'

export default function(state, action) {
  const { name, data, common = false, amend = false } = action.payload

  const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })))

  const setStateArray = () => {
    const dataConverted = fromJS(arrayToObject(data, 'id'))

    if (!isEmpty(data)) {
      if (amend) {
        const tmpData = state.getIn([name, 'data'])

        if (!tmpData) return dataConverted

        return merge(tmpData, dataConverted)
      }
      return dataConverted
    }

    return fromJS({})
  }

  const setData = () => {
    return Array.isArray(data)
      ? setStateArray()
      : fromJS({
          [data.id]: data
        })
  }

  return state
    .setIn([name, 'data'], common ? fromJS(data) : setData())
    .setIn([name, 'isFetching'], false)
    .setIn([name, 'errors'], null)
}
