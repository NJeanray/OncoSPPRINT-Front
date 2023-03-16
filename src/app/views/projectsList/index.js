import { connect } from 'react-redux'

import { getProjectsTableSelector } from 'app/services/projects.selector'
import { getActionCreator, resetStateErrors, resetStateCreated } from 'app/store/actions'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import { createdSelector } from 'app/services/created.selector'
import ProjectsList from './ProjectsList'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'

const mapStateToProps = state => ({
  projectCreated: createdSelector(state, 'projects'),
  projectsTable: getProjectsTableSelector(state),
  isProjectsLoading: isLoadingSelector(state, 'projects'),
  errorsProjects: getErrorsSelector(state, 'projects'),
  projectTypes: getChoiceFieldsSelector(state, 'studyChoiceFields', 'project_types')
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
  resetStateErrors: name => dispatch(resetStateErrors(name)),
  resetStateCreated: name => dispatch(resetStateCreated(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
