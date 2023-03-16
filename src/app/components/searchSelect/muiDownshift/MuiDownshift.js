// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import MuiSelect from 'mui-downshift'
import { FormattedMessage } from 'react-intl'

type OptionsType = {
  label: String,
  value: String
}

type Props = {
  options: Array<OptionsType>,
  label: String,
  value: String,
  disabled: boolean,
  onSelect: () => void,
  onTyping: (*) => void,
  required: boolean
}

const MuiDownshiftWrapper = styled.div`
  ${({ theme: { colors, fontSize } }) => css`
    .MuiFormLabel-root {
      text-transform: uppercase;
      color: ${colors['purple-color']};
      font-size: ${fontSize['small-font-size']};
    }
  `}
`

const MuiDownshift = ({
  options,
  label,
  onSelect,
  onTyping,
  value,
  disabled = false,
  required = false
}: Props) => {
  const onStateChange = event => {
    if (!event || event.selectedItem || event.type === '__autocomplete_item_mouseenter__') return
    onTyping(event)
  }

  return (
    <MuiDownshiftWrapper>
      <MuiSelect
        items={options}
        onChange={onSelect}
        focusOnClear
        onStateChange={onStateChange}
        getInputProps={() => ({
          label: <FormattedMessage id={label} />,
          required,
          disabled,
          value: value || ''
        })}
      />
    </MuiDownshiftWrapper>
  )
}

export default MuiDownshift
