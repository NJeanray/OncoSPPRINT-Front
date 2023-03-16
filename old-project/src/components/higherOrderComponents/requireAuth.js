import React, { useEffect } from 'react'
import { connect } from 'react-redux'

export default ChildComponent => {
  const ComposedComponent = props => {
    const shouldNavigateAway = () => {
      if (!props.jwtToken) {
        props.history.push('/')
      }
    }

    useEffect(shouldNavigateAway)

    return <ChildComponent {...props} />
  }

  return connect(
    state => ({
      jwtToken: state.app.accessToken
    }),
    null
  )(ComposedComponent)
}
