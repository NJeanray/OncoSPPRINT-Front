import React from 'react'
import { Snackbar } from '@material-ui/core'

export const SnackbarCtx = React.createContext(null)

export const SnackbarProvider = ({ value, children }) => {
  return <SnackbarCtx.Provider value={value}>{children}</SnackbarCtx.Provider>
}
