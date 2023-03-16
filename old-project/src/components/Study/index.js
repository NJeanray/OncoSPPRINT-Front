import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import Study from './Study'
import actions from 'actions'

export default connect(state => state.study, actions)(injectIntl(Study))
