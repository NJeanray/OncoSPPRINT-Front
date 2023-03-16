import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

class BrickModify extends Component {
  render() {
    const { children } = this.props

    return (
      <div
        className="modal__wrapper"
        style={{ overflow: 'scroll', minWidth: '550px', minHeight: 'fit-content' }}
      >
        <div className="modal__header">
          <Typography variant="h6" id="modal-title">
            Modify Task
          </Typography>
        </div>
        <div className="modal__content" style={{ marginTop: '20px' }}>
          {children}
        </div>
      </div>
    )
  }
}

export default BrickModify
