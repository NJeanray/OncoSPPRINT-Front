import { connect } from 'react-redux'

import EventsArray from './EventsArray'
import { eventsGroupSorted } from 'app/services/events.selector'

const mapStateToProps = state => {
  return {
    eventsSorted: eventsGroupSorted(state),
    events: state.data.get('events'),
    groups: state.data.get('groups')
  }
}

export default connect(mapStateToProps)(EventsArray)
