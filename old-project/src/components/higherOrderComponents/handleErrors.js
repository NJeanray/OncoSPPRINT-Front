import React from 'react'

/**
 * Higher-order function, to avoid adding error catcher method in every React component.
 * @ params {function}  ChildComponent React component without error handler.
 * @ params {function} errorHandler Explicit.
 */
export default function handleErrors(ChildComponent, errorHandler) {
  return class extends React.Component {
    componentDidCatch(error, info) {
      errorHandler(error, info)
    }

    render() {
      return <ChildComponent {...this.props} />
    }
  }
}
