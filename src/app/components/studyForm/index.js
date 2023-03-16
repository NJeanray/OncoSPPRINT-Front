import { connect } from 'react-redux'

import { getActionCreator } from 'app/store/actions'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import StudyForm from './StudyForm'

const mapStateToProps = state => {
  return {
    isStudyChoiceFieldsFetching: isLoadingSelector(state, 'studyChoiceFields'),
    studyChoiceFields: getStateFieldData(state, 'studyChoiceFields'),
    studies: getStateFieldData(state, 'studies'),
    studyTypes: getChoiceFieldsSelector(state, 'studyChoiceFields', 'study_types'),
    sites: getChoiceFieldsSelector(state, 'studyChoiceFields', 'sites')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyForm)
