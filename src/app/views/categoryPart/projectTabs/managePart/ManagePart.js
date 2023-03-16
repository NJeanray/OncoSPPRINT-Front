import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'

import PartForm from 'app/components/partForm'
import { partsEndpoint, partDuplicateEndpoint } from 'app/api/endpoints'
import SheetContainer from 'app/components/sheetContainer'
import TextTitle from 'app/components/textTitle/TextTitle'
import { useStateChanges } from 'app/hooks/useStateChanges'
import { partUpdatedText, managePartTitle } from './ManagePart.utils'
import StyledButton from 'app/components/styledButton'
import { FormattedMessage } from 'react-intl'
import CustomSpinner from 'app/components/customSpinner'

const ManagePart = ({
  isPartDuplicating,
  resetStateErrors,
  hasPartDuplicateErrors,
  resetState,
  partDuplicate,
  fetchEntities,
  disabledBtn,
  resetStateUpdated,
  partUpdated,
  projectId,
  studyId,
  partSelected,
  deleteEntities,
  updateEntities,
  history
}) => {
  const [action, setAction] = useState('view')

  const handleDeletePart = React.useCallback(() => {
    deleteEntities('parts', {
      endpoint: partsEndpoint(projectId, studyId, partSelected.get('id')),
      params: partSelected
    })

    history.push(`/projects/${projectId}/study/${studyId}`)
  }, [deleteEntities, history, partSelected, projectId, studyId])

  const handleUpdatePart = React.useCallback(
    params =>
      updateEntities('parts', {
        endpoint: partsEndpoint(projectId, studyId, partSelected.get('id')),
        params
      }),
    [partSelected, projectId, studyId, updateEntities]
  )

  const handleDuplicate = () => {
    fetchEntities('partDuplicate', {
      endpoint: partDuplicateEndpoint(projectId, studyId, partSelected.get('id'))
    })
  }

  useStateChanges(
    'parts',
    partUpdated,
    'success',
    partUpdatedText(partUpdated),
    resetStateUpdated,
    setAction,
    'view'
  )

  useStateChanges(
    'partDuplicate',
    hasPartDuplicateErrors,
    'error',
    hasPartDuplicateErrors ? hasPartDuplicateErrors.state : '',
    resetStateErrors
  )

  useEffect(() => {
    if (partDuplicate) {
      resetState('partDuplicate')
      fetchEntities('parts', {
        endpoint: partsEndpoint(projectId, studyId)
      })
    }
    // eslint-disable-next-line
  }, [partDuplicate, resetState])

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <SheetContainer>
        <TextTitle text={managePartTitle} />
        <PartForm
          action={action}
          setAction={setAction}
          partSelected={partSelected}
          handleDeletePart={handleDeletePart}
          handleUpdatePart={handleUpdatePart}
          disabledBtn={disabledBtn}
        />
        <StyledButton
          variant="contained"
          onClick={handleDuplicate}
          style={{ marginBottom: '50px' }}
        >
          {isPartDuplicating ? (
            <CustomSpinner type="line" backColor="#ffffff" />
          ) : (
            <FormattedMessage id="global.action.duplicate" />
          )}
        </StyledButton>
      </SheetContainer>
    </Box>
  )
}

export default ManagePart
