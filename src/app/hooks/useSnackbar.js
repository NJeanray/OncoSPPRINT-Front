import { useState } from 'react'

export function useSnackbar() {
  const [snackbarType, setSnackbarType] = useState()
  const [snackbarText, setSnackbarText] = useState()

  return {
    snackbarType,
    setSnackbarType,
    snackbarText,
    setSnackbarText
  }
}
