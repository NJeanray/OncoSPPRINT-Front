import { FormattedMessage } from 'react-intl'
import React from 'react'

export function initializeGroupsOptions(groupsName, groups) {
  if (groups.size === 1) return groupsName
  return [
    {
      value: 0,
      label: <FormattedMessage id="eventForm.allGroups" />
    },
    {
      value: -1,
      label: <FormattedMessage id="eventForm.allGroupsExceptG0" />
    },
    ...groupsName
  ]
}

export function isFrequencyDisplay(category) {
  return category !== 'subcontracting'
}

export function isGroupDisplay(category) {
  if (
    category === 'subcontracting' ||
    category === 'facs_ex_vivo_bce' ||
    category === 'facsExVivoBCE' ||
    category === 'dosageElisa' ||
    category === 'dosage_elisa' ||
    category === 'ihc' ||
    category === 'transfert' ||
    category === 'transfer_intern' ||
    category === 'transfer_external'
  )
    return false
  return true
}
