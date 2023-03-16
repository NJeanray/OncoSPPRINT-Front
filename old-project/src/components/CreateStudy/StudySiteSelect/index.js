import { connect } from 'react-redux'

import actions from 'actions'
import Select from 'app/components/Select/Select.js'

const mapStateToProps = state => {
  return {
    options: state.studySite.objects,
    fetcher: 'getStudySite',
    optionsLoading: state.studySite.loading
  }
}

export default connect(mapStateToProps, actions)(Select)
