import { connect } from 'react-redux'

import { getActionCreator } from 'app/store/actions'
import {
  getEventsTimepointSelector,
  getEventTimepointLabel
} from 'app/services/eventsTimepoint.selector'
import EventTimepoints from './EventTimepoints'

const mapStateToProps = state => {
  return {
    eventsTypeFiltered: getEventsTimepointSelector(state),
    eventLabel: getEventTimepointLabel(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventTimepoints)
