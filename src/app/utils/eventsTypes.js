import React from 'react'
import { FormattedMessage } from 'react-intl'

const eventTypes = ({
  withTransfer = false,
  withFacs = false,
  withIhc = false,
  withDosageElisa = false
}) => {
  const types = [
    {
      value: 'randomisation',
      label: <FormattedMessage id="event.randomisation" />
    },
    {
      value: 'induction',
      label: <FormattedMessage id="event.induction" />
    },
    {
      value: 'imagery',
      label: <FormattedMessage id="event.imagery" />
    },
    {
      value: 'treatment',
      label: <FormattedMessage id="event.treatment" />
    },
    {
      value: 'monitoring',
      label: <FormattedMessage id="event.monitoring" />
    },
    {
      value: 'sample',
      label: <FormattedMessage id="event.sample" />
    },
    {
      value: 'subcontracting',
      label: <FormattedMessage id="event.subcontracting" />
    }
  ]

  if (withTransfer)
    types.push({
      value: 'transfer_external,transfer_intern',
      label: <FormattedMessage id="event.transfert" />
    })
  if (withFacs)
    types.push({
      value: 'facs_ex_vivo_bce',
      label: <FormattedMessage id="event.facsExVivoBCE" />
    })
  if (withIhc)
    types.push({
      value: 'ihc',
      label: <FormattedMessage id="event.ihc" />
    })
  if (withDosageElisa)
    types.push({
      value: 'dosage_elisa',
      label: <FormattedMessage id="event.dosageElisa" />
    })
  return types
}

export default eventTypes
