import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import styled, { css } from 'styled-components'
import MuiSelect from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'

import CustomSpinner from 'app/components/customSpinner'

const SelectWrapper = styled(FormControl)`
  ${({ theme: { colors, fontSize } }) => css`
    && {
      width: 100%;

      .MuiFormLabel-root {
        color: ${colors['purple-color']};
        text-transform: uppercase;
        font-size: ${fontSize['small-font-size']};
      }

      .MuiInput-root {
        width: 100%;
        margin-bottom: 8px;
      }
    }
  `}
`

const Select = ({
  multiple = false,
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  options,
  isLoading = false,
  isOptionDisabled,
  highlightedOptionsObj,
  highlightedKey,
  htmlTag = false,
  multipleChipField = 'label'
}) => {
  const displayLabel = optLabel => {
    return highlightedOptionsObj &&
      highlightedOptionsObj[highlightedKey].includes(optLabel.toLowerCase()) ? (
      <u>
        <b>{optLabel}</b>
        &#x3BC;g
      </u>
    ) : optLabel === '&#x3BC;g' ? (
      <sup style={{ fontSize: '19px' }}>&#x3BC;g</sup>
    ) : (
      <>{optLabel}</>
    )
  }
  const renderItems = () =>
    options.map(opt => {
      const isDisabled = isOptionDisabled?.(opt.label)

      return (
        <MenuItem key={opt.value} value={opt.value} disabled={isDisabled}>
          {htmlTag ? (
            <div dangerouslySetInnerHTML={{ __html: opt.label }} />
          ) : (
            displayLabel(opt.label)
          )}
        </MenuItem>
      )
    })

  const renderMessageEmptyOptions = () => (
    <MenuItem disabled>
      <FormattedMessage id="global.select.noOptionAvailable" />
    </MenuItem>
  )

  const optionsToDisplay = () => {
    if (isLoading) return <CustomSpinner type="line" />
    if (isEmpty(options)) return renderMessageEmptyOptions()
    return renderItems()
  }

  return (
    <SelectWrapper required={required}>
      {label && (
        <InputLabel htmlFor="select-label">
          <FormattedMessage id={label} />
        </InputLabel>
      )}
      {(!multiple || isEmpty(options)) && (
        <MuiSelect value={value || ''} onChange={onChange} disabled={disabled}>
          {optionsToDisplay()}
        </MuiSelect>
      )}
      {multiple && !isEmpty(options) && (
        <MuiSelect
          style={{ marginTop: '40px' }}
          multiple
          value={value || []}
          onChange={onChange}
          disabled={disabled}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map(itemId => {
                const labelChip = options.filter(opt => opt.value === itemId)[0]?.[
                  multipleChipField
                ]

                return <Chip key={itemId} label={labelChip} />
              })}
            </div>
          )}
        >
          {optionsToDisplay()}
        </MuiSelect>
      )}
    </SelectWrapper>
  )
}

export default Select
