import React, { createContext } from 'react'

export const PartAnimalsDataContext = createContext(null)

export function PartAnimalsDataProvider({ value, children }) {
  return <PartAnimalsDataContext.Provider value={value}>{children}</PartAnimalsDataContext.Provider>
}
