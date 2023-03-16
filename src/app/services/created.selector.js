import { createSelector } from 'reselect'

const rootState = state => {
  return state.data
}

export const createdSelector = createSelector([rootState, (_, arg) => arg], (state, entityName) => {
  return state.getIn([entityName, 'created'])?.toJS()
})
