import React from 'react'
import { isEmpty, sortBy } from 'lodash'

export function useItemSidebar(allItems, cb) {
  React.useEffect(() => {
    if (isEmpty(allItems)) cb([])

    if (allItems) {
      const getItemArray = allItems.valueSeq().map(eachStudy => ({
        id: eachStudy.get('id'),
        name: eachStudy.get('name').toUpperCase(),
        type: eachStudy.get('type'),
        study_id: eachStudy.get('study_id')
      }))

      cb(sortBy(getItemArray.toJS(), [item => item.id]))
    }
  }, [allItems, cb])
}
