import React from 'react'

import EventCategoryWrapper from './EventCategory.styled'

type Props = {
  groupsSize: number,
  onSelect: string => void,
  category: { label: any, value: string }
}

const EventCategory = ({ groupsSize, onSelect, category }: Props) => {
  const isCategoryDisbled = () => {
    if (category.value === 'subcontracting') return false
    if (
      category.value === 'randomisation' ||
      category.value === 'induction' ||
      category.value === 'imagery' ||
      category.value === 'treatment' ||
      category.value === 'monitoring' ||
      category.value === 'sample' ||
      category.value === 'transfert' ||
      category.value === 'monitoring' ||
      category.value === 'facsExVivoBCE' ||
      category.value === 'dosageElisa' ||
      category.value === 'ihc'
    )
      return groupsSize === 0
    return category.value !== 'randomization'
  }

  return (
    <EventCategoryWrapper disabled={isCategoryDisbled()} onClick={() => onSelect(category.value)}>
      {category.label}
    </EventCategoryWrapper>
  )
}

export default EventCategory
