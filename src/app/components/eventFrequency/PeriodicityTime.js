import React from 'react'
import { getFrequencyDataValue } from 'app/components/eventFrequency/EventFrequency.utils'
import StyledGrid from 'app/components/styledGrid'
import { Grid } from '@material-ui/core'
import TextSubtitle from 'app/components/textSubtitle/TextSubtitle'
import { FormattedMessage } from 'react-intl'
import Timepoint from 'app/components/timepoint'
import TextField from 'app/components/textField'

const PeriodicityTime = ({
  disabled,
  eventInitData,
  setEventInitData,
  fixDateSwitchValue,
  isEndPeriodicityDisplayed
}) => {
  const iterationValue = getFrequencyDataValue(eventInitData, 'iteration')

  return (
    <StyledGrid container width="50%" alignItems="flex-end">
      <Grid item xs={6}>
        <TextSubtitle text={<FormattedMessage id="eventFrequency.start" />} />
        <Timepoint
          disabled={disabled}
          dayValue={Math.abs(eventInitData.getIn(['periodicity', 'start']))}
          onChangeDay={value =>
            setEventInitData(
              eventInitData.setIn(
                ['periodicity', 'start'],
                value * (eventInitData.get('day') < 0 ? -1 : 1)
              )
            )
          }
          switchValue={fixDateSwitchValue(eventInitData.getIn(['periodicity', 'start']))}
          onChangeSwitch={() =>
            setEventInitData(
              eventInitData.updateIn(['periodicity', 'start'], prevDay => prevDay * -1)
            )
          }
        />
      </Grid>
      <Grid item xs={6}>
        {isEndPeriodicityDisplayed ? (
          <div style={{ paddingLeft: '20px' }}>
            <TextSubtitle text={<FormattedMessage id="eventFrequency.end" />} />
            <Timepoint
              disabled={disabled}
              dayValue={Math.abs(eventInitData.getIn(['periodicity', 'end']))}
              onChangeDay={value =>
                setEventInitData(
                  eventInitData.setIn(
                    ['periodicity', 'end'],
                    value * (eventInitData.get('day') < 0 ? -1 : 1)
                  )
                )
              }
              switchValue={fixDateSwitchValue(eventInitData.getIn(['periodicity', 'end']))}
              onChangeSwitch={() =>
                setEventInitData(
                  eventInitData.updateIn(['periodicity', 'end'], prevDay => prevDay * -1)
                )
              }
            />
          </div>
        ) : (
          <TextField
            disabled={disabled}
            width="100%"
            required
            type="number"
            label={<FormattedMessage id="eventFrequency.iteration" />}
            value={iterationValue}
            onChange={e =>
              setEventInitData(
                eventInitData.setIn(['periodicity', 'iteration'], Number(e.target.value))
              )
            }
            inputProps={{
              onInput: e => {
                e.target.value = Number(e.target.value)
              },
              min: 0
            }}
          />
        )}
      </Grid>
    </StyledGrid>
  )
}

export default PeriodicityTime
