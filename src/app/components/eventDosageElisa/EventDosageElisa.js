import React, { useContext, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import Select from 'app/components/select'
import { PartContext } from 'app/contexts/PartProvider'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { eventEndpoint } from 'app/api/endpoints'
import ListFormBtn from 'app/components/listFormBtn'

const EventDosageElisa = ({ isTransfertsLoading, fetchEntities, transfertsList }) => {
  const { partSelected } = useContext(PartContext)
  const { action, formDisabled, handleCreateModify, eventSelected } = useContext(EventFormContext)
  const [transfertSelected, setTransfertSelected] = useState([])
  const isBtnDisabled = isEmpty(transfertSelected)

  useEffect(() => {
    fetchEntities('transferts', {
      endpoint: eventEndpoint(),
      params: {
        part_id: partSelected.get('id'),
        types: 'transfer_external,transfer_intern',
        laboratory_name: 'CRB',
        is_linked_event: 'True'
      }
    })
  }, [fetchEntities, partSelected])

  const handleClickBtn = () => {
    const payload = {
      transfer_ids: transfertSelected
    }

    if (action === 'create') payload.type = 'dosage_elisa'
    handleCreateModify(payload)
  }

  useEffect(() => {
    if (action === 'update' && eventSelected)
      setTransfertSelected(eventSelected.get('transfer_ids').toJS())
  }, [eventSelected, action])

  return (
    <div>
      <Select
        multiple
        disabled={formDisabled}
        label="eventFacsExVivoBCEForm.transferts"
        value={transfertSelected}
        onChange={e => setTransfertSelected(e.target.value)}
        options={transfertsList}
        multipleChipField="value"
        isLoading={isTransfertsLoading}
        htmlTag
      />
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

export default EventDosageElisa
