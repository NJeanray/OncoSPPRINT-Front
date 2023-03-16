import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import ListFormBtn from 'app/components/listFormBtn'
import displayFormErrors from 'app/utils/displayFormErrors.js'
import { mspLaboratoriesEndpoint } from 'app/api/endpoints'
import TextField from '../textField'
import Select from '../select/Select'
import CustomTaskFormWrapper from './CustomTaskForm.styled'
import getErrorFieldName from './CustomTaskForm.utils'
import CustomSpinner from 'app/components/customSpinner'

const CustomTaskForm = ({
  hasCustomTasksErrors,
  handleModifyCustomTask,
  fetchEntities,
  isCustomTasksFetching,
  customTaskSelected,
  handleCreateCustomTask,
  action,
  mspLaboratories,
  mspLaboratoriesName,
  isMspLaboratoriesFetching
}) => {
  const [task, setTask] = useState(null)
  const [hours, setHours] = useState(null)
  const [mspLaboratoryId, setMspLaboratoryId] = useState(null)
  const isBtnDisabled = () => !mspLaboratoryId || !task || !hours

  useEffect(() => {
    if (customTaskSelected) {
      setTask(customTaskSelected.get('task'))
      setHours(customTaskSelected.get('hours'))
      setMspLaboratoryId(customTaskSelected.get('labo_msp_id'))
    }
  }, [customTaskSelected])

  const customTaskParamsToSend = () => ({
    task,
    hours,
    labo_msp_id: mspLaboratoryId
  })

  useEffect(() => {
    if (!mspLaboratories && !isMspLaboratoriesFetching)
      fetchEntities('mspLaboratories', {
        endpoint: mspLaboratoriesEndpoint()
      })
  }, [isMspLaboratoriesFetching, fetchEntities, mspLaboratories])

  if (isCustomTasksFetching) return <CustomSpinner type="circle" />

  return (
    <CustomTaskFormWrapper>
      {hasCustomTasksErrors && displayFormErrors(hasCustomTasksErrors, getErrorFieldName)}
      <Select
        label="customTask.mspLaboratory"
        value={mspLaboratoryId}
        onChange={e => setMspLaboratoryId(e.target.value)}
        options={mspLaboratoriesName}
        isLoading={isMspLaboratoriesFetching}
      />
      <TextField
        type="number"
        value={hours}
        width="100%"
        label={<FormattedMessage id="customTask.hours" />}
        margin="normal"
        onChange={e => setHours(e.target.value)}
        inputProps={{
          onInput: e => {
            e.target.value = Number(e.target.value)
          },
          min: 0
        }}
      />
      <TextField
        value={task}
        width="100%"
        label={<FormattedMessage id="customTask.task" />}
        margin="normal"
        onChange={e => setTask(e.target.value)}
        multiline
        rowsMax="6"
      />
      <ListFormBtn
        handleModify={() => handleModifyCustomTask(customTaskParamsToSend())}
        handleCreate={() => handleCreateCustomTask(customTaskParamsToSend())}
        isBtnDisabled={isBtnDisabled()}
        action={action}
      />
    </CustomTaskFormWrapper>
  )
}

export default CustomTaskForm
