import React from 'react'
import classNames from 'classnames'

const SmallSpinner = ({ color = 'black' }) => (
  <div
    className={classNames('small-spinner', {
      'small-spinner--white-background': color === 'white'
    })}
  >
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
)

export default SmallSpinner
