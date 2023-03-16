import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'

import { getValueInObjectSelector } from 'app/services/utils.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getLaboratoryAddress } from 'app/services/laboratories.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import AddressLaboratorySelect from './AddressLaboratorySelect'

const mapStateToProps = state => {
  return {
    addressesNames: removeDuplicateOption(getLaboratoryAddress(state)),
    laboratoriesNames: getValueInObjectSelector(state, 'laboratories', 'name'),
    isLaboratoriesLoading: isLoadingSelector(state, 'laboratories')
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressLaboratorySelect)
