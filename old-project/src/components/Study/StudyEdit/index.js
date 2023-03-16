import { connect } from 'react-redux'

import actions from '../../../actions'
import StudyEdit from './StudyEdit'

const mapStateToProps = state => {
  return {
    studyGroupPartToAmend: state.amend,
    study: state.study,
    publish: state.publish,
    partsByStatus: state.study.object.parts.reduce((res, partId) => {
      const part = state.parts.objects[partId]
      if (!res[part.group.id]) res[part.group.id] = [part]
      else res[part.group.id].push(part)
      return res
    }, {}),
    partsGroups: state.study.object.parts.reduce((res, partId) => {
      const part = state.parts.objects[partId]
      if (!res[part.group.id]) res[part.group.id] = part.group
      return res
    }, {}),
    initialValues: state.study,
    notification: state.notification,
    costing: state.costing
  }
}

export default connect(mapStateToProps, actions)(StudyEdit)
