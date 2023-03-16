import React, { createContext } from 'react'

export const PartContext = createContext(null)

export function PartProvider({ value, children }) {
  return <PartContext.Provider value={value}>{children}</PartContext.Provider>
}
