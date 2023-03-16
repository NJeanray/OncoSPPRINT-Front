import { connect } from 'react-redux'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { updatedSelector } from 'app/services/updated.selector'
import { createdSelector } from 'app/services/created.selector'
import { deletedSelector } from 'app/services/deleted.selector'
import { getCustomConsumablesTable } from 'app/services/customConsumables.selector'

import CustomConsumablesList from './CustomConsumablesList'
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
    customConsumables: getStateFieldData(state, 'customConsumables'),
    customConsumableCreated: createdSelector(state, 'customConsumables'),
    customConsumableUpdated: updatedSelector(state, 'customConsumables'),
    customConsumableDeleted: deletedSelector(state, 'customConsumables'),
    isCustomTasksLoading: isLoadingSelector(state, 'customConsumables'),
    customConsumablesTable: getCustomConsumablesTable(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomConsumablesList)
