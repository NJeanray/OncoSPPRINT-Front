import { connect } from 'react-redux'

import actions from '../../../../../actions'
import Select from '../../../../Select/Select'

export default connect(
  state => ({
    options: state.modelType.objects,
    fetcher: 'getModelType',
    optionsLoading: state.modelType.loading
  }),
  actions
)(Select)
