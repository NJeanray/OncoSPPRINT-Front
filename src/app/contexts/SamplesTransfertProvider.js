import React, { createContext } from 'react'

export const SamplesTransfertContext = createContext(null)

export function SamplesTransfertProvider({ value, children }) {
  return (
    <SamplesTransfertContext.Provider value={value}>{children}</SamplesTransfertContext.Provider>
  )
}
