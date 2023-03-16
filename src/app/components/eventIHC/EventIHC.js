import React, { useContext, useEffect, useState } from 'react'
import { PartContext } from 'app/contexts/PartProvider'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { isEmpty } from 'lodash'
import { eventChoiceFieldsEndpoint, eventEndpoint } from 'app/api/endpoints'
import Select from 'app/components/select'
import ListFormBtn from 'app/components/listFormBtn'
import { FormattedMessage } from 'react-intl'
import TextField from 'app/components/textField'

const EventIHC = ({
  eventChoiceFields,
  ihcTypes,
  isTransfertsLoading,
  fetchEntities,
  transfertsList
}) => {
  const { partSelected } = useContext(PartContext)
  const [ihcType, setIhcType] = useState(null)
  const [blocNumber, setBlocNumber] = useState(0)
  const { action, formDisabled, handleCreateModify, eventSelected } = useContext(EventFormContext)
  const [transfertSelected, setTransfertSelected] = useState([])
  const isBtnDisabled = isEmpty(transfertSelected) && !ihcType

  useEffect(() => {
    if (action === 'update' && eventSelected) {
      setIhcType(eventSelected.get('ihc_type'))
      if (eventSelected.get('ihc_type') === 'parafine_lames')
        setBlocNumber(eventSelected.get('nb_coupe_block'))
    }
  }, [action, eventSelected])

  useEffect(() => {
    fetchEntities('transferts', {
      endpoint: eventEndpoint(),
      params: {
        part_id: partSelected.get('id'),
        types: 'transfer_external,transfer_intern',
        laboratory_name: 'VIV',
        is_linked_event: 'True'
      }
    })
  }, [fetchEntities, partSelected])

  useEffect(() => {
    if (action === 'update' && eventSelected)
      setTransfertSelected(eventSelected.get('transfer_ids').toJS())
  }, [eventSelected, action])

  useEffect(() => {
    if (!eventChoiceFields) {
      fetchEntities('eventChoiceFields', {
        endpoint: eventChoiceFieldsEndpoint(),
        common: true
      })
    }
  }, [eventChoiceFields, fetchEntities])

  const handleClickBtn = () => {
    const payload = {
      transfer_ids: transfertSelected,
      ihc_type: ihcType
    }

    if (action === 'create') payload.type = 'ihc'
    if (ihcType === 'parafine_lames') payload.nb_coupe_block = blocNumber
    else payload.nb_coupe_block = null
    handleCreateModify(payload)
  }

  return (
    <div>
      <Select
        disabled={formDisabled}
        multiple
        label="eventFacsExVivoBCEForm.transferts"
        value={transfertSelected}
        onChange={e => setTransfertSelected(e.target.value)}
        options={transfertsList}
        multipleChipField="value"
        isLoading={isTransfertsLoading}
        htmlTag
      />
      <Select
        disabled={formDisabled}
        label="eventIHC.IHCMethods"
        value={ihcType}
        onChange={e => setIhcType(e.target.value)}
        options={ihcTypes}
      />
      {ihcType && ihcType === 'parafine_lames' && (
        <TextField
          disabled={formDisabled}
          width="100%"
          required
          type="number"
          label={<FormattedMessage id="eventIHC.blocNumber" />}
          value={blocNumber}
          onChange={e => setBlocNumber(e.target.value)}
          inputProps={{
            onInput: e => {
              e.target.value = Number(e.target.value)
            },
            min: 0
          }}
        />
      )}
      {!formDisabled && (
        <ListFormBtn
          isBtnDisabled={isBtnDisabled}
          action={action}
          handleCreate={handleClickBtn}
          handleModify={handleClickBtn}
        />
      )}
    </div>
  )
}

export default EventIHC
