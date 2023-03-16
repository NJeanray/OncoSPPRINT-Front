import { createSelector } from 'reselect'

const getAllStudies = state => {
  return state.data.get('studies')
}

export const getAllStudiesSelector = createSelector([getAllStudies], studies =>
  studies?.get('data')
)

export const getErrorsAllStudiesSelector = createSelector([getAllStudies], studies =>
  studies?.get('errors')
)
