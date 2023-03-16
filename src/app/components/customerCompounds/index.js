import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'

import { isLoadingSelector } from 'app/services/loading.selector'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import CustomerCompounds from './CustomerCompounds'

const mapStateToProps = state => ({
  isCustomerCompoundsLoading: isLoadingSelector(state, 'customersCompounds'),
  customerCompoundsNames: getFieldValueInObjectSelector(state, 'customersCompounds', 'name')
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCompounds)
