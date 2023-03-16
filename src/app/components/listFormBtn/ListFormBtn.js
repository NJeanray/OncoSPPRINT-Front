import React from 'react'
import { FormattedMessage } from 'react-intl'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import StyledButton from '../styledButton'

const ListFormBtn = ({ isBtnDisabled, action, handleCreate, handleModify }) => {
  return (
    <Box mt={4}>
      <Grid container>
        {action === 'create' && (
          <StyledButton
            disabled={isBtnDisabled}
            primary="true"
            variant="contained"
            bgcolor="primary"
            onClick={handleCreate}
          >
            <FormattedMessage id="global.action.create" />
          </StyledButton>
        )}
        {action === 'update' && (
          <StyledButton disabled={isBtnDisabled} onClick={handleModify}>
            <FormattedMessage id="global.action.modify" />
          </StyledButton>
        )}
      </Grid>
    </Box>
  )
}

export default ListFormBtn
