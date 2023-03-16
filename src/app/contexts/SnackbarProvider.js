import React, { createContext } from 'react'

export const SnackbarContext = createContext(null)

export function SnackbarProvider({ value, children }) {
  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
}
