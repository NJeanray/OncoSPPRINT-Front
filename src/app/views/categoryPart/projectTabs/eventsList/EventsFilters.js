import React from 'react'
import { FormattedMessage } from 'react-intl'
import { sortBy } from 'lodash'
import Grid from '@material-ui/core/Grid'

import Select from 'app/components/select'
import eventTypes from 'app/utils/eventsTypes'
import TextField from 'app/components/textField'
import StyledButton from 'app/components/styledButton'

const filterTypes = [
  {
    value: 'group',
    label: 'Groupe'
  },
  {
    value: 'day',
    label: 'Jour'
  },
  {
    value: 'type',
    label: 'Type'
  }
]

const EventsFilters = ({
  typeSelected,
  filterType,
  setFilterType,
  daySelected,
  setDaySelected,
  setTypeSelected,
  handleFilter,
  handleResetFilters,
  setGroupSelected,
  groupSelected,
  groupsOptions
}) => {
  const isFilterBtnDisplayed = () => {
    if (filterType && filterType === 'day') return true
    return filterType && (typeSelected || daySelected || groupSelected)
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <Select
          label="eventsList.filter.type"
          value={filterType}
          onChange={e => {
            setFilterType(e.target.value)
          }}
          options={sortBy(filterTypes, [item => item.value])}
        />
      </Grid>
      <Grid item xs={2} style={{ margin: '0 30px' }}>
        {filterType === 'type' && (
          <Select
            label="eventsList.filter.eventType"
            value={typeSelected}
            onChange={e => {
              setTypeSelected(e.target.value)
            }}
            options={sortBy(
              eventTypes({
                withTransfer: true,
                withFacs: true,
                withDosageElisa: true,
                withIhc: true
              }),
              [item => item.value]
            )}
          />
        )}
        {filterType === 'day' && (
          <TextField
            width="100%"
            label={<FormattedMessage id="eventsList.group.day" />}
            type="number"
            value={daySelected}
            onChange={e => setDaySelected(e.target.value)}
          />
        )}
        {filterType === 'group' && (
          <Select
            label="eventsList.filter.group"
            value={groupSelected}
            onChange={e => {
              setGroupSelected(e.target.value)
            }}
            options={groupsOptions}
          />
        )}
      </Grid>
      {isFilterBtnDisplayed() && (
        <Grid item xs={2}>
          <StyledButton onClick={handleFilter}>
            <FormattedMessage id="global.action.filter" />
          </StyledButton>
        </Grid>
      )}
      {isFilterBtnDisplayed() && (
        <Grid item xs={2} style={{ marginLeft: '30px' }}>
          <StyledButton variant="outlined" onClick={handleResetFilters}>
            <FormattedMessage id="global.action.cancel" />
          </StyledButton>
        </Grid>
      )}
    </Grid>
  )
}

export default EventsFilters
