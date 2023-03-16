import { connect } from 'react-redux'

import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator } from 'app/store/actions'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import EventForm from './EventForm'

const mapStateToProps = state => {
  return {
    parts: getStateFieldData(state, 'parts'),
    allGroups: getStateFieldData(state, 'allGroups'),
    studyChoiceFields: getStateFieldData(state, 'studyChoiceFields'),
    isEventLoading: isLoadingSelector(state, 'singleEvent'),
    hasEventsError: getErrorsSelector(state, 'events'),
    hasSingleEventError: getErrorsSelector(state, 'singleEvent')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    getGroups: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
