import React from 'react'
import { sortBy } from 'lodash'

import MuiDownshift from './muiDownshift'

const SearchSelect = ({
  disabled,
  fetchOptions,
  fetchParam = null,
  label,
  onSelect,
  options,
  required,
  setValue,
  value = ''
}) => {
  const [fieldInputValue, setFieldInputValue] = React.useState('')

  const handleOnSelect = itemSelected => {
    if (!itemSelected) {
      setFieldInputValue('')
      fetchOptions(null, fetchParam)
    }
    onSelect(itemSelected)
  }

  return (
    <MuiDownshift
      value={value?.label || fieldInputValue}
      disabled={disabled}
      options={sortBy(options, [opt => opt.label])}
      label={label}
      required={required}
      onSelect={handleOnSelect}
      onTyping={event => {
        if (value) {
          setValue(null)
        } else if (event.type !== 2 && event.inputValue) {
          fetchOptions(event.inputValue, fetchParam)
          setFieldInputValue(event.inputValue)
        } else if (event.type !== 2 && !event.inputValue && fieldInputValue) {
          fetchOptions(null, fetchParam)
          setFieldInputValue('')
        }
      }}
    />
  )
}

export default SearchSelect
