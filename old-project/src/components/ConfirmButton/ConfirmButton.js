import React, { Component, Fragment } from 'react'

import CustomButton from '../Button'
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup'

class ConfirmButton extends Component {
  state = {
    open: false
  }

  onClickFunction = () => {
    this.setState({ open: true })
  }

  onCloseFunction = () => {
    this.setState({ open: false })
  }

  onConfirmFunction = e => {
    this.props.onClick(e)
  }

  render() {
    const { customButton, popUpText, ...otherProps } = this.props
    const Tag = customButton || CustomButton

    return (
      <Fragment>
        <Tag {...otherProps} onClick={this.onClickFunction} />
        <ConfirmPopup
          popUpText={popUpText ? popUpText : null}
          open={this.state.open}
          onClose={this.onCloseFunction}
          onConfirm={this.onConfirmFunction}
        />
      </Fragment>
    )
  }
}

export default ConfirmButton
