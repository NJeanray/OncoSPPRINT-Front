import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from '../textField'
import StyledButton from '../styledButton'
import CustomSpinner from 'app/components/customSpinner'
import displayFormErrors from 'app/utils/displayFormErrors.js'
import getErrorFieldName from './GroupForm.utils'

const GroupForm = ({
  action,
  hasGroupsErrors,
  handleCreateGroup,
  isGroupsFetching,
  handleModifyGroup,
  groupSelected
}) => {
  const [groupName, setGroupName] = useState('G0')
  // const [groupParentName, setGroupParentName] = useState(null)
  const [nbAnimals, setNbAnimals] = useState(null)

  const handleCreate = () => {
    handleCreateGroup({
      nb_animals: nbAnimals
    })
  }

  const handleModify = () => {
    if (nbAnimals !== groupSelected.get('nb_animals'))
      handleModifyGroup({
        nb_animals: nbAnimals
      })
  }

  useEffect(() => {
    if (groupSelected) {
      setGroupName(groupSelected.get('name'))
      setNbAnimals(groupSelected.get('nb_animals'))
      // setGroupName(groupSelected.get(''))
    }
  }, [groupSelected])

  if (isGroupsFetching) return <CustomSpinner type="circle" />
  return (
    <div>
      {hasGroupsErrors && displayFormErrors(hasGroupsErrors, getErrorFieldName)}
      {/*{action === 'update' && groupName !== 'G0' && (*/}
      {/*  <TextField*/}
      {/*    disabled={true}*/}
      {/*    value={groupParentName}*/}
      {/*    width="100%"*/}
      {/*    label={<FormattedMessage id="group.parentName" />}*/}
      {/*    margin="normal"*/}
      {/*  />*/}
      {/*)}*/}
      {action === 'update' && (
        <TextField
          disabled={true}
          value={groupName}
          width="100%"
          label={<FormattedMessage id="group.name" />}
          margin="normal"
        />
      )}
      <TextField
        type="number"
        value={nbAnimals}
        width="100%"
        label={<FormattedMessage id="group.nbAnimals" />}
        margin="normal"
        onChange={e => setNbAnimals(e.target.value)}
        inputProps={{
          onInput: e => {
            e.target.value = Number(e.target.value)
          },
          min: 0
        }}
      />
      <StyledButton
        style={{ marginTop: '30px' }}
        disabled={!nbAnimals}
        onClick={action === 'create' ? handleCreate : handleModify}
      >
        <FormattedMessage
          id={action === 'create' ? 'global.action.create' : 'global.action.modify'}
        />
      </StyledButton>
    </div>
  )
}

export default GroupForm
