import React from 'react'

export function useEventChanges(eventAction, fetchGroups) {
  React.useEffect(() => {
    if (eventAction && eventAction.type === 'randomisation') {
      fetchGroups()
    }
  }, [eventAction, fetchGroups])
}
