import { connect } from 'react-redux'

import actions from '../../actions'
import { consoleLog } from '../../lib/utils'
import handleErrors from '../higherOrderComponents/handleErrors'
import Login from './Login'

const mapStateToProps = state => {
  return {
    jwtToken: state.app.accessToken,
    errors: state.app.errors
  }
}

export default connect(mapStateToProps, actions)(handleErrors(Login, consoleLog))
