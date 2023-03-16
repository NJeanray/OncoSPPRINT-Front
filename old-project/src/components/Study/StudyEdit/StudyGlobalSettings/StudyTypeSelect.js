import { connect } from 'react-redux'

import actions from '../../../../actions'
// import SmallSpinner from 'components/SmallSpinner'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { FormattedMessage } from 'react-intl'
// import { sortBy } from 'lodash'
import MenuItem from '@material-ui/core/MenuItem'
import React, { Component } from 'react'

class StudyTypeSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studyType: this.props.value
    }
  }

  componentDidMount() {
    this.props.getStudyType()
  }

  setStudyType = value => {
    const { onChange, instance } = this.props

    this.setState({ studyType: value })
    onChange(instance.object.id, value)
  }

  render() {
    const { studyType } = this.state
    const { options, disabled } = this.props

    return (
      <div style={{ width: '300px' }}>
        <InputLabel style={{ fontSize: '12px' }} htmlFor="study-type" required>
          <FormattedMessage id="Study Type" />
        </InputLabel>
        <Select
          disabled={disabled}
          style={{ width: '100%' }}
          renderValue={studyType => (studyType ? studyType.name : '')}
          value={studyType}
          onChange={e => this.setStudyType(e.target.value)}
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
    options: state.studyType.objects || [],
    optionsLoading: state.studyType.loading
  }),
  actions
)(StudyTypeSelect)
