import { createSelector } from 'reselect'

const getCustomTasks = state => {
  return state.data.get('customConsumables')
}

export const getCustomConsumablesSelector = createSelector([getCustomTasks], customConsumables =>
  customConsumables?.get('data')
)

export const getCustomConsumablesTable = createSelector(
  [getCustomConsumablesSelector],
  customConsumables => {
    if (!customConsumables || customConsumables?.size === 0) return []

    const customConsumablesTable = customConsumables.valueSeq().map(customConsumable => ({
      id: customConsumable.get('id'),
      cost: customConsumable.get('cost'),
      provider: customConsumable.get('consumable_provider'),
      consumableLibelleArticle: customConsumable.get('libelle_article'),
      description: customConsumable.get('description')
    }))

    return customConsumablesTable.toJS().reverse()
  }
)
