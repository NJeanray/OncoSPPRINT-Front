import { connect } from 'react-redux'

import { getStateFieldData } from 'app/services/field.selector'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getActionCreator } from 'app/store/actions'
import { getValueInObjectSelector } from 'app/services/utils.selector'
import { getTransfertsOptions } from 'app/services/transferts.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { isLoadingSelector } from 'app/services/loading.selector'
import EventFacsExVivoBCEForm from './EventFacsExVivoBCEForm'

const mapStateToProps = state => {
  return {
    antibodiesNames: removeDuplicateOption(getValueInObjectSelector(state, 'antibodies', 'nom')),
    eventChoiceFields: getStateFieldData(state, 'eventChoiceFields'),
    standardPanels: getChoiceFieldsSelector(state, 'eventChoiceFields', 'standard_panels'),
    transfertsList: getTransfertsOptions(state),
    isTransfertsLoading: isLoadingSelector(state, 'transferts')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFacsExVivoBCEForm)
