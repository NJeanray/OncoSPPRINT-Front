import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'

const ClearButton = ({ disabled = false, onClickFn = {} }) => {
  return (
    <IconButton disabled={disabled} size="small" style={{ padding: '15px' }} onClick={onClickFn}>
      <ClearIcon />
    </IconButton>
  )
}

export default ClearButton
