import { createSelector } from 'reselect'

const getCustomTasks = state => {
  return state.data.get('customTasks')
}

export const getCustomTasksSelector = createSelector([getCustomTasks], customTasks =>
  customTasks?.get('data')
)

export const getCustomTasksTable = createSelector([getCustomTasksSelector], customTasks => {
  if (!customTasks || customTasks?.size === 0) return []

  const customTasksTable = customTasks.valueSeq().map(customTask => ({
    id: customTask.get('id'),
    hours: customTask.get('hours'),
    task: customTask.get('task'),
    mspLaboratory: {
      label: customTask.get('labo_msp_name'),
      id: customTask.get('labo_msp_id')
    }
  }))

  return customTasksTable.toJS().reverse()
})
