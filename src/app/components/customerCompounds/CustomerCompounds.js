import React, { useEffect, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'

import { customerCompoundsEndpoint } from 'app/api/endpoints'
import SearchSelect from 'app/components/searchSelect/SearchSelect'
import TextField from 'app/components/textField'
import ClearButton from 'app/components/clearButton'
import RadioGroupField from 'app/components/radioGroupField'

const CompoundClient = ({
  customCompoundText,
  radioValue,
  onChangeRadio,
  disabled,
  setCustomerCompoundToDisplay,
  customerCompoundToDisplay,
  isCustomerCompoundsLoading,
  customerCompoundData,
  customerCompoundsNames,
  onChangeTextField,
  fetchEntities,
  onSelect
}) => {
  const fetchCustomerCompounds = useCallback(
    name => {
      const params = name ? { name } : {}

      fetchEntities('customersCompounds', {
        endpoint: customerCompoundsEndpoint(),
        params
      })
    },
    [fetchEntities]
  )

  useEffect(() => {
    fetchCustomerCompounds()
  }, [fetchCustomerCompounds])

  const onSelectCustomerCompound = itemSelected => onSelect(itemSelected)

  return (
    <div style={{ width: '100%' }}>
      <RadioGroupField
        formDisabled={disabled}
        label=""
        labelRadioRight="customerCompounds.radio.selectCustomerCompound"
        labelRadioLeft="customerCompounds.radio.createCustomerCompound"
        value={radioValue}
        setValue={value => onChangeRadio(value)}
        direction="column"
        align="flex-start"
      />
      {customerCompoundToDisplay && customerCompoundData && customerCompoundData.label ? (
        <div style={{ display: 'flex' }}>
          <TextField
            disabled
            width="100%"
            label={<FormattedMessage id="customerCompounds" />}
            value={customerCompoundData?.label}
          />
          <ClearButton
            disabled={disabled}
            onClickFn={() => {
              onSelectCustomerCompound('')
              setCustomerCompoundToDisplay(false)
            }}
          />
        </div>
      ) : radioValue ? (
        <TextField
          required
          width="70px"
          label={<FormattedMessage id="customerCompounds" />}
          value={customCompoundText}
          onChange={e => onChangeTextField(e.target.value)}
        />
      ) : (
        <SearchSelect
          disabled={disabled}
          isLoading={isCustomerCompoundsLoading}
          value={customerCompoundData}
          setValue={() => {}}
          fetchOptions={fetchCustomerCompounds}
          options={customerCompoundsNames}
          label="customerCompounds"
          required
          onSelect={item => onSelectCustomerCompound(item)}
        />
      )}
    </div>
  )
}

export default CompoundClient
