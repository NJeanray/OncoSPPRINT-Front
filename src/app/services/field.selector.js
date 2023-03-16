import { createSelector } from 'reselect'

export const getStateFieldData = createSelector(
  [state => state, (_, arg) => arg],
  (state, field) => {
    return state.data.getIn([field, 'data'])
  }
)
