import { connect } from 'react-redux'

import actions from '../../actions'
import CreateModifyContact from './CreateModifyContact'

export default connect(
  state => ({
    contactsBrains: state.contactsBrains,
    contacts: state.contacts
  }),
  actions
)(CreateModifyContact)
