import React, { createContext } from 'react'

export const EventFormContext = createContext(null)

export function EventFormProvider({ value, children }) {
  return <EventFormContext.Provider value={value}>{children}</EventFormContext.Provider>
}
