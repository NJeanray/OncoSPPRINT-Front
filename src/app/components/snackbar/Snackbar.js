// @flow
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import Alert from 'app/components/alert'

type Props = {
  text: string,
  open: boolean,
  handleClose: () => void,
  snackbarType: string
}

export default function({ text, open, handleClose, snackbarType = 'success' }: Props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={open}
      autoHideDuration={5500}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackbarType}>
        {text}
      </Alert>
    </Snackbar>
  )
}
