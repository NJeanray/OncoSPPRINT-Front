import { connect } from 'react-redux'

import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getStateFieldData } from 'app/services/field.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { getBrickParamsFiltered, getBrickParamValues } from 'app/services/bricks.selector'
import EventMonitoringForm from './EventMonitoringForm'

const mapStateToProps = (state, props) => {
  const { partSelected } = props

  return {
    brickParamsValues: getBrickParamValues(state, partSelected),
    brickParamsList: getBrickParamsFiltered(state),
    brickParams: getStateFieldData(state, 'brickParams'),
    isBricksFetching: isLoadingSelector(state, 'bricks'),
    monitoringNames: removeDuplicateOption(getFieldValueInObjectSelector(state, 'bricks', 'name'))
  }
}

export default connect(mapStateToProps)(EventMonitoringForm)
