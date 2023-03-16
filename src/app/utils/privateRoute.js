/* eslint-disable */

import React from 'react'
import { Redirect, Route } from 'react-router-dom'

type Props = {
  component: React.Node
}

const privateRoute = ({ component: Component, extraProps, ...rest }: Props) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return (
    <Route
      {...rest}
      render={props =>
        accessToken ? (
          <>
            <Component {...props} {...extraProps} />
          </>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  )
}

export default privateRoute
