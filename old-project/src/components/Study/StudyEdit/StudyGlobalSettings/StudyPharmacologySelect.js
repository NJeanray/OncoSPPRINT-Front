// import { connect } from 'react-redux'
//
// import actions from '../../../../actions'
// import Select from '../../../Select/Select'
//
// export default connect(
//     state => ({
//         options: state.studyPharmacology.objects,
//         fetcher: 'getStudyPharmacology',
//         optionsLoading: state.studyPharmacology.loading
//     }),
//     actions
// )(Select)

import { connect } from 'react-redux'

import actions from '../../../../actions'
// import SmallSpinner from 'components/SmallSpinner'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { FormattedMessage } from 'react-intl'
// import { sortBy } from 'lodash'
import MenuItem from '@material-ui/core/MenuItem'
import React, { Component } from 'react'

class StudyPharmacologySelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studyPharmacology: this.props.value
    }
  }

  componentDidMount() {
    this.props.getStudyPharmacology()
  }

  setStudyPharmacology = value => {
    const { onChange, instance } = this.props

    this.setState({ studyPharmacology: value })
    onChange(instance.object.id, value)
  }

  render() {
    const { studyPharmacology } = this.state
    const { options, disabled } = this.props

    return (
      <div style={{ width: '300px' }}>
        <InputLabel style={{ fontSize: '12px' }} htmlFor="study-type" required>
          <FormattedMessage id="Study Pharmacology" />
        </InputLabel>
        <Select
          disabled={disabled}
          style={{ width: '100%' }}
          renderValue={studyPharmacology => (studyPharmacology ? studyPharmacology.name : '')}
          value={studyPharmacology}
          onChange={e => this.setStudyPharmacology(e.target.value)}
        >
          {options &&
            options.map(option => (
              <MenuItem key={option.id} disabled={option.id === 2} value={option}>
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </div>
    )
  }
}
export default connect(
  state => ({
    options: state.studyPharmacology.objects || [],
    optionsLoading: state.studyPharmacology.loading
  }),
  actions
)(StudyPharmacologySelect)
