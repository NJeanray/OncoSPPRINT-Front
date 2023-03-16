import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'

import TumorLineRadio from './TumorLineRadio'

const mapStateToProps = state => ({
  isModelsFetching: isLoadingSelector(state, 'models'),
  models: getStateFieldData(state, 'models'),
  modelsTumorLines: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'models', 'tumor_line')
  ),
  inductedMaterialTypesOptions: getChoiceFieldsSelector(
    state,
    'studyChoiceFields',
    'inducted_material_type'
  )
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(TumorLineRadio)
