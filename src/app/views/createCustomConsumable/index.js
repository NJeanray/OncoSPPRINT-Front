import { connect } from 'react-redux'

import { createActionCreator } from 'app/store/actions'
import CreateCustomConsumable from './CreateCustomConsumable'

const mapDispatchToProps = dispatch => {
  return {
    postEntities: (name, payload) => dispatch(createActionCreator(name, payload))
  }
}

export default connect(null, mapDispatchToProps)(CreateCustomConsumable)
