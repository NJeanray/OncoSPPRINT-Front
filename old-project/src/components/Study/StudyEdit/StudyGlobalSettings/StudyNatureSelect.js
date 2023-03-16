// import { connect } from 'react-redux'
//
// import actions from '../../../../actions'
// import Select from '../../../Select/Select'
//
// export default connect(
//     state => ({
//         options: state.studyNature.objects,
//         fetcher: 'getStudyNature',
//         optionsLoading: state.studyNature.loading
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

class StudyNatureSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studyNature: this.props.value
    }
  }

  componentDidMount() {
    this.props.getStudyNature()
  }

  setStudyType = value => {
    const { onChange, instance } = this.props

    this.setState({ studyNature: value })
    onChange(instance.object.id, value)
  }

  render() {
    const { studyNature } = this.state
    const { options, disabled } = this.props

    return (
      <div style={{ width: '300px' }}>
        <InputLabel style={{ fontSize: '12px' }} htmlFor="study-nature" required>
          <FormattedMessage id="Study Nature" />
        </InputLabel>
        <Select
          disabled={disabled}
          style={{ width: '100%' }}
          renderValue={studyNature => (studyNature ? studyNature.name : '')}
          value={studyNature}
          // onChange={e => this.props.onChange(this.props.instance.object.id, e.target.value)}
          onChange={e => this.setStudyType(e.target.value)}
        >
          {options &&
            options.map(option => (
              <MenuItem key={option.id} disabled={option.id === 1} value={option}>
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
    options: state.studyNature.objects || [],
    optionsLoading: state.studyNature.loading
  }),
  actions
)(StudyNatureSelect)
