import { getActionCreator } from 'app/store/actions'
import { connect } from 'react-redux'
import {
  getSamplesOptions,
  getSampleFragmentsOptions
} from 'app/services/samplesTransfert.selector'
import { getStateFieldData } from 'app/services/field.selector'

import SamplesTransfertSelect from './SamplesTransfertSelect'

const mapStateToProps = state => ({
  fragments: getStateFieldData(state, 'samples'),
  sampleOptions: getSamplesOptions(state),
  sampleFragments: getSampleFragmentsOptions(state)
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SamplesTransfertSelect)
