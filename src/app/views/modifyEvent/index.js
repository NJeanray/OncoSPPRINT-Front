import { connect } from 'react-redux'

import { updateActionCreator, resetStateErrors } from 'app/store/actions'
import ModifyEvent from './ModifyEvent'

const mapDispatchToProps = dispatch => {
  return {
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(null, mapDispatchToProps)(ModifyEvent)
