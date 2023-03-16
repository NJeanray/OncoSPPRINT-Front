import { connect } from 'react-redux'

import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator } from 'app/store/actions'
import { getSampleFragmentsOptions } from 'app/services/samplesTransfert.selector'
import EventTransfertForm from './EventTransfertForm'

const mapStateToProps = state => ({
  samplesList: getStateFieldData(state, 'allSamples'),
  sampleFragments: getSampleFragmentsOptions(state)
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(EventTransfertForm)
