import { connect } from 'react-redux'

import actions from '../../actions'
import { initialGroupMapper } from '../../actions/mappers'
import GroupsSettings from './GroupsSettings'

export default connect(initialGroupMapper, actions)(GroupsSettings)
