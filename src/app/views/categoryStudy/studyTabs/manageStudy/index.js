import { connect } from 'react-redux'

import { updatedSelector } from 'app/services/updated.selector'
import {
  deleteActionCreator,
  updateActionCreator,
  resetStateUpdated,
  resetStateErrors,
  resetState,
  getActionCreator
} from 'app/store/actions'
import { createdSelector } from 'app/services/created.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import ManageStudy from './ManageStudy'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'

const mapStateToProps = state => {
  return {
    singlePartCreated: createdSelector(state, 'singlePart'),
    studiesUpdated: updatedSelector(state, 'studies'),
    hasStudiesErrors: getErrorsSelector(state, 'studies'),
    studyDuplicate: getStateFieldData(state, 'studyDuplicate'),
    isStudyDuplicating: isLoadingSelector(state, 'studyDuplicate'),
    hasStudyDuplicateErrors: getErrorsSelector(state, 'studyDuplicate')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteEntities: (name, payload) => dispatch(deleteActionCreator(name, payload)),
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
    resetStateUpdated: name => dispatch(resetStateUpdated(name)),
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name)),
    resetState: name => dispatch(resetState(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudy)
