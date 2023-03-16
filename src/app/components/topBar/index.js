import { connect } from 'react-redux'

import { setResetStore } from 'app/store/actions'
import TopBar from './TopBar'

const mapDispatchToProps = dispatch => ({
  setResetStore: () => dispatch(setResetStore())
})

export default connect(null, mapDispatchToProps)(TopBar)
