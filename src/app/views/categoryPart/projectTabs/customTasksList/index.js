import { connect } from 'react-redux'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { updatedSelector } from 'app/services/updated.selector'
import { createdSelector } from 'app/services/created.selector'
import { getCustomTasksTable } from 'app/services/customTasks.selector'
import { deletedSelector } from 'app/services/deleted.selector'

import CustomTasksList from './CustomTasksList'
import {
  getActionCreator,
  resetStateUpdated,
  resetStateErrors,
  updateActionCreator,
  resetStateCreated,
  resetStateDeleted,
  deleteActionCreator
} from 'app/store/actions'

const mapStateToProps = state => {
  return {
    customTasks: getStateFieldData(state, 'customTasks'),
    customTaskCreated: createdSelector(state, 'customTasks'),
    customTaskUpdated: updatedSelector(state, 'customTasks'),
    customTaskDeleted: deletedSelector(state, 'customTasks'),
    isCustomTasksLoading: isLoadingSelector(state, 'customTasks'),
    customTasksTable: getCustomTasksTable(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteEntities: (name, payload) => dispatch(deleteActionCreator(name, payload)),
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    updateEntities: (name, payload) => dispatch(updateActionCreator(name, payload)),
    resetStateUpdated: name => dispatch(resetStateUpdated(name)),
    resetStateErrors: name => dispatch(resetStateErrors(name)),
    resetStateCreated: name => dispatch(resetStateCreated(name)),
    resetStateDeleted: name => dispatch(resetStateDeleted(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTasksList)
