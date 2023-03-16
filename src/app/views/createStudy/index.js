import { connect } from 'react-redux'
import { createActionCreator } from 'app/store/actions'
import CreateStudy from './CreateStudy'

const mapDispatchToProps = dispatch => ({
  postEntities: (name, payload) => dispatch(createActionCreator(name, payload))
})

export default connect(null, mapDispatchToProps)(CreateStudy)
