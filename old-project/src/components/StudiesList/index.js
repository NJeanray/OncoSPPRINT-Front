import { connect } from 'react-redux'

import * as actions from 'actions'
import handleErrors from 'app/components/higherOrderComponents/handleErrors'
import { consoleLog } from 'lib/utils'
import StudiesList from './StudiesList'

const mapStateToProps = state => {
  return {
    jwtToken: state.app.accessToken,
    errors: state.app.errors,
    studies: state.studies,
    notification: state.notification ? state.notification : undefined
  }
}

export default connect(mapStateToProps, actions)(handleErrors(StudiesList, consoleLog))
