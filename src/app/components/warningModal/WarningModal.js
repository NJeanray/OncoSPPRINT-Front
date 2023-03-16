import React from 'react'
import { FormattedMessage } from 'react-intl'
import Grid from '@material-ui/core/Grid'

import StyledModal from 'app/components/styledModal/StyledModal'
import TextTitle from 'app/components/textTitle/TextTitle'
import Alert from 'app/components/alert/Alert'
import StyledGrid from 'app/components/styledGrid'
import StyledButton from 'app/components/styledButton'

const WarningModal = ({
  open,
  onClose,
  onCancel,
  onSubmit,
  warningTitle = '',
  warningText = ''
}) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <TextTitle text={<FormattedMessage id={warningTitle} />} />
      <Alert severity="warning">
        <FormattedMessage id={warningText} />
      </Alert>
      <StyledGrid container style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <StyledButton variant="outlined" onClick={onCancel}>
            <FormattedMessage id="global.action.cancel" />
          </StyledButton>
        </Grid>
        <Grid item xs={6}>
          <StyledButton primary="true" variant="contained" bgcolor="primary" onClick={onSubmit}>
            <FormattedMessage id="global.action.delete" />
          </StyledButton>
        </Grid>
      </StyledGrid>
    </StyledModal>
  )
}

export default WarningModal
