import { connect } from 'react-redux'

import { createActionCreator, resetStateCreated } from 'app/store/actions'
import { createdSelector } from 'app/services/created.selector'
import CreatePart from './CreatePart'

const mapStateToProps = state => {
  return {
    singlePartCreated: createdSelector(state, 'projects')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postEntities: (name, payload) => dispatch(createActionCreator(name, payload)),
    resetStateCreated: name => dispatch(resetStateCreated(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePart)
