import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

import Button from '@material-ui/core/Button/index'
import Card from '@material-ui/core/Card/index'
import ExpansionPanel from '@material-ui/core/ExpansionPanel/index'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index'
import LockerIcon from '@material-ui/icons/Lock'
import LockerOpenIcon from '@material-ui/icons/LockOpen'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SmallSpinner from 'app/components/SmallSpinner'

import StudyParts from './StudyParts/StudyParts.js'
import GlobalSettings from './StudyGlobalSettings/StudyGlobalSettings'

class StudyEdit extends PureComponent {
  state = {
    study: this.props.study.object,
    isPublishing: false,
    isAmending: false
  }

  handlePublishStudy = () => {
    const { study } = this.state
    const studyObj = _.omit(study, ['partsByStatus'])

    this.setState({ isPublishing: true })
    this.props.createPublish(study.id, studyObj)
  }

  handleAmendStudyPart = studyPartGroupId => {
    const { study } = this.state

    this.setState({ isAmending: true })
    this.props.createAmend(
      { studyPk: study.id, groupPartId: studyPartGroupId },
      this.props.partsGroups[studyPartGroupId]
    )
  }

  setNotification = (prevStatusStatus, study) => {
    if (prevStatusStatus === 'Created')
      this.props.setNotification(`The study ${study.object.title} has successfully been published`)
    else if (prevStatusStatus === 'Amending')
      this.props.setNotification(`The study ${study.object.title} has successfully been amended`)
  }

  componentDidUpdate(prevProps) {
    const { publish, study, studyGroupPartToAmend, notification } = this.props

    if (prevProps.study.object !== study.object) this.setState({ study: study.object })
    else if (!_.isEmpty(publish.objects) && prevProps.publish.objects !== publish.objects) {
      this.setState({ study: publish.objects[0] })
      this.setNotification(prevProps.study.object.status, study)
    } else if (
      prevProps.studyGroupPartToAmend.objects !== studyGroupPartToAmend.objects &&
      !_.isEmpty(studyGroupPartToAmend.objects)
    )
      this.props.getStudy(study.object.id)
    else if (notification && prevProps.notification !== notification) this.props.history.push('/')
  }

  displayLocker = condition => {
    return condition ? <LockerOpenIcon className="locker" /> : <LockerIcon className="locker" />
  }

  render() {
    const { isPublishing, study, isAmending } = this.state
    const { costing } = this.props

    return (
      <div className="study-edit__wrapper">
        <div className="study-edit__card-left">
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {this.displayLocker(study.status === 'Created' && study.editable)}
              <h2 style={{ margin: 0 }}>
                <FormattedMessage id="Global Settings" />
              </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <GlobalSettings
                disabled={
                  study.status === 'Published' || study.status === 'Amended' || !study.editable
                }
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {Object.keys(this.props.partsByStatus)
            .sort()
            .map(groupId => (
              <ExpansionPanel key={this.props.partsGroups[groupId].id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  {this.displayLocker(this.props.partsGroups[groupId].editable && study.editable)}
                  <h2 style={{ margin: 0 }}>ET{this.props.partsGroups[groupId].name}</h2>
                </ExpansionPanelSummary>
                {this.props.partsGroups[groupId].amendable && (
                  <div className="card-left__ammend-btn-wrapper">
                    <Button
                      className="card-left__ammend-btn"
                      variant="contained"
                      color="primary"
                      onClick={() => this.handleAmendStudyPart(this.props.partsGroups[groupId].id)}
                      disabled={isAmending}
                    >
                      <FormattedMessage id="AMEND" />
                    </Button>
                  </div>
                )}
                <StudyParts
                  status={this.props.partsGroups[groupId].id}
                  partGroup={this.props.partsGroups[groupId]}
                  parts={this.props.partsByStatus[groupId]}
                />
              </ExpansionPanel>
            ))}
        </div>
        <Card className="study-edit__card-right">
          <div className="card-right__title">
            <h2>Costing</h2>
          </div>
          <div className="card-right__total-cost-wrapper">
            <span className="card-right__total-cost">TOTAL COST</span>
            {costing.loading && costing.loading === true ? (
              <div style={{ margin: '20px 0' }}>
                <SmallSpinner color={'white'} />
              </div>
            ) : (
              <span className="card-right__total-cost-value">
                {study.total_cost ? study.total_cost : 0} €
              </span>
            )}
          </div>
          {(study.status === 'Created' || study.status === 'Amending') && study.editable && (
            <div className="card-right__btn">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => this.handlePublishStudy()}
                disabled={isPublishing}
              >
                <FormattedMessage id="Publish" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default StudyEdit
