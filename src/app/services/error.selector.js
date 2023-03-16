import { createSelector } from 'reselect'

const rootState = state => {
  return state.data
}

export const getErrorsSelector = createSelector(
  [rootState, (_, arg) => arg],
  (state, entityName) => {
    return state.getIn([entityName, 'errors'])
  }
)
