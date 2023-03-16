import { connect } from 'react-redux'

import actions from 'actions'
import ClientAutocomplete from './ClientAutocomplete'

export default connect(
  state => ({
    clients: state.clients
  }),
  actions
)(ClientAutocomplete)
