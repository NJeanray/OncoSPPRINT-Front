import { connect } from 'react-redux'
import { updatedSelector } from 'app/services/updated.selector'
import {
  deleteActionCreator,
  updateActionCreator,
  resetStateUpdated,
  getActionCreator,
  resetStateErrors,
  resetState
} from 'app/store/actions'
import ManagePart from './ManagePart'
import { getStateFieldData } from 'app/services/field.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import { isLoadingSelector } from 'app/services/loading.selector'

const mapStateToProps = state => ({
  partUpdated: updatedSelector(state, 'parts'),
  partDuplicate: getStateFieldData(state, 'partDuplicate'),
  isPartDuplicating: isLoadingSelector(state, 'partDuplicate'),
  hasPartDuplicateErrors: getErrorsSelector(state, 'partDuplicate')
})

const mapDispatchToProps = dispatch => {
  return {
    deleteEntities: (name, payload) => dispatch(deleteActionCreator(name, payload)),
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
    resetStateUpdated: (name, payload) => dispatch(resetStateUpdated(name, payload)),
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name)),
    resetState: name => dispatch(resetState(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePart)
