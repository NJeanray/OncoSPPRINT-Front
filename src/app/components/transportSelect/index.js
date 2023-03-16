import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'

import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import TransportSelect from './TransportSelect'

const mapStateToProps = state => ({
  countriesOptions: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'transports', 'country')
  ),
  transportCountries: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'transports', 'country')
  ),
  isTransportsLoading: isLoadingSelector(state, 'transports')
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransportSelect)
