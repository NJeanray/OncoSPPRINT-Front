import React, { Fragment } from 'react'

import { MenuItem, Select } from '@material-ui/core'

const BrickCustomFrequency = ({ schedule, updateSchedule }) => {
  function frequencyValue() {
    return schedule.period === 'TW' || schedule.period === 'BID' ? '' : schedule.frequency
  }

  function disabledFrequency() {
    return schedule.period === 'TW' || schedule.period === 'BID'
  }

  if (!schedule) return
  return (
    <div style={{ display: 'flex' }}>
      {schedule.duration2 && schedule.duration2 !== 0 && (
        <div style={{ marginRight: '20px', fontWeight: 'bold', marginTop: 'auto' }}>(</div>
      )}
      <input
        disabled={disabledFrequency}
        style={{
          maxWidth: '30px',
          fontSize: '17px',
          paddingBottom: '3px',
          border: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
          marginRight: '15px'
        }}
        value={frequencyValue()}
        type="number"
        onChange={e =>
          updateSchedule({
            ...schedule,
            frequency: Number(e.target.value)
          })
        }
        min={1}
      />

      <div style={{ marginRight: '15px' }}>
        <Select
          value={schedule.period}
          onChange={e => {
            if (e.target.value === 'TW' || e.target.value === 'BID') {
              updateSchedule({
                ...schedule,
                frequency: null,
                interval: null,
                duration2: null,
                period: e.target.value
              })
            } else {
              updateSchedule({
                ...schedule,
                duration2: e.target.value === 'W' ? null : schedule.duration2,
                interval:
                  e.target.value === 'W'
                    ? null
                    : e.target.value === 'Q' && !schedule.interval
                    ? 1
                    : schedule.interval,
                period: e.target.value
              })
            }
          }}
          style={{ maxWidth: '60px' }}
        >
          <MenuItem value={'Q'}>Q</MenuItem>
          <MenuItem value={'W'}>W</MenuItem>
          <MenuItem value={'BID'}>BID</MenuItem>
          <MenuItem value={'TW'}>TW</MenuItem>
        </Select>
      </div>
      {schedule.period === 'Q' && (
        <Fragment>
          <input
            style={{
              maxWidth: '30px',
              fontSize: '17px',
              paddingBottom: '3px',
              border: 'none',
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
              marginRight: '15px'
            }}
            value={schedule.interval}
            type="number"
            onChange={e =>
              updateSchedule({
                ...schedule,
                interval: Number(e.target.value)
              })
            }
            min={1}
          />
          <div style={{ marginRight: '15px' }}>
            <Select value={'D'} style={{ maxWidth: '60px' }}>
              <MenuItem value={'D'}>D</MenuItem>
            </Select>
          </div>
          <div style={{ marginRight: '20px', fontWeight: 'bold', marginTop: 'auto' }}>x</div>
        </Fragment>
      )}
      <input
        style={{
          maxWidth: '30px',
          fontSize: '17px',
          paddingBottom: '3px',
          border: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
          marginRight: '15px'
        }}
        value={schedule.duration}
        type="number"
        onChange={e =>
          updateSchedule({
            ...schedule,
            duration: Number(e.target.value)
          })
        }
        min={1}
      />
      {schedule.duration2 && schedule.duration2 !== 0 && (
        <Fragment>
          <div style={{ marginRight: '20px', fontWeight: 'bold', marginTop: 'auto' }}>)</div>
          <div style={{ marginRight: '20px', fontWeight: 'bold', marginTop: 'auto' }}>x</div>
        </Fragment>
      )}
      {schedule.period === 'Q' && schedule.duration <= 7 && (
        <input
          style={{
            maxWidth: '30px',
            fontSize: '17px',
            paddingBottom: '3px',
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            marginRight: '30px'
          }}
          value={schedule.duration2 && schedule.duration2 !== 0 ? schedule.duration2 : 'OK'}
          type="number"
          onChange={e => {
            if (Number(e.target.value) === 0)
              updateSchedule({
                ...schedule,
                duration2: null
              })
            else
              updateSchedule({
                ...schedule,
                duration2: Number(e.target.value)
              })
          }}
          min={0}
        />
      )}
    </div>
  )
}

export default BrickCustomFrequency
