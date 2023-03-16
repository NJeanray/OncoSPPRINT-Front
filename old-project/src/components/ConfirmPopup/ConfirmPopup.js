import React from 'react'

import Button from '@material-ui/core/Button/index'
import DialogTitle from '@material-ui/core/DialogTitle/index'
import DialogActions from '@material-ui/core/DialogActions/index'
import Dialog from '@material-ui/core/Dialog/index'

const ConfirmPopup = ({ open, onClose, onConfirm, popUpText }) => (
  <Dialog
    open={open}
    fullWidth={false}
    maxWidth="sm"
    onClose={onClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle className="dialog-title">{popUpText ? popUpText : 'Are you sure ?'}</DialogTitle>
    <DialogActions className="dialog-action__wrapper">
      <Button className="dialog-actions__btn dialog-actions__btn--cancel" onClick={onClose}>
        Cancel
      </Button>
      <Button
        className="dialog-actions__btn dialog-actions__btn--confirm"
        onClick={onConfirm}
        color="primary"
      >
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmPopup
