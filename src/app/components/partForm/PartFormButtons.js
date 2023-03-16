import React from 'react'
import PartFormButtonsWrapper from './PartFormButtons.styled'
import Grid from '@material-ui/core/Grid'
import StyledButton from '../styledButton'
import { FormattedMessage } from 'react-intl'
const PartFormButtons = ({
  action,
  handleCreate,
  handleUpdate,
  handleCancel,
  handleDelete,
  handleSaveUpdate,
  isBtnDisabled
}) => {
  return (
    <PartFormButtonsWrapper>
      <Grid container>
        <Grid item xs={6}>
          {action === 'view' && (
            <StyledButton variant="outlined" onClick={handleUpdate}>
              <FormattedMessage id="global.action.modify" />
            </StyledButton>
          )}
          {action === 'update' && (
            <StyledButton variant="outlined" onClick={handleCancel}>
              <FormattedMessage id="global.action.cancel" />
            </StyledButton>
          )}
        </Grid>
        <Grid item xs={6}>
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
            <StyledButton
              disabled={isBtnDisabled}
              primary="true"
              variant="contained"
              color="primary"
              onClick={handleSaveUpdate}
            >
              <FormattedMessage id="global.action.save" />
            </StyledButton>
          )}
          {action === 'view' && (
            <StyledButton variant="contained" bgcolor="red" onClick={handleDelete}>
              <FormattedMessage id="global.action.delete" />
            </StyledButton>
          )}
        </Grid>
      </Grid>
    </PartFormButtonsWrapper>
  )
}

export default PartFormButtons
