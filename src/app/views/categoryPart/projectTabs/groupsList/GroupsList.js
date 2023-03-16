import React from 'react'
import { fromJS } from 'immutable'
import { isEmpty } from 'lodash'

import { groupsEndpoint } from 'app/api/endpoints'
import StyledTableContainer from 'app/components/styledTableContainer'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import CreateGroup from 'app/views/createGroup'
import ModifyGroup from 'app/views/modifyGroup'
import CustomSpinner from 'app/components/customSpinner'
import { useStateChanges } from 'app/hooks/useStateChanges'
import GroupsListTable from './GroupsListTable'
import { groupCreatedText, groupUpdatedText, groupDeletedText } from './GroupsList.utils'

const GroupsList = ({
  disabledBtn,
  fetchGroups,
  fetchEvents,
  groups,
  groupCreated,
  groupUpdated,
  deleteEntities,
  projectId,
  studyId,
  partId,
  groupsTable,
  isGroupsLoading,
  groupDeleted,
  resetStateDeleted,
  resetStateErrors,
  resetStateCreated,
  resetStateUpdated
}) => {
  const [groupSelected, setGroupSelected] = React.useState(null)
  const [openCreatingModal, setOpenCreatingModal] = React.useState(false)
  const [openModifyingModal, setOpenModifyingModal] = React.useState(false)

  const handleModify = groupToModifyId => {
    setGroupSelected(groups.get(groupToModifyId.toString()))
    setOpenModifyingModal(true)
  }

  const handleDelete = groupToDeleteId =>
    deleteEntities('groups', {
      endpoint: groupsEndpoint(projectId, studyId, partId, groupToDeleteId),
      params: fromJS({
        id: groupToDeleteId
      })
    })

  const actionAfterDeletingGroup = () => {
    fetchGroups()
    fetchEvents()
  }

  useStateChanges(
    'groups',
    groupCreated,
    'success',
    groupCreatedText(groupCreated),
    resetStateCreated,
    setOpenCreatingModal,
    false
  )

  useStateChanges(
    'groups',
    groupUpdated,
    'success',
    groupUpdatedText(groupUpdated),
    resetStateUpdated,
    setOpenModifyingModal,
    false
  )

  useStateChanges(
    'groups',
    groupDeleted,
    'success',
    groupDeletedText,
    resetStateDeleted,
    actionAfterDeletingGroup,
    ''
  )

  if (isGroupsLoading) return <CustomSpinner type="square" wrapper />

  return (
    <StyledTableContainer>
      {isEmpty(groupsTable) && !isGroupsLoading && !disabledBtn && (
        <div className="styled-table-container__header">
          <StyledMainAddBtn onClick={() => setOpenCreatingModal(true)} />
        </div>
      )}
      <GroupsListTable
        handleModify={handleModify}
        handleDelete={handleDelete}
        groupsTable={groupsTable}
        disabledBtn={disabledBtn}
      />
      <CreateGroup
        open={openCreatingModal}
        onClose={() => {
          resetStateErrors('groups')
          setOpenCreatingModal(false)
        }}
        projectId={projectId}
        studyId={studyId}
        partId={partId}
      />
      <ModifyGroup
        open={openModifyingModal}
        onClose={() => {
          resetStateErrors('groups')
          setOpenModifyingModal(false)
        }}
        groupSelected={groupSelected}
        projectId={projectId}
        studyId={studyId}
        partId={partId}
      />
    </StyledTableContainer>
  )
}

export default GroupsList
