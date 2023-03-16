import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import actions from '../../../../actions'

import StudyNatureSelect from './StudyNatureSelect'
import StudyPharmacologySelect from './StudyPharmacologySelect'
import StudyTypeSelect from './StudyTypeSelect'
import Select from '@material-ui/core/Select'
import { FormattedMessage } from 'react-intl'
import InputLabel from '@material-ui/core/InputLabel'

const studySettingsOptions = [
  {
    id: 1,
    name: 'STANDARD',
    placeholder: 'Standard Study'
  },
  {
    id: 2,
    name: 'FULL',
    placeholder: 'Elaborated Study'
  }
  // {
  //   id: 3,
  //   name: 'BOTH',
  //   placeholder: 'Standard Study and Elaborated Study'
  // }
]

class StudyGlobalSettings extends Component {
  state = {
    studySettings: ''
  }
  //
  // setStudySettings = value => {
  //   this.setState({ studySettings: value })
  // }

  render() {
    return (
      <Fragment>
        <div className="select-wrapper">
          <InputLabel style={{ fontSize: '12px' }} htmlFor="study-settings" required>
            <FormattedMessage id="Study Settings" />
          </InputLabel>
          <Select
            disabled={this.props.disabled}
            style={{ width: '300px', display: 'flex' }}
            // renderValue={this.props.study.object.study_kind ? this.props.study.object.study_kind : ''}
            value={this.props.study.object.study_kind ? this.props.study.object.study_kind : ''}
            onChange={e => {
              this.props.setStudyStudy_kind(this.props.study.object.id, e.target.value)
            }}
          >
            {studySettingsOptions.map(study => (
              <MenuItem key={study.id} value={study.name}>
                {study.placeholder}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="select-wrapper">
          <StudyTypeSelect
            disabled={this.props.disabled}
            instance={this.props.study}
            value={this.props.study.object.type}
            id="study_study_type"
            label="Study Type"
            field="type"
            onChange={this.props.setStudyType}
          />
        </div>
        <div className="select-wrapper">
          <StudyNatureSelect
            disabled={this.props.disabled}
            instance={this.props.study}
            value={this.props.study.object.nature}
            id="study_study_nature"
            label="Study Nature"
            field="nature"
            onChange={this.props.setStudyNature}
          />
        </div>
        <div className="select-wrapper">
          <StudyPharmacologySelect
            disabled={this.props.disabled}
            instance={this.props.study}
            value={this.props.study.object.pharmacology}
            id="study_study_pharmaco"
            label="Study Pharmacology"
            field="pharmacology"
            onChange={this.props.setStudyPharmacology}
          />
        </div>
        <FormControlLabel
          disabled={true}
          value="start"
          control={<Checkbox value="checkedD" color="default" />}
          label="Model Humanized"
          labelPlacement="end"
          onChange={() => {}}
        />
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    study: state.study,
    studyNature: state.studyNature,
    studyType: state.studyType
  }),
  actions
)(StudyGlobalSettings)
