import React from 'react'
import { FormattedMessage } from 'react-intl'

import Switch from 'app/components/switch'
import TextField from 'app/components/textField'

const Timepoint = ({
  disabled = false,
  dayValue,
  onChangeDay,
  onChangeSwitch,
  switchValue,
  displayD0 = true
}) => {
  return (
    <div className="event-form__timepoint-wrapper">
      <TextField
        disabled={disabled}
        required
        type="number"
        width="57px"
        label={<FormattedMessage id="eventForm.days" />}
        value={dayValue}
        onChange={e => onChangeDay(Number(e.target.value))}
        inputProps={{
          onInput: e => {
            e.target.value = Number(e.target.value)
          },
          min: 0
        }}
      />
      <Switch
        disabled={disabled}
        value={switchValue}
        setValue={() => onChangeSwitch()}
        labelLeft="eventForm.before"
        labelRight="eventForm.after"
      />
      {displayD0 && <span className="event-form__timepoint-d0">D0</span>}
    </div>
  )
}

export default Timepoint
