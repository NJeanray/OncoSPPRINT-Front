import React from 'react'
import { FormattedMessage } from 'react-intl'

export const eventCategories = [
  {
    label: <FormattedMessage id="event.induction" />,
    value: 'induction'
  },
  {
    label: <FormattedMessage id="event.monitoring" />,
    value: 'monitoring'
  },
  {
    label: <FormattedMessage id="event.randomisation" />,
    value: 'randomisation'
  },
  {
    label: <FormattedMessage id="event.treatment" />,
    value: 'treatment'
  },
  {
    label: <FormattedMessage id="event.sample" />,
    value: 'sample'
  },
  {
    label: <FormattedMessage id="event.transfertFromSample" />,
    value: 'transfert'
  },
  {
    label: <FormattedMessage id="event.imagery" />,
    value: 'imagery'
  },
  {
    label: <FormattedMessage id="event.subcontracting" />,
    value: 'subcontracting'
  },
  {
    label: <FormattedMessage id="event.facsExVivoBCE" />,
    value: 'facsExVivoBCE'
  },
  {
    label: <FormattedMessage id="event.dosageElisa" />,
    value: 'dosageElisa'
  },
  {
    label: <FormattedMessage id="event.ihc" />,
    value: 'ihc'
  }
]

export const isPartAddedToPayload = category =>
  !category === 'transfert' || !category === 'transfer_intern' || !category === 'transfer_external'
