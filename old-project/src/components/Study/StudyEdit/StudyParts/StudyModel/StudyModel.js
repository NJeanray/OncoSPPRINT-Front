import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import ExpansionPanel from '@material-ui/core/ExpansionPanel/index'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import RemoveIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography/index'

import ConfirmButton from '../../../../ConfirmButton'
import GroupsSettings from '../../../../GroupsSettings'
import AnimalSettings from './ModelAnimalSettings/AnimalSettings'
import ModelNameSelect from './ModelNameSelect'
import ModelTypeSelect from './ModelTypeSelect'
import ModelImaging from './ModelImaging'
import ModelSample from './ModelSample'
import StudyCustomSubcontracting from './StudyCustomSubcontracting/StudyCustomSubcontracting'
import Error from '@material-ui/icons/Error'
import Snackbar from '@material-ui/core/Snackbar'

class StudyModel extends Component {
  state = {
    expanded: -1,
    isSnackbarOpen: false,
    groupParentString: null,
    arrIndexSelected: -1
  }

  setSnackbarOpen = (groupParent, value) => {
    this.setState({ groupParentString: groupParent, isSnackbarOpen: value })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.studyModel.id !== this.props.studyModel.id) this.setState({ expanded: -1 })
  }

  updateExpanded = id => {
    this.setState({ expanded: id })
  }

  recursionGroupChild = (childId, arr = [], index = 0) => {
    const { allGroups, studyModel } = this.props
    const { expanded } = this.state

    if (studyModel.initial_group !== childId) {
      arr.push(
        <div style={{ marginLeft: `${40 * index}px`, marginTop: '10px' }}>
          <ExpansionPanel
            key={childId}
            expanded={expanded === Number('10' + childId)}
            onChange={() =>
              expanded === Number('10' + childId)
                ? this.updateExpanded(-1)
                : this.updateExpanded(Number('10' + childId))
            }
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h2 style={{ margin: 0 }}>
                <FormattedMessage id={`Group ${childId} post randomisation`} />
              </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <GroupsSettings
                groupInfos={allGroups[childId]}
                disabled={!this.props.studyModel.animalsSpecie || !this.props.study.editable}
                setSnackbarOpen={this.setSnackbarOpen}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )
    }

    if (allGroups[childId].children.length > 0) {
      allGroups[childId].children.map(id => {
        return this.recursionGroupChild(id, arr, index + 1)
      })
    }

    return arr
  }

  getBricksStateUpdated = categoryName => {
    const { getBricks, study, studyModel } = this.props

    getBricks({
      category: categoryName,
      site: study.site.id,
      animal_specie:
        studyModel && studyModel.animalsSpecie ? studyModel.animalsSpecie.vm_species : ''
    })
  }

  render() {
    const { studyModel, allGroups, bricks } = this.props
    const { isSnackbarOpen, groupParentString, expanded } = this.state

    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {this.props.part.editable && this.props.study.editable && (
          <ConfirmButton
            variant="extended"
            aria-label="Remove"
            popUpText="Are you sure you want to delete this study model ?"
            onClick={() => {
              this.props.selectStudy_modelsChild()
              this.props.updateParts({
                study_models: this.props.part.study_models.filter(
                  sm => sm !== this.props.studyModel.id
                )
              })
              this.props.deleteStudy_models({
                studyId: this.props.study.id,
                partId: this.props.part.id,
                id: this.props.studyModel.id
              })
            }}
          >
            <RemoveIcon />
          </ConfirmButton>
        )}
        <ModelTypeSelect
          disabled={!this.props.part.editable || !this.props.study.editable}
          instance={{ object: this.props.studyModel }}
          id="study_model_type"
          label="Model Type"
          field="model_type"
          onChange={(_, value) =>
            this.props.setStudy_modelsModel_type(this.props.studyModel, value)
          }
        />
        <ModelNameSelect
          disabled={!this.props.part.editable || !this.props.study.editable}
          instance={{ object: this.props.studyModel }}
          id="study_study_name"
          label="Model Name"
          field="modelName"
          onChange={(_, value) => this.props.setStudy_modelsModelName(this.props.studyModel, value)}
        />
        <div className="study-model__expansion-panel-wrapper">
          <ExpansionPanel
            expanded={expanded === 2}
            onChange={() => (expanded === 2 ? this.updateExpanded(-1) : this.updateExpanded(2))}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h2 style={{ margin: 0 }}>
                <FormattedMessage id="Animal Settings" />
              </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <AnimalSettings disabled={!this.props.part.editable || !this.props.study.editable} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === 3}
            onChange={() => (expanded === 3 ? this.updateExpanded(-1) : this.updateExpanded(3))}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h2 style={{ margin: 0 }}>
                <FormattedMessage id="Group Pre Randomisation" />
              </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <GroupsSettings
                updateExpanded={() => this.updateExpanded(-1)}
                setSnackbarOpen={this.setSnackbarOpen}
                disabled={!this.props.studyModel.animalsSpecie || !this.props.study.editable}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {this.recursionGroupChild(studyModel.initial_group)}
          <ExpansionPanel
            disabled={!this.props.studyModel.animalsProvider}
            expanded={expanded === 4}
            onChange={() => {
              this.getBricksStateUpdated('BIOLUMINESCENCE')
              expanded === 4 ? this.updateExpanded(-1) : this.updateExpanded(4)
            }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h2 style={{ margin: 0 }}>
                <FormattedMessage id="Imaging" />
              </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <ModelImaging
                brickParams={this.props.brickParams}
                getBrickParams={this.props.getBrickParams}
                study={this.props.study}
                bricks={bricks}
                studyModel={this.props.studyModel}
                disabled={!this.props.part.editable || !this.props.study.editable}
                allGroups={allGroups}
                getBrickId={this.props.getBrickId}
                {...this.props}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            disabled={!this.props.studyModel.animalsProvider}
            expanded={expanded === 5}
            onChange={() => {
              this.getBricksStateUpdated('PRELEVEMENT')
              expanded === 5 ? this.updateExpanded(-1) : this.updateExpanded(5)
            }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h2 style={{ margin: 0 }}>
                <FormattedMessage id="Sample" />
              </h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <ModelSample
                brickParams={this.props.brickParams}
                study={this.props.study}
                studyModel={this.props.studyModel}
                disabled={!this.props.part.editable || !this.props.study.editable}
                allGroups={allGroups}
                {...this.props}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === 1}
            onChange={() => (expanded === 1 ? this.updateExpanded(-1) : this.updateExpanded(1))}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {/*{this.displayLocker(study.status === 'Created')}*/}
              <h2 style={{ margin: 0 }}>Custom & Subcontracting</h2>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
              <StudyCustomSubcontracting
                studyModel={this.props.studyModel}
                disabled={!this.props.part.editable || !this.props.study.editable}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Snackbar
            className="snack-bar__error"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={isSnackbarOpen}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={
              <span id="message-id" className="snack-bar__content">
                <Error />
                <span>
                  The total number of animals of the children in the {groupParentString} is greater
                  than the number of animals in the parent group
                </span>
              </span>
            }
          />
        </div>
      </Typography>
    )
  }
}

export default StudyModel
