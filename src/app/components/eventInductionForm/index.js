import { connect } from 'react-redux'

import { isLoadingSelector } from 'app/services/loading.selector'
import { getStateFieldData } from 'app/services/field.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import { getBrickParamsFiltered, getBrickParamValues } from 'app/services/bricks.selector'
import EventInductionForm from './EventInductionForm'

const mapStateToProps = (state, props) => {
  const { partSelected } = props

  return {
    brickParamsValues: getBrickParamValues(state, partSelected),
    brickParamsList: getBrickParamsFiltered(state),
    brickParams: getStateFieldData(state, 'brickParams'),
    isBricksFetching: isLoadingSelector(state, 'bricks'),
    inductionNames: removeDuplicateOption(getFieldValueInObjectSelector(state, 'bricks', 'name'))
  }
}

export default connect(mapStateToProps)(EventInductionForm)
