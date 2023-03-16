import React, { useContext, useState } from 'react'
import { fromJS } from 'immutable'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import Grid from '@material-ui/core/Grid'

import Select from 'app/components/select'
import EventFrequency from 'app/components/eventFrequency'
import { PartContext } from 'app/contexts/PartProvider'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import {
  initializeGroupsOptions,
  isFrequencyDisplay,
  isGroupDisplay
} from './EventInitialize.utils'

const EventInitialize = ({ disabledBtn, action, category }) => {
  const { groups, groupsName } = useContext(PartContext)
  const { eventInitData, setEventInitData, isFrequencyDisplayed } = useContext(EventFormContext)
  const [groupsOptions, setGroupsOptions] = useState(initializeGroupsOptions(groupsName, groups))

  const getGroupNbRemainingAnimals = groupId =>
    groups.getIn([groupId.toString(), 'nb_remaining_animals'])

  const setNbAnimalsDefaultFromGroupsSelected = groupsToSetIds => {
    let isNbAnimalsEquals = true
    const refNbAnimals = !isEmpty(groupsToSetIds)
      ? getGroupNbRemainingAnimals(groupsToSetIds[0])
      : 0

    groupsToSetIds.forEach(groupId => {
      if (getGroupNbRemainingAnimals(groupId) !== refNbAnimals) isNbAnimalsEquals = false
    })
    setEventInitData(
      eventInitData
        .set('nbAnimalsDefault', isNbAnimalsEquals ? refNbAnimals : 0)
        .set('groupsSelected', fromJS(groupsToSetIds))
    )
  }

  const updatedGroupsOptions = selectedGroups => {
    if (selectedGroups.length === groupsName.length)
      setGroupsOptions(groupsOptions.filter(group => group.value !== 0 && group.value !== -1))
    else if (selectedGroups.length === groupsName.length - 1 && !selectedGroups.includes(-1))
      setGroupsOptions(groupsOptions.filter(group => group.value !== -1))
    else setGroupsOptions(initializeGroupsOptions(groupsName, groups))
  }

  const onSelectGroups = selectedGroups => {
    let groupsToSet = selectedGroups

    if (selectedGroups.includes(0)) groupsToSet = groupsName.map(group => group.value)
    else if (selectedGroups.includes(-1))
      groupsToSet = groupsName.filter(item => item.label !== 'G0').map(group => group.value)
    setNbAnimalsDefaultFromGroupsSelected(groupsToSet)
    updatedGroupsOptions(groupsToSet)
  }

  return (
    <Grid container style={{ marginTop: '10px' }}>
      {(isGroupDisplay(category) || isFrequencyDisplay(category)) && (
        <div className="event-form__step">
          <FormattedMessage id="eventForm.step" /> 1
        </div>
      )}
      <Grid item xs={6}>
        {isGroupDisplay(category) && (
          <Select
            disabled={action !== 'create' || disabledBtn}
            value={eventInitData.get('groupsSelected').toJS()}
            onChange={e => onSelectGroups(e.target.value)}
            label="eventForm.groupsToApply"
            options={groupsOptions}
            multiple
          />
        )}
      </Grid>
      {isFrequencyDisplay(category) && isFrequencyDisplayed && (
        <EventFrequency disabledBtn={disabledBtn} />
      )}
    </Grid>
  )
}

export default EventInitialize
