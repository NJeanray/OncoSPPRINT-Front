import { connect } from 'react-redux'

import { createActionCreator } from 'app/store/actions'
import CreateProject from './CreateProject'

const mapDispatchToProps = dispatch => ({
  postEntities: (name, payload) => dispatch(createActionCreator(name, payload))
})

export default connect(null, mapDispatchToProps)(CreateProject)
