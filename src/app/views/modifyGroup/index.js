import { connect } from 'react-redux'

import { updateActionCreator } from 'app/store/actions'
import ModifyGroup from './ModifyGroup'

const mapDispatchToProps = dispatch => {
  return {
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload))
  }
}

export default connect(null, mapDispatchToProps)(ModifyGroup)
