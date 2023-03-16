import React, { Component, Fragment } from 'react'

import Paper from '@material-ui/core/Paper/index'
import SaveAlt from '@material-ui/icons/Visibility'

import _ from 'lodash'
import LoadingStudy from '../StudyLoading'

class StudyDocuments extends Component {
  componentDidMount() {
    const studyId = parseInt(this.props.match.params.id)
    this.props.getDocuments(studyId)
  }

  render() {
    const studyId = parseInt(this.props.match.params.id)

    return this.props.documents.objects && _.isEmpty(this.props.documents.objects) ? (
      <LoadingStudy studyId={studyId} {...this.props} />
    ) : (
      <Fragment>
        {this.props.documents.objects.map(document => {
          return (
            <Paper
              style={{ marginBottom: '10px', padding: '15px' }}
              classes={{ root: 'paper-root' }}
            >
              <div className="document__item">
                <SaveAlt className="item__icon" onClick={() => window.open(document.url)} />
                <span>{document.name}</span>
              </div>
            </Paper>
          )
        })}
      </Fragment>
    )
  }
}

export default StudyDocuments
