import { connect } from 'react-redux'

import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator } from 'app/store/actions'
import { getTransfertsOptions } from 'app/services/transferts.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import EventIHC from './EventIHC'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'

const mapStateToProps = state => {
  return {
    ihcTypes: getChoiceFieldsSelector(state, 'eventChoiceFields', 'ihc_types'),
    eventChoiceFields: getStateFieldData(state, 'eventChoiceFields'),
    transfertsList: getTransfertsOptions(state),
    isTransfertsLoading: isLoadingSelector(state, 'transferts')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIHC)
