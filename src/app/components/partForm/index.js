import { connect } from 'react-redux'

import { getEthicalProtocolsSelector } from 'app/services/ethicalProtocols.selector'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator, resetStateErrors } from 'app/store/actions'
import PartForm from './PartForm'
import { getErrorsSelector } from 'app/services/error.selector'
import { isLoadingSelector } from 'app/services/loading.selector'

const mapStateToProps = state => {
  return {
    isStudyChoiceFieldsFetching: isLoadingSelector(state, 'studyChoiceFields'),
    isSinglelPartFetching: isLoadingSelector(state, 'singlePart'),
    hasPartsErrors: getErrorsSelector(state, 'parts'),
    hasSinglePartErrors: getErrorsSelector(state, 'singlePart'),
    isEthicalProtocolsFetching: isLoadingSelector(state, 'ethicalProtocols'),
    ethicalProtocols: getStateFieldData(state, 'ethicalProtocols'),
    studyChoiceFields: getStateFieldData(state, 'studyChoiceFields'),
    parts: getStateFieldData(state, 'parts'),
    sites: getChoiceFieldsSelector(state, 'studyChoiceFields', 'sites'),
    partTypes: getChoiceFieldsSelector(state, 'studyChoiceFields', 'part_types', 'partHealth'),
    ethicalProtocolsProcedures: getEthicalProtocolsSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload)),
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartForm)
