import { connect } from 'react-redux'

import actions from 'actions'
import ContactAutocomplete from './ContactAutocomplete'

export default connect(
  state => ({
    contacts: state.contacts
  }),
  actions
)(ContactAutocomplete)
