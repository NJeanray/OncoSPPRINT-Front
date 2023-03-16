import { connect } from 'react-redux'

import { createActionCreator } from 'app/store/actions'
import CreateCustomTask from './CreateCustomTask'

const mapDispatchToProps = dispatch => {
  return {
    postEntities: (name, payload) => dispatch(createActionCreator(name, payload))
  }
}

export default connect(null, mapDispatchToProps)(CreateCustomTask)
