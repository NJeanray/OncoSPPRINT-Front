import { connect } from 'react-redux'
import Documents from './Documents'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getDocumentAction } from 'app/store/actions'
import { getErrorsSelector } from 'app/services/error.selector'

const mapStateToProps = state => ({
  isDocumentFetching: isLoadingSelector(state, 'document'),
  hasDocumentErrors: getErrorsSelector(state, 'document')
})

const mapDispatchToProps = dispatch => ({
  getDocument: (name, payload) => dispatch(getDocumentAction(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Documents)
