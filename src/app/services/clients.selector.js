import { createSelector } from 'reselect'

const getStateClientsAddress = state => {
  return state.data.get('clients')
}

const getClientsAddress = client => ({
  name: client.get('name'),
  label: `${client.get('address1')} ${client.get('address2')} ${client.get(
    'address3'
  )} ${client.get('city')} ${client.get('zipcode')} ${client.get('country')}`,
  value: client.get('id')
})

export const getClientsAddressSelector = createSelector([getStateClientsAddress], clients => {
  const clientsList = clients?.get('data')
  if (!clientsList || !clientsList?.size === 0) return []

  return clientsList
    .valueSeq()
    .map(client => getClientsAddress(client))
    .toJS()
})
