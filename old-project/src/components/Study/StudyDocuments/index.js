import { connect } from 'react-redux'
import actions from '../../../actions'
import StudyDocuments from './StudyDocuments'

const mapStateToProps = state => {
  return {
    state: state.study,
    documents: state.documents
  }
}

export default connect(mapStateToProps, actions)(StudyDocuments)
