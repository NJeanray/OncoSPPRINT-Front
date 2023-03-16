import { connect } from 'react-redux'

import actions from '../../../../../../actions'
import SmallSpinner from 'app/components/SmallSpinner'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import MenuItem from '@material-ui/core/MenuItem'
import React, { Component } from 'react'

class AnimalGeoArea extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studyType: this.props.value
    }
  }

  componentDidMount() {
    this.props.getStudyType()
    const { studyModel } = this.props

    if (!_.isEmpty(studyModel.animalsProvider)) {
      this.props.getAnimalGeoFirst({
        animalProvider: this.props.studyModel.animalsProvider.libelle_fournisseur_principal
      })
      this.props.getAnimalGeoSecond({
        animalProvider: this.props.studyModel.animalsProvider.libelle_fournisseur_principal
      })
    }
  }

  setStudyType = value => {
    const { onChange, instance } = this.props

    this.setState({ studyType: value })
    onChange(instance.object.id, value)
  }

  render() {
    const { disabled, animalGeoFirst, animalGeoSecond } = this.props
    const { animalsGeoArea } = this.props.studyModel

    const animalsGeoOptions = [...animalGeoFirst.objects, ...animalGeoSecond.objects].reduce(
      (acc, item) => {
        const value = Object.values(item)[0].trim()
        if (!_.isEmpty(value) && !acc.includes(value)) acc.push(value)
        return acc
      },
      []
    )

    return (
      <div style={{ width: '300px' }}>
        <InputLabel style={{ fontSize: '12px' }} htmlFor="study-type" required>
          <FormattedMessage id="Animal Geo Area" />
        </InputLabel>
        <Select
          disabled={disabled}
          style={{ width: '100%' }}
          value={animalsGeoArea}
          onChange={e =>
            this.props.setStudy_modelsAnimalsGeoArea(this.props.studyModel, e.target.value)
          }
        >
          {animalGeoFirst.loading || animalGeoSecond.loading ? (
            <SmallSpinner />
          ) : (
            animalsGeoOptions &&
            animalsGeoOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          )}
        </Select>
      </div>
    )
  }
}
export default connect(
  state => ({
    options: state.studyType.objects || [],
    optionsLoading: state.studyType.loading,
    animalGeoFirst: state.animalGeoFirst,
    animalGeoSecond: state.animalGeoSecond
  }),
  actions
)(AnimalGeoArea)
