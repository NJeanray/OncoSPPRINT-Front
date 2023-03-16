import React from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import StyledButton from '../styledButton'

const EventFormButtons = ({ step, handleCreate, handleNextStep }) => {
  return (
    <Grid container>
      <Grid item xs={6} />
      <Grid item xs={6}>
        {
          <StyledButton
            primary="true"
            variant="contained"
            bgcolor="primary"
            onClick={step === 1 ? handleNextStep : handleCreate}
          >
            <FormattedMessage id={step === 1 ? 'global.action.nextStep' : 'global.action.create'} />
          </StyledButton>
        }
      </Grid>
    </Grid>
  )
}

export default EventFormButtons
