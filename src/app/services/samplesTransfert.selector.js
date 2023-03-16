import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'

const getSamples = state => {
  return state.data.getIn(['samples', 'data'])
}

const getSampleFragments = state => {
  return state.data.getIn(['sampleFragments', 'data'])
}

export const getSamplesOptions = createSelector([getSamples], sampleFragments => {
  if (!sampleFragments) return []

  const sampleEventsListArray = sampleFragments
    .valueSeq()
    .toJS()
    .reduce((acc, item) => {
      const itemObj = {
        value: item.sample_id,
        label: `${item.group_name}. ${item.sample_name}`
      }
      const itemAlreadyExist = acc.filter(
        existingItem => existingItem.id === itemObj.id && existingItem.label === itemObj.label
      )
      const itemToAdd = isEmpty(itemAlreadyExist) ? itemObj : ''

      return [...acc, itemToAdd]
    }, [])

  return sampleEventsListArray.filter(item => item !== '')
})

export const getSampleFragmentsOptions = createSelector([getSampleFragments], sampleFragments => {
  if (!sampleFragments) return []

  return sampleFragments
    .valueSeq()
    .toJS()
    .map(item => ({
      value: item.id,
      label: `${item.id}. Conservation : ${item.conservation_brick_name} | Temperature : ${item.temperature}`
    }))
})
