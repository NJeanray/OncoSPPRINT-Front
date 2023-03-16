import { connect } from 'react-redux'

import { updateActionCreator } from 'app/store/actions'
import ModifyCustomConsumable from './ModifyCustomConsumable'

const mapDispatchToProps = dispatch => {
  return {
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload))
  }
}

export default connect(null, mapDispatchToProps)(ModifyCustomConsumable)
