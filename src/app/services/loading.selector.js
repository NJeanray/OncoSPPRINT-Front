import { createSelector } from 'reselect'

const rootState = state => {
  return state.data
}

export const isLoadingSelector = createSelector(
  [rootState, (_, arg) => arg],
  (state, entityName) => {
    return state.getIn([entityName, 'isFetching'])
  }
)

export const isEntityLoadedSelector = createSelector(
  [rootState, (_, arg) => arg],
  (state, entityName) => {
    const loadingStatus = state.getIn([entityName, 'isFetching'])
    const dataStatus = state.getIn([entityName, 'data'])
    return loadingStatus === false && Boolean(dataStatus)
  }
)
