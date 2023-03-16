import { connect } from 'react-redux'

import actions from 'actions'
import TabContent from './TabContent'

const mapStateToProps = state => {
  return {
    functionJobs: state.functionJobs,
    consumables: state.consumables,
    customConsumables: state.customConsumables,
    customTasks: state.customTasks,
    subcontractings: state.subcontractings,
    laboratories: state.laboratories,
    study: state.study
  }
}

export default connect(mapStateToProps, actions)(TabContent)
