import { connect } from 'react-redux'

import { getPartsFromStudiesSelector } from 'app/services/parts.selector'
import { getStateFieldData } from 'app/services/field.selector'
import {
  getActionCreator,
  resetStateUpdated,
  resetStateDeleted,
  resetStateErrors
} from 'app/store/actions'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import { deletedSelector } from 'app/services/deleted.selector'
import ProjectDashboard from './ProjectDashboard'

const mapStateToProps = (state, { match: { params } }) => {
  return {
    partDeleted: deletedSelector(state, 'parts'),
    studyDeleted: deletedSelector(state, 'studies'),
    projects: getStateFieldData(state, 'projects'),
    studies: getStateFieldData(state, 'studies'),
    parts: getStateFieldData(state, 'parts'),
    errorsProjects: getErrorsSelector(state, 'projects'),
    isStudiesLoading: isLoadingSelector(state, 'studies'),
    isPartsLoading: isLoadingSelector(state, 'parts'),
    partsFromStudies: getPartsFromStudiesSelector(state, params.studyId)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
  resetStateUpdated: (name, payload) => dispatch(resetStateUpdated(name, payload)),
  resetStateDeleted: name => dispatch(resetStateDeleted(name)),
  resetStateErrors: name => dispatch(resetStateErrors(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashboard)
