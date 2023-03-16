import { connect } from 'react-redux'

import EventSampleForm from './EventSampleForm'
import { getActionCreator } from 'app/store/actions'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import {
  getFieldValueInObjectSelector,
  getValueInObjectSelector
} from 'app/services/utils.selector'
import { getBrickParamsFiltered, getBrickParamValues } from 'app/services/bricks.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'

const mapStateToProps = (state, props) => {
  const { partSelected } = props

  return {
    isWeighBricksLoading: isLoadingSelector(state, 'weightBricks'),
    samplesState: getStateFieldData(state, 'bricks'),
    sampleParamsList: getBrickParamsFiltered(state),
    sampleParamsValues: getBrickParamValues(state, partSelected),
    isBricksLoading: isLoadingSelector(state, 'bricks'),
    eventsChoiceFields: getStateFieldData(state, 'eventsChoiceFields'),
    transportTemperatures: getChoiceFieldsSelector(
      state,
      'eventChoiceFields',
      'transport_temperatures'
    ),
    conservationNames: removeDuplicateOption(
      getValueInObjectSelector(state, 'conservationBricks', 'name')
    ),
    sampleNames: removeDuplicateOption(getFieldValueInObjectSelector(state, 'bricks', 'name')),
    weightBricksOptions: getValueInObjectSelector(state, 'weightBricks', 'name'),
    conservationBricks: state.data.get('conservationBricks')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSampleForm)
