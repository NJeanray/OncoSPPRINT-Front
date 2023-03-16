import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

import Timepoint from 'app/components/timepoint'
import StyledButton from 'app/components/styledButton'
import TextSubhead from 'app/components/textSubhead'
import Alert from 'app/components/alert'

const IrregularTimepoints = ({
  category,
  disabled,
  fixDateSwitchValue,
  setEventInitData,
  eventInitData
}) => {
  const [isWarningDisplayed, setIsWarningDisplayed] = useState(false)
  const [day, setDay] = useState(0)
  const handleAddTimepoint = () => {
    if (!eventInitData.getIn(['periodicity', 'days']).includes(day)) {
      setEventInitData(
        eventInitData.updateIn(['periodicity', 'days'], days =>
          category === 'randomisation' ? [day] : [...days, day]
        )
      )
      setDay(0)
      setIsWarningDisplayed(false)
    } else setIsWarningDisplayed(true)
  }

  const handleDelete = chipToDeleteIndex => {
    const periodicityDaysCopy = [...eventInitData.getIn(['periodicity', 'days'])]

    periodicityDaysCopy.splice(chipToDeleteIndex, 1)
    setEventInitData(eventInitData.updateIn(['periodicity', 'days'], () => periodicityDaysCopy))
  }

  const sortNumber = numArray => numArray.sort((a, b) => a - b)

  return (
    <Grid
      container
      style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
    >
      <TextSubhead text={<FormattedMessage id="eventFrequency.irregularTimepoints.set" />} />
      <Grid xs={6}>
        <Timepoint
          disabled={disabled}
          dayValue={Math.abs(day)}
          onChangeDay={value => setDay(value)}
          switchValue={fixDateSwitchValue(day)}
          onChangeSwitch={() => setDay(day * -1)}
        />
      </Grid>
      <Grid xs={3}>
        <StyledButton disabled={disabled} onClick={() => handleAddTimepoint()} variant="outlined">
          <FormattedMessage id="global.action.add" />
        </StyledButton>
      </Grid>
      <Grid item xs={12}>
        {isWarningDisplayed && (
          <Alert severity="warning" onClose={() => setIsWarningDisplayed(false)}>
            <FormattedMessage id="eventFrequency.alert.daySelectedAlreadySet" />
          </Alert>
        )}
      </Grid>
      {!isEmpty(eventInitData.getIn(['periodicity', 'days'])) && (
        <Grid xs={12} style={{ marginTop: '20px' }}>
          <TextSubhead
            text={<FormattedMessage id="eventFrequency.irregularTimepoints.selected" />}
          />
          <Paper style={{ padding: '15px' }}>
            {sortNumber(eventInitData.getIn(['periodicity', 'days'])).map(
              (periodicityDay, index) => {
                return (
                  <Chip
                    disabled={disabled}
                    style={{ marginLeft: '5px' }}
                    key={index}
                    label={`D${periodicityDay}`}
                    onDelete={() => handleDelete(index)}
                  />
                )
              }
            )}
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}

export default IrregularTimepoints
