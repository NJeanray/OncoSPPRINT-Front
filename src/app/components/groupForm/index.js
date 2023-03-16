import { connect } from 'react-redux'

import { resetStateErrors } from 'app/store/actions/'
import { isLoadingSelector } from 'app/services/loading.selector'
import { getErrorsSelector } from 'app/services/error.selector'
import GroupForm from './GroupForm'

const mapStateToProps = state => {
  return {
    hasGroupsErrors: getErrorsSelector(state, 'groups'),
    isGroupsFetching: isLoadingSelector(state, 'groups')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetStateErrors: name => dispatch(resetStateErrors(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm)
