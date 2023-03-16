import { connect } from 'react-redux'

import { getActionCreator, resetStateErrors, resetStateUpdated } from 'app/store/actions'
import { getStateFieldData } from 'app/services/field.selector'
import { createdSelector } from 'app/services/created.selector'
import { updatedSelector } from 'app/services/updated.selector'
import { deletedSelector } from 'app/services/deleted.selector'
import { getGroupsData } from 'app/services/groups.selector'
import CategoryPart from './CategoryPart'

const mapStateToProps = state => {
  return {
    groupsName: getGroupsData(state),
    groups: getStateFieldData(state, 'groups'),
    parts: getStateFieldData(state, 'parts'),
    studies: getStateFieldData(state, 'studies'),
    projects: getStateFieldData(state, 'projects'),
    eventCreated: createdSelector(state, 'singleEvent'),
    eventUpdated: updatedSelector(state, 'events'),
    eventDeleted: deletedSelector(state, 'events')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    resetStateUpdated: (name, payload) => dispatch(resetStateUpdated(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPart)
