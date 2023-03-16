import React, { useState, useEffect, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import { transportsEndpoint } from 'app/api/endpoints'
import TextSubtitle from 'app/components/textSubtitle'
import Select from 'app/components/select'
import TextField from 'app/components/textField'
import RadioGroupField from 'app/components/radioGroupField'
import SearchSelect from 'app/components/searchSelect'
import ClearButton from 'app/components/clearButton'

const transferInternCountries = [
  {
    value: 'France',
    label: 'France'
  },
  {
    value: 'Canada',
    label: 'Canada'
  }
]

const TransportSelect = ({
  action,
  disabled = false,
  transportCountryName,
  isExternal,
  countriesOptions,
  isTransportsLoading,
  fetchEntities,
  setTransportCountryName,
  setLaboratoryId
}) => {
  const [isRadioDisplayed, setIsRadioDisplayed] = useState(action === 'update')
  const [isCountryToSelect, setIsCountryToSelect] = useState(true)
  const fetchCountries = useCallback(
    country => {
      const params = country ? { country } : {}

      fetchEntities('transports', {
        endpoint: transportsEndpoint(),
        params
      })
    },
    [fetchEntities]
  )

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  const onSelectCountry = selected => {
    setTransportCountryName(selected ? selected.value : null)
  }

  return (
    <>
      <Grid item xs={12}>
        <TextSubtitle text="Transports" />
      </Grid>
      {isExternal ? (
        <>
          {isRadioDisplayed ? (
            <div style={{ display: 'flex' }}>
              <TextField
                disabled={disabled}
                width="100%"
                label={<FormattedMessage id="eventTransfertForm.transportCountry" />}
                value={transportCountryName}
              />
              {!disabled && (
                <ClearButton
                  onClickFn={() => {
                    setIsRadioDisplayed(false)
                    setTransportCountryName(null)
                  }}
                />
              )}
            </div>
          ) : (
            <>
              <Grid item xs={12}>
                <RadioGroupField
                  disabled={disabled}
                  label={<FormattedMessage id="eventTransfertForm.transportCountry" />}
                  labelRadioRight="transportSelect.enterCountry"
                  labelRadioLeft="transportSelect.selectCountry"
                  value={isCountryToSelect}
                  setValue={value => {
                    setIsCountryToSelect(value)
                  }}
                  direction="column"
                  align="flex-start"
                />
              </Grid>
              <Grid item xs={6}>
                {isCountryToSelect ? (
                  <div style={{ width: '100%' }}>
                    <SearchSelect
                      disabled={disabled}
                      isLoading={isTransportsLoading}
                      value={
                        transportCountryName
                          ? {
                              value: transportCountryName,
                              label: transportCountryName
                            }
                          : null
                      }
                      setValue={() => {}}
                      fetchOptions={fetchCountries}
                      options={countriesOptions}
                      label="eventTransfertForm.transportCountry"
                      required
                      onSelect={selected => onSelectCountry(selected)}
                    />
                  </div>
                ) : (
                  <TextField
                    disabled={disabled}
                    width="100%"
                    value={transportCountryName}
                    onChange={e => {
                      setTransportCountryName(e.target.value)
                    }}
                    label={<FormattedMessage id="eventTransfertForm.transportCountry" />}
                  />
                )}
              </Grid>
            </>
          )}
        </>
      ) : (
        <Grid item xs={6}>
          <div style={{ width: '100%' }}>
            <Select
              disabled={disabled}
              value={transportCountryName}
              label="eventTransfertForm.transportCountry"
              onChange={e => {
                setTransportCountryName(e.target.value)
                setLaboratoryId(null)
              }}
              options={transferInternCountries}
            />
          </div>
        </Grid>
      )}
      <Grid item xs={6} />
    </>
  )
}

export default TransportSelect
