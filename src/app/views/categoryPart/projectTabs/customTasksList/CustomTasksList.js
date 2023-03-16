import React, { useState, useEffect, useCallback } from 'react'
import { fromJS } from 'immutable'
import StyledTableContainer from 'app/components/styledTableContainer'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import ModifyCustomTask from 'app/views/modifyCustomTask'

import { customTasksEndpoint } from 'app/api/endpoints'
import CreateCustomTask from 'app/views/createCustomTask'
import CustomSpinner from 'app/components/customSpinner'
import CustomTasksListTable from './CustomTasksListTable'
import { useStateChanges } from 'app/hooks/useStateChanges'
import {
  customTaskCreatedText,
  customTaskUpdatedText,
  customTaskDeletedText
} from './CustomTasksList.utils'

const CustomTasksList = ({
  disabledBtn,
  resetStateDeleted,
  customTaskDeleted,
  resetStateCreated,
  resetStateUpdated,
  customTaskCreated,
  isCustomTasksLoading,
  customTaskUpdated,
  customTasksTable,
  fetchEntities,
  customTasks,
  projectId,
  studyId,
  partId,
  deleteEntities
}) => {
  const [customTaskSelected, setCustomTaskSelected] = useState(null)
  const [openCreatingModal, setOpenCreatingModal] = useState(false)
  const [openModifyingModal, setOpenModifyingModal] = useState(false)
  const getCustomTasksRequest = useCallback(
    () =>
      fetchEntities('customTasks', {
        endpoint: customTasksEndpoint(projectId, studyId, partId)
      }),
    [fetchEntities, partId, projectId, studyId]
  )

  useEffect(() => {
    getCustomTasksRequest()
  }, [partId, getCustomTasksRequest])

  useStateChanges(
    'customTasks',
    customTaskCreated,
    'success',
    customTaskCreatedText,
    resetStateCreated,
    setOpenCreatingModal,
    false
  )

  useStateChanges(
    'customTasks',
    customTaskUpdated,
    'success',
    customTaskUpdatedText,
    resetStateUpdated,
    setOpenModifyingModal,
    false
  )

  useStateChanges(
    'customTasks',
    customTaskDeleted,
    'success',
    customTaskDeletedText,
    resetStateDeleted
  )

  const handleDelete = customTaskToDeleteId =>
    deleteEntities('customTasks', {
      endpoint: customTasksEndpoint(projectId, studyId, partId, customTaskToDeleteId),
      params: fromJS({ id: customTaskToDeleteId })
    })

  const handleModify = customTaskId => {
    setCustomTaskSelected(customTasks.get(customTaskId.toString()))
    setOpenModifyingModal(true)
  }

  if (isCustomTasksLoading) return <CustomSpinner type="square" wrapper />

  return (
    <StyledTableContainer>
      {!disabledBtn && (
        <div className="styled-table-container__header">
          <StyledMainAddBtn onClick={() => setOpenCreatingModal(true)} />
        </div>
      )}
      <CustomTasksListTable
        disabledBtn={disabledBtn}
        handleModify={handleModify}
        handleDelete={handleDelete}
        customTasksTable={customTasksTable}
      />
      <CreateCustomTask
        projectId={projectId}
        studyId={studyId}
        partId={partId}
        open={openCreatingModal}
        onClose={() => setOpenCreatingModal(false)}
      />
      <ModifyCustomTask
        projectId={projectId}
        studyId={studyId}
        partId={partId}
        customTaskSelected={customTaskSelected}
        open={openModifyingModal}
        onClose={() => setOpenModifyingModal(false)}
      />
    </StyledTableContainer>
  )
}

export default CustomTasksList
