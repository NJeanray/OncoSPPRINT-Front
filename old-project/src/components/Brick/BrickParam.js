import React from 'react'

import InputText from '../Form'
import { Select } from '../Select/Select'
import { isDefined } from '../../lib/utils'

const BLACK_LIST = {
  animal_specie: true,
  sexe: true,
  bacterium: true,
  animal_strain: true,
  specific_demand: true
}

const Param = ({ name, values, value, onChange }) => {
  if (BLACK_LIST[name]) {
    return null
  }
  if (values) {
    if (values.length === 1) {
      if (!isDefined(value)) {
        onChange(name, values[0])
      }
      return null
    }
    return (
      <Select
        id={`param_${name}`}
        value={value}
        label={name}
        onChange={v => onChange(name, v.props.option.id)}
        name={name}
        options={values.map(value => ({ id: value, name: value }))}
      />
    )
  } else {
    return (
      <InputText
        id={`param_${name}`}
        type="number"
        value={value}
        label={name}
        onChange={e => onChange(name, parseFloat(e.currentTarget.value))}
      />
    )
  }
}

export default Param
