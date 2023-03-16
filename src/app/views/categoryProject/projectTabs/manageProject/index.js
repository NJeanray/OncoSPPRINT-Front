import { connect } from 'react-redux'

import {
  resetStateUpdated,
  updateActionCreator,
  resetStateCreated,
  getActionCreator,
  resetState,
  resetStateErrors
} from 'app/store/actions'
import { getStateFieldData } from 'app/services/field.selector'
import { updatedSelector } from 'app/services/updated.selector'
import { createdSelector } from 'app/services/created.selector'
import ManageProject from './ManageProject'
import { getErrorsSelector } from 'app/services/error.selector'
import { isLoadingSelector } from 'app/services/loading.selector'

const mapStateToProps = state => ({
  studyCreated: createdSelector(state, 'studies'),
  projectUpdated: updatedSelector(state, 'projects'),
  studyChoiceFields: getStateFieldData(state, 'studyChoiceFields'),
  projectDuplicate: getStateFieldData(state, 'projectDuplicate'),
  isProjectsFetching: isLoadingSelector(state, 'projects'),
  isProjectDuplicating: isLoadingSelector(state, 'projectDuplicate'),
  hasProjectDuplicateErrors: getErrorsSelector(state, 'projectDuplicate')
})

const mapDispatchToProps = dispatch => ({
  updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
  resetStateUpdated: (name, payload) => dispatch(resetStateUpdated(name, payload)),
  resetStateCreated: name => dispatch(resetStateCreated(name)),
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
  resetState: name => dispatch(resetState(name)),
  resetStateErrors: name => dispatch(resetStateErrors(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject)
