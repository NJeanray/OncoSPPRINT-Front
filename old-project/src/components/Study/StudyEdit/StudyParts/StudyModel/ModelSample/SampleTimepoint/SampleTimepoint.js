import React from 'react'
import { InputLabel } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import SampleTimepointDetails from './SampleTimepointDetails'

function SampleTimepoint({
  sampleArray,
  disabled,
  bricks,
  studyModel,
  allGroups,
  index,
  updateSampleArray,
  deleteTimepoint,
  updateGroupIdError,
  setSnackbarOpen,
  studySiteId,
  getBrickParams,
  brickParams
}) {
  const [numberDaysAfterD0, setNumberDaysSchedule] = React.useState(0)
  const [type, setTimepointType] = React.useState('bf')

  return (
    <div style={{ width: '100%' }}>
      {!sampleArray[index].created && (
        <div>
          <div style={{ margin: '10px 0', display: 'flex', flexDirection: 'column' }}>
            <InputLabel htmlFor="brick-select-label" style={{ margin: '10px 0' }}>
              Schedule
            </InputLabel>
            <div>
              <input
                disabled={disabled}
                style={{
                  maxWidth: '60px',
                  fontSize: '17px',
                  paddingBottom: '3px',
                  border: 'none',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                  marginRight: '15px'
                }}
                type="number"
                onChange={e => {
                  const days_before_d0 =
                    type === 'bf' ? Number(e.target.value) * -1 : Number(e.target.value)

                  setNumberDaysSchedule(days_before_d0)
                }}
                min={0}
                value={numberDaysAfterD0 < 0 ? numberDaysAfterD0 * -1 : numberDaysAfterD0}
              />
              <span style={{ margin: '0 20px' }}>DAYS</span>
              <Select
                disabled={disabled}
                value={type}
                onChange={e => {
                  if (e.target.value === 'af') setNumberDaysSchedule(numberDaysAfterD0 * -1)
                  setTimepointType(e.target.value)
                }}
              >
                <MenuItem value={'bf'}>Before</MenuItem>
                <MenuItem value={'af'}>After</MenuItem>
              </Select>
              <span style={{ margin: '0 10px' }}>D0</span>
            </div>
          </div>
          {!sampleArray[index].created && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                style={{ marginRight: '10px', padding: '5px 20px' }}
                color="primary"
                onClick={() => {
                  deleteTimepoint(index)
                }}
              >
                <FormattedMessage id={'CANCEL'} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateSampleArray(
                    sampleArray.map((item, indexImagingArray) =>
                      index === indexImagingArray
                        ? {
                            ...sampleArray[index],
                            days_after_d0: numberDaysAfterD0,
                            type: type,
                            created: true
                          }
                        : item
                    )
                  )
                }}
              >
                <FormattedMessage id={'CONFIRM'} />
              </Button>
            </div>
          )}
        </div>
      )}
      {sampleArray[index].created && (
        <SampleTimepointDetails
          brickParams={brickParams}
          studySiteId={studySiteId}
          getBrickParams={getBrickParams}
          bricks={bricks}
          sampleArray={sampleArray}
          index={index}
          disabled={disabled}
          studyModel={studyModel}
          allGroups={allGroups}
          updateSampleArray={updateSampleArray}
          deleteTimepoint={deleteTimepoint}
          setSnackbarOpen={setSnackbarOpen}
          updateGroupIdError={updateGroupIdError}
        />
      )}
    </div>
  )
}

export default SampleTimepoint
