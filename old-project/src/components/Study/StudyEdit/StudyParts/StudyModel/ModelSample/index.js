import { connect } from 'react-redux'

import ModelSample from './ModelSample'

import actions from '../../../../../../actions'

const mapStateToProps = state => {
  return {
    bricks: state.bricks,
    brickParams: state.brickParams
  }
}

export default connect(mapStateToProps, actions)(ModelSample)
