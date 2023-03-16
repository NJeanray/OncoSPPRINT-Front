import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
// import InputText from 'components/Form'
import InputText, { checkPositiveNumber } from 'app/components/Form'

import actions from '../../../../../../actions'
import AnimalSpecieSelect from './AnimalSpecieSelect'
import AnimalProviderSelect from './AnimalProviderSelect'
import AnimalGeoAreaSelect from './AnimalGeoAreaSelect'
import AnimalResumeTable from './AnimalResumeTable'

const isAnimalProviderIncludeNude = animalProvider => animalProvider.toLowerCase().includes('nude')

class AnimalSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      irradiation: props.studyModel.animalsIrradiation,
      shaving: props.studyModel.animalsShaving
    }
  }

  handleOnChangeIrradiation = value => {
    this.props.setStudy_modelsAnimalsIrradiation(this.props.studyModel, value)
    this.setState({ irradiation: value })
  }

  handleOnChangeShaving = value => {
    this.props.setStudy_modelsAnimalsShaving(this.props.studyModel, value)
    this.setState({ shaving: value })
  }

  componentDidUpdate(prevProps) {
    const { studyModel, setStudy_modelsAnimalsShaving } = this.props

    if (
      prevProps.studyModel.id !== studyModel.id ||
      prevProps.studyModel.animalsIrradiation !== studyModel.animalsIrradiation
    )
      this.setState({ irradiation: studyModel.animalsIrradiation })
    if (
      prevProps.studyModel.id !== studyModel.id ||
      prevProps.studyModel.animalsShaving !== studyModel.animalsShaving
    )
      this.setState({ shaving: studyModel.animalsShaving })
    if (
      prevProps.studyModel.animalsProvider !== studyModel.animalsProvider &&
      studyModel.animalsProvider
    )
      setStudy_modelsAnimalsShaving(
        studyModel,
        !isAnimalProviderIncludeNude(studyModel.animalsProvider.libelle_article)
      )
  }

  render() {
    const { irradiation, shaving } = this.state
    const {
      disabled,
      studyModel,
      setStudy_modelsAnimalsSpecie,
      study,
      animalProvider,
      setStudy_modelsAnimalsProvider,
      getAnimalGeoFirst,
      getAnimalGeoSecond,
      setStudy_modelsAnimalsGeoArea,
      getStudyType,
      setStudy_modelsAnimalsIrradiationDose
    } = this.props

    return (
      <Fragment>
        <AnimalSpecieSelect
          disabled={disabled}
          instance={{ object: studyModel }}
          id="study_animal_specie"
          label="Animal Specie"
          field="animalsSpecie"
          onChange={(_, value) => setStudy_modelsAnimalsSpecie(studyModel, value)}
        />
        <AnimalProviderSelect
          study={study}
          disabled={(study.editable && _.isEmpty(animalProvider.objects)) || disabled}
          instance={{ object: studyModel }}
          id="study_animal_provider"
          label="Animal Provider"
          field="animalsProvider"
          onChange={(_, value) => {
            setStudy_modelsAnimalsProvider(studyModel, {
              ...value,
              irradiation_dose: value.irradiation_dose ? value.irradiation_dose : 0
            })
            getAnimalGeoFirst({ animalProvider: value.libelle_fournisseur_principal })
            getAnimalGeoSecond({ animalProvider: value.libelle_fournisseur_principal })
          }}
        />
        <AnimalGeoAreaSelect
          studyModel={studyModel}
          disabled={(study.editable && !studyModel.animalsProvider) || disabled}
          instance={{ object: studyModel }}
          id="study_animal_provider"
          label="Animal Geo Area"
          field="animalsGeoArea"
          setStudy_modelsAnimalsGeoArea={setStudy_modelsAnimalsGeoArea}
          getStudyType={getStudyType}
          getAnimalGeoFirst={getAnimalGeoFirst}
          getAnimalGeoSecond={getAnimalGeoSecond}
        />
        <div style={{ width: '100%' }}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={disabled}
                onChange={event => this.handleOnChangeShaving(event.target.checked)}
                checked={shaving}
                color="default"
                value="shaving"
              />
            }
            label="Shaving"
            labelPlacement="end"
          />
          <FormControlLabel
            control={
              <Checkbox
                disabled={disabled}
                onChange={event => this.handleOnChangeIrradiation(event.target.checked)}
                checked={irradiation}
                color="default"
                value="irradiation"
              />
            }
            label="Irradiation"
            labelPlacement="end"
          />
        </div>
        {irradiation && (
          <InputText
            label="Irradiation Dose (bq)"
            value={studyModel.animalsIrradiationDose}
            errors={null}
            validators={[checkPositiveNumber]}
            onChange={e => {
              if (Number(e) > 0) setStudy_modelsAnimalsIrradiationDose(studyModel, e)
            }}
            margin="normal"
            type="number"
            required
          />
        )}
        {studyModel.animalsProvider && (
          <AnimalResumeTable animalsProvider={studyModel.animalsProvider} />
        )}
      </Fragment>
    )
  }
}

const mapper = state => {
  const part = state.parts.currentChild ? state.parts.objects[state.parts.currentChild] : null

  return {
    study: state.study.object,
    studyModel: state.study_models.currentChild
      ? state.study_models.objects[state.study_models.currentChild]
      : null,
    study_models: part.study_models.map(modelId => state.study_models.objects[modelId]),
    animalProvider: state.animalProvider
  }
}

export default connect(mapper, actions)(AnimalSettings)
