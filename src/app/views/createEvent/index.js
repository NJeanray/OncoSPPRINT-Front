import { connect } from 'react-redux'

import { createActionCreator, resetState, resetStateErrors } from 'app/store/actions'
import CreateEvent from './CreateEvent'
import { createdSelector } from 'app/services/created.selector'

const mapStateToProps = state => ({
  singleEventTransferNext: state.data.getIn(['singleEvent', 'transfertNext']),
  eventCreated: createdSelector(state, 'singleEvent')
})

const mapDispatchToProps = dispatch => {
  return {
    postEntities: (name, payload) => dispatch(createActionCreator(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name)),
    resetState: name => dispatch(resetState(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
