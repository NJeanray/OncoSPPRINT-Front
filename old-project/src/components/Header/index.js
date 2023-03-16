import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import actions from '../../actions'
import Header from './Header'

export default connect(state => {
  return { jwtToken: state.app.accessToken }
}, actions)(injectIntl(Header))
