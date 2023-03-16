import React, { useEffect, useCallback } from 'react'
import { isEmpty } from 'lodash'
import Grid from '@material-ui/core/Grid'

import { laboratoriesEndpoint } from 'app/api/endpoints'
import Select from 'app/components/select'

function getSiteNameFromAddress(address) {
  const addressLowerCase = address.toLowerCase()

  if (addressLowerCase.includes('montréal')) return 'MTL'
  if (addressLowerCase.includes('marcel')) return 'MAR'
  if (addressLowerCase.includes('ulis')) return 'ULIS IPSEN'
  if (addressLowerCase.includes('villebon')) return 'CFH'
  return 'DIJ'
}

const AddressLaboratorySelect = ({
  action,
  disabled,
  address,
  setAddress,
  addressesNames,
  transportCountryName,
  laboratoriesNames,
  fetchEntities,
  isLaboratoriesLoading,
  setLaboratoryId,
  laboratoryId
}) => {
  const fetchLaboratories = useCallback(
    (stateField, params = {}) => {
      fetchEntities(stateField, {
        endpoint: laboratoriesEndpoint(),
        params
      })
    },
    [fetchEntities]
  )

  useEffect(() => {
    if (
      action === 'update' &&
      transportCountryName &&
      address &&
      laboratoryId &&
      isEmpty(laboratoriesNames)
    ) {
      const siteName = getSiteNameFromAddress(address)

      fetchLaboratories('laboratories', {
        country: transportCountryName,
        site_name: siteName
      })
    }
    // eslint-disable-next-line
  }, [action])

  useEffect(() => {
    if (transportCountryName) fetchLaboratories('address', { country: transportCountryName })
  }, [transportCountryName, fetchLaboratories])

  function onSelectAddress(addressSelected) {
    setAddress(addressSelected)
    const siteAddressSelected = addressesNames.filter(item => item.value === addressSelected)
    const siteName = getSiteNameFromAddress(addressSelected)

    if (!isEmpty(siteAddressSelected))
      fetchLaboratories('laboratories', {
        country: transportCountryName,
        site_name: siteName
      })
  }

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Select
          width="100%"
          label="eventTransfertForm.Address"
          value={address}
          onChange={e => onSelectAddress(e.target.value)}
          options={addressesNames}
          disabled={!transportCountryName || disabled}
        />
      </Grid>
      <Select
        disabled={!address || disabled}
        isLoading={isLaboratoriesLoading}
        value={laboratoryId || ''}
        onChange={e => setLaboratoryId(e.target.value)}
        options={laboratoriesNames}
        label="eventTransfertForm.Laboratory"
      />
    </Grid>
  )
}

export default AddressLaboratorySelect
