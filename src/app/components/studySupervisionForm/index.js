import { connect } from 'react-redux'

import StudySupervisionForm from './StudySupervisionForm'
import { getActionCreator } from 'app/store/actions'
import { getValueInObjectSelector } from 'app/services/utils.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getErrorsSelector } from 'app/services/error.selector'

const mapStateToProps = state => {
  return {
    isStudySupervisionsFetching: isLoadingSelector(state, 'studySupervisions'),
    mspLaboratories: getStateFieldData(state, 'mspLaboratories'),
    mspLaboratoriesName: getValueInObjectSelector(state, 'mspLaboratories', 'name'),
    hasStudySupervisionsErrors: getErrorsSelector(state, 'studySupervisions'),
    isMspLaboratoriesFetching: isLoadingSelector(state, 'mspLaboratories')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudySupervisionForm)
