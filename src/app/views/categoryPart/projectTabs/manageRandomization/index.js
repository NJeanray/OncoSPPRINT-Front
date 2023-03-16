import { connect } from 'react-redux'

import ManageRandomization from './ManageRandomization'
import { deleteActionCreator, updateActionCreator, createActionCreator } from 'app/store/actions'

const mapStateToProps = state => {
  return {
    brick: state.data.get('brick')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteRandomization: (name, payload) => dispatch(deleteActionCreator(name, payload)),
    updateRandomization: (name, payload) => dispatch(updateActionCreator(name, payload)),
    createRandomization: (name, payload) => dispatch(createActionCreator(name, payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRandomization)
