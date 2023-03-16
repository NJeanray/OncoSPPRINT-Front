import { connect } from 'react-redux'

import actions from '../../actions'
import CreateModifyClient from './CreateModifyClient'

export default connect(
  state => ({
    clientsBrains: state.clientsBrains,
    clients: state.clients
  }),
  actions
)(CreateModifyClient)
