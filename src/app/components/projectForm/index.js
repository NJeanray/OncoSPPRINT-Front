import { getStateFieldData } from 'app/services/field.selector'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getNameUsersSelector } from 'app/services/users.selector'
import { getActionCreator, resetStateErrors, updateActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'
import {
  getValueInObjectSelector,
  getFieldValueInObjectSelector
} from 'app/services/utils.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import { getClientsAddressSelector } from 'app/services/clients.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { isLoadingSelector } from 'app/services/loading.selector'

import ProjectForm from './ProjectForm'

const mapStateToProps = state => ({
  projectSequence: getStateFieldData(state, 'projectSequence'),
  isStudyChoiceFieldsFetching: isLoadingSelector(state, 'studyChoiceFields'),
  studyChoiceFields: getStateFieldData(state, 'studyChoiceFields'),
  isProjectsFetching: isLoadingSelector(state, 'projects'),
  isContactsFetching: isLoadingSelector(state, 'contactClients'),
  isUsersLoading: isLoadingSelector(state, 'users'),
  users: getStateFieldData(state, 'users'),
  // isClientsFetching: isLoadingSelector(state, 'clients'),
  clients: getStateFieldData(state, 'clients'),
  sites: getChoiceFieldsSelector(state, 'studyChoiceFields', 'sites'),
  projectTypes: getChoiceFieldsSelector(state, 'studyChoiceFields', 'project_types'),
  nameUsers: getNameUsersSelector(state),
  clientsName: removeDuplicateOption(getFieldValueInObjectSelector(state, 'clients', 'name')),
  contactsClientEmail: getValueInObjectSelector(state, 'contactsClient', 'email'),
  hasProjectsErrors: getErrorsSelector(state, 'projects'),
  clientsAddress: getClientsAddressSelector(state)
})

const mapDispatchToProps = dispatch => ({
  updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
  resetStateErrors: name => dispatch(resetStateErrors(name))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm)
