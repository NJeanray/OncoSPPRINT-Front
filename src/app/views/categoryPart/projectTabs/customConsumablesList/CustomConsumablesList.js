import React, { useCallback, useEffect, useState } from 'react'
import { fromJS } from 'immutable'

import { customConsumablesEndpoint } from 'app/api/endpoints'
import StyledMainAddBtn from 'app/components/styledMainAddBtn/StyledMainAddBtn'
import StyledTableContainer from 'app/components/styledTableContainer'
import CreateCustomConsumable from 'app/views/createCustomConsumable'
import ModifyCustomConsumable from 'app/views/modifyCustomConsumable'
import CustomConsumablesListTable from './CustomConsumablesListTable'
import CustomSpinner from 'app/components/customSpinner'
import { useStateChanges } from 'app/hooks/useStateChanges'
import {
  customConsumableCreatedText,
  customConsumableDeletedText,
  customConsumableUpdatedText
} from './CustomConsumablesList.utils'

const CustomConsumablesList = ({
  disabledBtn,
  resetStateDeleted,
  customConsumableDeleted,
  resetStateCreated,
  resetStateUpdated,
  customConsumableCreated,
  isCustomConsumablesLoading,
  customConsumableUpdated,
  customConsumablesTable,
  fetchEntities,
  customConsumables,
  projectId,
  studyId,
  partId,
  deleteEntities
}) => {
  const [customConsumableSelected, setCustomConsumableSelected] = useState(null)
  const [openCreatingModal, setOpenCreatingModal] = useState(false)
  const [openModifyingModal, setOpenModifyingModal] = useState(false)
  const getCustomTasksRequest = useCallback(
    () =>
      fetchEntities('customConsumables', {
        endpoint: customConsumablesEndpoint(projectId, studyId, partId)
      }),
    [fetchEntities, partId, projectId, studyId]
  )

  useEffect(() => {
    getCustomTasksRequest()
  }, [partId, getCustomTasksRequest])

  useStateChanges(
    'customConsumables',
    customConsumableCreated,
    'success',
    customConsumableCreatedText,
    resetStateCreated,
    setOpenCreatingModal,
    false
  )

  useStateChanges(
    'customConsumables',
    customConsumableUpdated,
    'success',
    customConsumableUpdatedText,
    resetStateUpdated,
    setOpenModifyingModal,
    false
  )

  useStateChanges(
    'customConsumables',
    customConsumableDeleted,
    'success',
    customConsumableDeletedText,
    resetStateDeleted
  )

  const handleDelete = customConsumableToDeleteId => {
    if (customConsumableToDeleteId) {
      deleteEntities('customConsumables', {
        endpoint: customConsumablesEndpoint(projectId, studyId, partId, customConsumableToDeleteId),
        params: fromJS({ id: customConsumableToDeleteId })
      })
    }
  }
  const handleModify = customConsumableId => {
    setCustomConsumableSelected(customConsumables.get(customConsumableId.toString()))
    setOpenModifyingModal(true)
  }

  if (isCustomConsumablesLoading) return <CustomSpinner type="square" wrapper />
  return (
    <StyledTableContainer>
      {!disabledBtn && (
        <div className="styled-table-container__header">
          <StyledMainAddBtn onClick={() => setOpenCreatingModal(true)} />
        </div>
      )}
      <CustomConsumablesListTable
        disabledBtn={disabledBtn}
        handleModify={handleModify}
        handleDelete={handleDelete}
        customConsumablesTable={customConsumablesTable}
      />
      <CreateCustomConsumable
        projectId={projectId}
        studyId={studyId}
        partId={partId}
        open={openCreatingModal}
        onClose={() => setOpenCreatingModal(false)}
      />
      <ModifyCustomConsumable
        projectId={projectId}
        studyId={studyId}
        partId={partId}
        open={openModifyingModal}
        onClose={() => setOpenModifyingModal(false)}
        customConsumableSelected={customConsumableSelected}
      />
    </StyledTableContainer>
  )
}

export default CustomConsumablesList
