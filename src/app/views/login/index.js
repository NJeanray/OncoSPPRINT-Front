import { connect } from 'react-redux'

import { getStateFieldData } from 'app/services/field.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import { createActionCreator, resetStateErrors } from 'app/store/actions'
import Login from './Login'

const mapStateToProps = state => {
  return {
    login: getStateFieldData(state, 'login'),
    loginErrors: getErrorsSelector(state, 'login'),
    refreshErrors: getErrorsSelector(state, 'refresh')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postEntities: (name, payload) => dispatch(createActionCreator(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
