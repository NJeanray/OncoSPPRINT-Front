import { connect } from 'react-redux'

import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getStateFieldData } from 'app/services/field.selector'
import EventImagingForm from './EventImagingForm'
import { getActionCreator } from '../../store/actions'

const mapStateToProps = state => ({
  eventChoiceFields: getStateFieldData(state, 'eventChoiceFields'),
  imagingTypes: getChoiceFieldsSelector(state, 'eventChoiceFields', 'imagery_types'),
  imagingPositionsOptions: getChoiceFieldsSelector(state, 'eventChoiceFields', 'imagery_positions'),
  imagingDurationOptions: getChoiceFieldsSelector(state, 'eventChoiceFields', 'imagery_durations')
})

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventImagingForm)
