import { connect } from 'react-redux'

import {
  getActionCreator,
  resetStateCreated,
  resetStateErrors,
  deleteActionCreator,
  resetStateDeleted,
  resetStateUpdated
} from 'app/store/actions'
import { updatedSelector } from 'app/services/updated.selector'
import { createdSelector } from 'app/services/created.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { deletedSelector } from 'app/services/deleted.selector'
import { getGroupsData } from 'app/services/groups.selector'

import GroupsList from './GroupsList'

const mapStateToProps = state => {
  return {
    groupCreated: createdSelector(state, 'groups'),
    groupUpdated: updatedSelector(state, 'groups'),
    groupDeleted: deletedSelector(state, 'groups'),
    groupsTable: getGroupsData(state),
    isGroupsLoading: isLoadingSelector(state, 'groups'),
    groups: getStateFieldData(state, 'groups')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteEntities: (name, payload) => dispatch(deleteActionCreator(name, payload)),
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    resetStateDeleted: name => dispatch(resetStateDeleted(name)),
    resetStateCreated: (name, payload) => dispatch(resetStateCreated(name, payload)),
    resetStateUpdated: (name, payload) => dispatch(resetStateUpdated(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)
