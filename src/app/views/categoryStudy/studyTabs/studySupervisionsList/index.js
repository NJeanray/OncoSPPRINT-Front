import { connect } from 'react-redux'
import {
  getActionCreator,
  resetStateErrors,
  updateActionCreator,
  resetStateUpdated
} from 'app/store/actions'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { updatedSelector } from 'app/services/updated.selector'
import { getStudySupervisionsTable } from 'app/services/studySupervisions.selector'
import StudySupervisionsList from './StudySupervisionsList'

const mapStateToProps = state => ({
  studySupervisionUpdated: updatedSelector(state, 'studySupervisions'),
  studySupervisions: getStateFieldData(state, 'studySupervisions'),
  isStudySupervisionsLoading: isLoadingSelector(state, 'studySupervisions'),
  studySupervisionsTable: getStudySupervisionsTable(state)
})

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
    resetStateUpdated: name => dispatch(resetStateUpdated(name)),
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudySupervisionsList)
