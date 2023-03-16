import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'

import { getStateFieldData } from 'app/services/field.selector'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getValueInObjectSelector } from 'app/services/utils.selector'
import ConsumableSelect from './ConsumableSelect'

const mapStateToProps = state => ({
  isConsumablesLoading: isLoadingSelector(state, 'consumables'),
  consumables: getStateFieldData(state, 'consumables'),
  consumablesLibelleArticles: getValueInObjectSelector(state, 'consumables', 'libelle_article')
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsumableSelect)
