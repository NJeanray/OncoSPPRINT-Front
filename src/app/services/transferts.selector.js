import { createSelector } from 'reselect'

const getTransferts = state => {
  return state.data.getIn(['transferts', 'data'])
}

export const getTransfertsOptions = createSelector([getTransferts], transferts => {
  if (!transferts) return []

  const transfertsOptions = transferts.valueSeq().map(option => {
    const eachFragment = option.get('fragments').map(fragment => {
      return `<li><b><u>${fragment.get('sample_name')}</u></b> sur ${fragment.get('group_name')} ${
        fragment.get('conservation_brick_name')
          ? `avec conservation <b>${fragment.get('conservation_brick_name')}</b>`
          : ''
      } ${
        fragment.get('temperature') ? `et température <b>${fragment.get('temperature')}</b>` : ''
      }</li>`
    })

    return {
      value: option.get('id'),
      label: `${option.get('id')}. ${option.get(
        'brick_name'
      )} des fragments d'un <ul>${eachFragment.toJS()}</ul>`
    }
  })

  return transfertsOptions.toJS()
})
