import { createSelector } from 'reselect'

const getParts = state => {
  return state.data.get('parts')
}

export const getPartsFromStudiesSelector = createSelector(
  [getParts, (_, arg) => arg],
  (parts, studyId) => {
    const partsData = parts?.get('data')

    if (!partsData) return null

    const partFromStudy = partsData.filter(part => part.get('study_id').toString() === studyId)

    return partFromStudy.size === 0 ? null : partFromStudy
  }
)

export const getErrorsAllPartsSelector = createSelector([getParts], parts => parts?.get('errors'))
