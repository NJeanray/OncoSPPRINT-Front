import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

export const getGroups = state => {
  return state.data.get('groups')
}

export const getGroupsSelector = createSelector([getGroups], groups => groups?.get('data'))

function sortByGroups(levelMax, groups, groupsSorted) {
  let currentLevel = 1

  while (currentLevel <= levelMax) {
    // eslint-disable-next-line
    const groupsLevel = groups.filter(group => group.level === currentLevel)

    sortBy(groupsLevel, [
      item => {
        const itemWithoutG = item.name.substring(1)
        const isNotNumber = isNaN(Number(itemWithoutG.charAt(0)))

        if (isNotNumber) return item.name
        return Number(item.name.substring(1))
      }
    ])
      .reverse()
      .forEach(group => {
        const index = groupsSorted.findIndex(item => item.id === group.upper_group_id)

        groupsSorted.splice(index, 0, group)
      })
    currentLevel += 1
  }

  return groupsSorted.reverse()
}

export const groupsArray = (groups, type) => {
  const groupsTable = groups.valueSeq().map(group => ({
    id: group.get('id'),
    value: group.get('id'),
    label: group.get('name'),
    name: group.get('name'),
    level: group.get('level'),
    upper_group_id: group.get('upper_group_id'),
    upper_group_name: group.get('upper_group_name'),
    groupParentName: group.get('upper_group_id'),
    nbAnimals: group.get('nb_remaining_animals')
  }))

  const groupsSorted = groupsTable.toJS().filter(item => item.name === 'G0')
  let groupsExceptG0 = groupsTable.toJS().filter(item => item.name !== 'G0')
  let level = 0

  groupsTable.toJS().forEach(group => {
    if (group.level > level) level = group.level
  })

  if (type === 'name')
    return sortByGroups(level, groupsExceptG0, groupsSorted).map(group => group.name)
  return sortByGroups(level, groupsExceptG0, groupsSorted)
}

export const getGroupsData = createSelector([getGroupsSelector], groups => {
  if (!groups || groups?.size === 0) return []

  return groupsArray(groups)
})

export const getGroupsOptions = createSelector([getGroupsSelector], groups => {
  if (!groups || groups?.size === 0) return []

  const groupsTable = groups.valueSeq().map(group => ({
    value: group.get('id'),
    label: group.get('name')
  }))

  return groupsTable.toJS().reverse()
})
