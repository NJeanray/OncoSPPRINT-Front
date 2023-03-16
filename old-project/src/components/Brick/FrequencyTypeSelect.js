import React from 'react'

// import { Select } from '../Select/Select'
import Select from '@material-ui/core/Select'
import { InputLabel, MenuItem } from '@material-ui/core'

import { isEmpty } from 'lodash'

const options = [
  { name: 'Before/after another brick', id: 'before/after' },
  { name: 'Custom Frequency', id: 'cf' }
]

const FrequencyTypeSelect = props => {
  const [option, setOption] = React.useState(
    props.brick.schedule && props.brick.schedule
      ? props.brick.schedule.type === 'bf' || props.brick.schedule.type === 'af'
        ? options[0]
        : props.brick.schedule.type === 'cf'
        ? options[1]
        : ''
      : ''
  )

  function shouldOptionBeDisabled(option) {
    if (option.id === 'before/after' && props.allBricks.length < 3) return true
    else if (
      option.id === 'before/after' &&
      isEmpty(
        props.allBricks.filter(
          brick => brick.brick.id !== 33 && brick.brick.id !== 32 && brick.id !== props.brick.id
        )
      )
    )
      return true
    return false
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '10px 0' }}>
      <InputLabel htmlFor="brick-select-label">Scheduling Type</InputLabel>
      <Select
        id="brick_frequency_type"
        renderValue={option => (option ? option.name : '')}
        value={option}
        onChange={v => {
          setOption(v.target.value)
          props.onChange(v.target.value.id)
        }}
      >
        {options.map(option => (
          <MenuItem disabled={shouldOptionBeDisabled(option)} value={option}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default FrequencyTypeSelect
