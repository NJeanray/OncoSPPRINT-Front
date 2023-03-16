import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const getUsers = state => {
  return state.data.getIn(['users', 'data'])
}

const getNamesUsers = eachField => {
  const getLabel = () => {
    const firstName = eachField.get('first_name')
    const lastName = eachField.get('last_name')

    if (firstName.trim() === '' || lastName.trim() === '') return eachField.get('username')
    return `${firstName} ${lastName}`
  }

  return {
    label: getLabel(),
    value: eachField.get('id')
  }
}

export const getNameUsersSelector = createSelector([getUsers], users => {
  if (!users) return []

  return sortBy(
    users
      .valueSeq()
      .map(eachField => getNamesUsers(eachField))
      .toJS(),
    [item => item.label.toLowerCase()]
  )
})
