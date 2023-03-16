import { connect } from 'react-redux'

import handleErrors from '../higherOrderComponents/handleErrors'
import actions from '../../actions'
import { consoleLog } from '../../lib/utils'
import App from './App'

export default connect(
  state => ({ jwtToken: state.app.accessToken }),
  actions
)(handleErrors(App, consoleLog))
