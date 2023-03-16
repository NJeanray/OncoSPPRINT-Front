import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import _ from 'lodash'

import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import { FormError } from '../Form'
import Spinner from '../Spinner'
import StudyLoading from './StudyLoading'
import Costing from './StudyCosting'
import Documents from './StudyDocuments/'
import StudyEdit from './StudyEdit/'

class Study extends Component {
  componentDidMount() {
    const studyId = parseInt(this.props.match.params.id)

    this.props.getStudy(studyId)
  }

  render() {
    const studyId = parseInt(this.props.match.params.id)

    if (_.isEmpty(this.props.object) || this.props.object.id !== studyId)
      return <StudyLoading studyId={studyId} {...this.props} />
    return (
      <Fragment>
        <h1>
          {this.props.object.name}: {this.props.object.title}
        </h1>
        <div className="study__tab-wrapper">
          <Tabs
            value={this.props.location.pathname}
            onChange={(_, value) => {
              this.props.history.push(value)
            }}
            classes={{}}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label={this.props.intl.formatMessage({ id: 'Edition' })}
              value={`/study/${studyId}`}
            />
            <Tab
              label={this.props.intl.formatMessage({ id: 'Costing' })}
              value={`/study/${studyId}/costing`}
            />
            <Tab
              label={this.props.intl.formatMessage({ id: 'Documents' })}
              value={`/study/${studyId}/documents`}
            />
          </Tabs>
          {(this.props.loading || this.props.errors) && (
            <Paper classes={{ root: 'paper-root' }}>
              {this.props.loading && <Spinner />}
              {this.props.errors && FormError(this.props.errors)}
            </Paper>
          )}
          <Switch>
            <Route path={`/study/${studyId}/costing`} render={() => <Costing {...this.props} />} />
            <Route
              path={`/study/${studyId}/documents`}
              render={() => <Documents {...this.props} />}
            />
            <Route path={`/study/${studyId}/`} render={() => <StudyEdit {...this.props} />} />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default Study
