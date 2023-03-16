import React from 'react'

import Paper from '@material-ui/core/Paper'

import { FormError } from 'app/components/Form'
import Spinner from 'app/components/Spinner'

const StudyLoading = props => {
  const study = props.studies[props.studyId]

  if (!study) {
    return (
      <Paper classes={{ root: 'paper-root' }}>
        <Spinner />
      </Paper>
    )
  }
  return (
    <Paper classes={{ root: 'paper-root' }}>
      <h1>
        {study.name}: {study.title}
      </h1>
      <Spinner />
      {props.errors && FormError(props.errors)}
    </Paper>
  )
}

export default StudyLoading
