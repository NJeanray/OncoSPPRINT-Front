import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import SmallSpinner from '../SmallSpinner'
import { withStyles } from '@material-ui/core/styles/index'
import FormControl from '@material-ui/core/FormControl/index'
import InputLabel from '@material-ui/core/InputLabel/index'
import MenuItem from '@material-ui/core/MenuItem/index'
import MaterialSelect from '@material-ui/core/Select/index'

import { isDefined } from 'lib/utils'

const styles = theme => ({
  root: {
    width: '100%'
  },
  formControl: {
    minWidth: 300,
    maxWidth: '100%'
  }
})

const getValue = (valueField, idField) => {
  if (valueField) {
    return typeof valueField === 'object' && valueField !== null ? valueField[idField] : valueField
  }
  return ''
}

const Select = withStyles(styles)(props => {
  const { classes } = props
  const idField = props.inputProps ? props.inputProps.id : 'id'
  const labelField = props.inputProps ? props.inputProps.name : 'name'

  return (
    <div className={classes.root}>
      <FormControl
        className={classes.formControl}
        disabled={props.disabled}
        required={props.required}
      >
        <InputLabel htmlFor={props.id}>
          <FormattedMessage id={props.label} default={props.label} />
        </InputLabel>
        <MaterialSelect
          id={props.id}
          value={isDefined(props.value) ? props.value : ''}
          onChange={(event, target) => props.onChange(target)}
          inputProps={{
            name: labelField,
            id: idField
          }}
        >
          {props.options ? (
            props.options.map(option => (
              <MenuItem key={option[idField]} value={option[idField]} option={option}>
                {option[labelField]}
              </MenuItem>
            ))
          ) : (
            <SmallSpinner />
          )}
        </MaterialSelect>
      </FormControl>
    </div>
  )
})

const APISelect = props => {
  useEffect(() => {
    if (!props.options && props.fetcher && !props.optionsLoading) {
      props[props.fetcher](props.params)
    }
  })
  const idField = props.inputProps ? props.inputProps.id : 'id'

  return (
    <Select
      {...props}
      disabled={
        (typeof props.instance.loadingFields === 'object' &&
          typeof props.instance.loadingFields[props.field] === 'number' &&
          props.instance.loadingFields[props.field] > 0) ||
        props.disabled
      }
      value={getValue(props.instance.object[props.field], idField)}
      onChange={target => props.onChange(props.instance.object.id, target.props.option)}
    />
  )
}

export default APISelect

export { Select }
