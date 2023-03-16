import React from 'react'

import './WelcomeStyle.css'
import handleErrors from '../higherOrderComponents/handleErrors'
import { consoleLog } from '../../lib/utils'

const Welcome = props => {
  return <div className="welcome">ONCOSPPRINT WELCOME PAGE</div>
}
export default handleErrors(Welcome, consoleLog)
