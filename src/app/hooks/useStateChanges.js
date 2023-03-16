import { useEffect, useContext } from 'react'
import { SnackbarContext } from 'app/contexts/SnackbarProvider'

export function useStateChanges(
  stateField,
  stateChanged,
  snackbarType,
  snackbarText,
  resetStateChanged,
  fn,
  fnValue
) {
  const { setSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    if (stateChanged) {
      setSnackbar(snackbarType, snackbarText)
      resetStateChanged(stateField)
      if (fn) fn(fnValue)
    }
  }, [
    stateField,
    setSnackbar,
    stateChanged,
    snackbarType,
    snackbarText,
    resetStateChanged,
    fn,
    fnValue
  ])
}
