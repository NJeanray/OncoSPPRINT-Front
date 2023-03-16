import { connect } from 'react-redux'
import StudyLoading from './StudyLoading'

const mapStateToProps = state => {
  return {
    studies: state.studies.objects.reduce((res, study) => {
      res[study.id] = study
      return res
    }, {})
  }
}

export default connect(mapStateToProps, null)(StudyLoading)
