import { connect } from 'react-redux'

import EventRandomizationForm from './EventRandomizationForm'
import { getValueInObjectSelector } from 'app/services/utils.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator } from '../../store/actions'

const mapStateToProps = state => {
  return {
    bricks: getStateFieldData(state, 'bricks'),
    isBricksFetching: isLoadingSelector(state, 'bricks'),
    randomizationNames: getValueInObjectSelector(state, 'bricks', 'name')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRandomizationForm)
