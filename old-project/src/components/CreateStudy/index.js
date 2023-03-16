import { connect } from 'react-redux'

import actions from '../../actions'
import CreateStudy from './CreateStudy'

export default connect(
  state => ({
    studies: state.studies,
    clients: state.clients
  }),
  actions
)(CreateStudy)
