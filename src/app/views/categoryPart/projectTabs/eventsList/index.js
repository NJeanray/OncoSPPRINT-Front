import { connect } from 'react-redux'
import {
  deleteActionCreator,
  getActionCreator,
  resetStateErrors,
  resetStateCreated,
  resetStateUpdated,
  resetStateDeleted
} from 'app/store/actions'
import EventsList from './EventsList'
import { getStateFieldData } from 'app/services/field.selector'
import { getEventsTableSelector } from 'app/services/events.selector'
import { createdSelector } from 'app/services/created.selector'
import { updatedSelector } from 'app/services/updated.selector'
import { deletedSelector } from 'app/services/deleted.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getGroupsOptions } from 'app/services/groups.selector'

const mapStateToProps = state => {
  return {
    singleEventTransferNext: state.data.getIn(['singleEvent', 'transfertNext']),
    isEventsLoading: isLoadingSelector(state, 'events'),
    eventCreated: createdSelector(state, 'singleEvent'),
    eventUpdated: updatedSelector(state, 'events'),
    eventDeleted: deletedSelector(state, 'events'),
    events: getStateFieldData(state, 'events'),
    eventsTable: getEventsTableSelector(state),
    groups: getStateFieldData(state, 'groups'),
    groupsOptions: getGroupsOptions(state, 'groups')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    deleteEntities: (name, payload) => dispatch(deleteActionCreator(name, payload)),
    resetStateCreated: name => dispatch(resetStateCreated(name)),
    resetStateErrors: name => dispatch(resetStateErrors(name)),
    resetStateUpdated: name => dispatch(resetStateUpdated(name)),
    resetStateDeleted: name => dispatch(resetStateDeleted(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList)
