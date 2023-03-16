import React, { Component } from 'react'
import AddIcon from '@material-ui/icons/Add'

class AddButton extends Component {
  render() {
    return (
      <div className="add-btn" onClick={() => this.props.add()}>
        <AddIcon />
      </div>
    )
  }
}

export default AddButton
