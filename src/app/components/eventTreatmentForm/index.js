import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'
import EventTreatmentForm from './EventTreatmentForm'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getStateFieldData } from 'app/services/field.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getBrickParamValues, getBrickParamsFiltered } from 'app/services/bricks.selector'

const mapStateToProps = (state, props) => {
  const { partSelected } = props

  return {
    brickParamsList: getBrickParamsFiltered(state),
    brickParamsValues: getBrickParamValues(state, partSelected),
    treatmentNames: removeDuplicateOption(getFieldValueInObjectSelector(state, 'bricks', 'name')),
    eventChoiceFields: getStateFieldData(state, 'eventChoiceFields'),
    isBricksFetching: isLoadingSelector(state, 'bricks'),
    doseUnities: getChoiceFieldsSelector(state, 'eventChoiceFields', 'dose_unities')
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventTreatmentForm)
