import React from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import StyledButton from 'app/components/styledButton'
import StudyFormButtonsWrapper from './StudyFormButtons.styled'

const StudyFormButtons = ({
  studyState,
  action,
  handleCancel,
  isBtnCreateDisabled,
  isBtnSubmitDisabled,
  handleCreate,
  handleUpdate,
  handleSaveUpdate,
  handleAmend,
  handleSubmit,
  handleRefuse,
  handleSign,
  handleDelete
}) => {
  return (
    <StudyFormButtonsWrapper mt={4}>
      <Grid container>
        {action === 'create' && (
          <Grid item xs={12}>
            <StyledButton
              disabled={isBtnCreateDisabled}
              primary="true"
              variant="contained"
              bgcolor="primary"
              onClick={handleCreate}
            >
              <FormattedMessage id="global.action.create" />
            </StyledButton>
          </Grid>
        )}
        <Grid item xs={6}>
          {(studyState === 'created' || studyState === 'submitted') && action !== 'update' && (
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
          {action !== 'update' && studyState === 'signed' && (
            <StyledButton
              primary="true"
              variant="contained"
              bgcolor={'primary'}
              onClick={handleAmend}
            >
              <FormattedMessage id={'global.action.amend'} />
            </StyledButton>
          )}
          {action !== 'update' && studyState === 'created' && (
            <StyledButton
              disabled={isBtnSubmitDisabled}
              primary="true"
              variant="contained"
              bgcolor={'primary'}
              onClick={handleSubmit}
            >
              <FormattedMessage id={'global.action.submit'} />
            </StyledButton>
          )}
          {action !== 'update' && studyState === 'submitted' && (
            <StyledButton
              primary="true"
              variant="contained"
              bgcolor={'primary'}
              onClick={handleSign}
            >
              <FormattedMessage id={'global.action.sign'} />
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
        {(studyState === 'created' || studyState === 'submitted') && action !== 'update' && (
          <>
            <Grid item xs={6}>
              <StyledButton variant="contained" bgcolor="red" onClick={handleRefuse}>
                <FormattedMessage id="global.action.refuse" />
              </StyledButton>
            </Grid>
            <Grid item xs={6}>
              <StyledButton variant="contained" bgcolor="red" onClick={handleDelete}>
                <FormattedMessage id="global.action.delete" />
              </StyledButton>
            </Grid>
          </>
        )}
      </Grid>
    </StudyFormButtonsWrapper>
  )
}

export default StudyFormButtons
