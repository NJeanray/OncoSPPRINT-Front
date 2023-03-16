import React from 'react'
import { FormattedMessage } from 'react-intl'

import Paper from '@material-ui/core/Paper/index'

const StudyCosting = props => (
  <Paper classes={{ root: 'paper-root' }}>
    <h2>
      <FormattedMessage id="Costing" />
    </h2>
  </Paper>
)

export default StudyCosting
