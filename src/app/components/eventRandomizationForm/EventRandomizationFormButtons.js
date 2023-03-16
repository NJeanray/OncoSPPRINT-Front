import React from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import StyledButton from '../styledButton'
import EventRandomizationFormButtonsWrapper from './EventRandomizationFormButtons.styled'

const EventRandomizationFormButtons = ({ action, handleCreate, handleModify, disabled }) => {
  return (
    <EventRandomizationFormButtonsWrapper>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          {action === 'create' && (
            <StyledButton
              disabled={disabled}
              primary="true"
              variant="contained"
              bgcolor="primary"
              onClick={handleCreate}
            >
              <FormattedMessage id="global.action.create" />
            </StyledButton>
          )}
          {action === 'update' && (
            <StyledButton
              primary="true"
              variant="contained"
              bgcolor="primary"
              onClick={handleModify}
            >
              <FormattedMessage id="global.action.save" />
            </StyledButton>
          )}
        </Grid>
      </Grid>
    </EventRandomizationFormButtonsWrapper>
  )
}

export default EventRandomizationFormButtons
