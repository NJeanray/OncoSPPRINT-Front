import { createSelector } from 'reselect'

const getAddress = state => {
  return state.data.get('address')
}

export const getLaboratoryAddress = createSelector([getAddress], addresses => {
  const addressesList = addresses?.get('data')
  if (!addressesList || addressesList?.size === 0) return []

  return addressesList
    .valueSeq()
    .toJS()
    .map(address => ({
      value: address?.addresses[0].address,
      label: address?.addresses[0].address.trim()
    }))
})
