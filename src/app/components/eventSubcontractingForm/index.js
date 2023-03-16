import { connect } from 'react-redux'

import { isLoadingSelector } from 'app/services/loading.selector'
import { getStateFieldData } from 'app/services/field.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import EventSubcontractingForm from './EventSubcontractingForm'
import { getActionCreator } from '../../store/actions'

const mapStateToProps = state => {
  return {
    isSubcontractorsFetching: isLoadingSelector(state, 'subcontractors'),
    subcontractors: getStateFieldData(state, 'subcontractors'),
    subcontractorNames: removeDuplicateOption(
      getFieldValueInObjectSelector(state, 'subcontractors', 'libelle_fournisseur_principal')
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSubcontractingForm)
