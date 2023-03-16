// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import StyledButton from '../styledButton'

type Props = {
  action: string,
  handleCreate: () => void,
  handleUpdate: () => void,
  handleRefuse: () => void,
  handleCancel: () => void,
  handleSaveUpdate: () => void,
  projectState: string
}

const ProjectFormButtons = ({
  action,
  handleCreate,
  handleUpdate,
  handleRefuse,
  handleCancel,
  handleSaveUpdate,
  projectState
}: Props) => {
  return (
    <Box mt={4}>
      <Grid container>
        <Grid item xs={6}>
          {action === 'view' && (projectState === 'created' || projectState === 'submitted') && (
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
          {action !== 'update' && projectState === 'created' && (
            <StyledButton primary="true" variant="contained" bgcolor="red" onClick={handleRefuse}>
              <FormattedMessage id="global.action.refuse" />
            </StyledButton>
          )}
          {action === 'create' && (
            <StyledButton
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
              onClick={handleSaveUpdate}
            >
              <FormattedMessage id="global.action.save" />
            </StyledButton>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProjectFormButtons
