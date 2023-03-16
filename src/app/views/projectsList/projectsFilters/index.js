import { connect } from 'react-redux'

import { getActionCreator } from 'app/store/actions'
import { isLoadingSelector } from 'app/services/loading.selector'
import ProjectsFilters from './ProjectsFilters'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { getNameUsersSelector } from 'app/services/users.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'

const mapStateToProps = state => ({
  sites: getChoiceFieldsSelector(state, 'studyChoiceFields', 'sites'),
  isStudyChoiceFieldsFetching: isLoadingSelector(state, 'studyChoiceFields'),
  studyChoiceFields: getStateFieldData(state, 'studyChoiceFields'),
  nameUsers: getNameUsersSelector(state),
  isUsersLoading: isLoadingSelector(state, 'users'),
  users: getStateFieldData(state, 'users'),
  projectStates: getChoiceFieldsSelector(state, 'studyChoiceFields', 'project_states'),
  clientsName: removeDuplicateOption(getFieldValueInObjectSelector(state, 'clients', 'name'))
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsFilters)
