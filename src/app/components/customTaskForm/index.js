import { connect } from 'react-redux'

import { isLoadingSelector } from 'app/services/loading.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { getValueInObjectSelector } from 'app/services/utils.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import CustomTaskForm from './CustomTaskForm'
import { getActionCreator } from '../../store/actions'

const mapStateToProps = state => {
  return {
    hasCustomTasksErrors: getErrorsSelector(state, 'customTasks'),
    isCustomTasksFetching: isLoadingSelector(state, 'customTasks'),
    customTasks: getStateFieldData(state, 'customTasks'),
    isMspLaboratoriesFetching: isLoadingSelector(state, 'mspLaboratories'),
    mspLaboratories: getStateFieldData(state, 'mspLaboratories'),
    mspLaboratoriesName: getValueInObjectSelector(state, 'mspLaboratories', 'name')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTaskForm)
