import { connect } from 'react-redux'
import actions from '../../../actions'
import StudyCosting from './StudyCosting'

export default connect(state => state.study, actions)(StudyCosting)
