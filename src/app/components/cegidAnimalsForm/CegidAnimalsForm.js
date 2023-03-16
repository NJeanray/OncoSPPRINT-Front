import React, { useState, useEffect, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import { fromJS } from 'immutable'
import Grid from '@material-ui/core/Grid'

import { PartAnimalsDataContext } from 'app/contexts/PartAnimalsDataProvider'
import { cegidAnimalsEndpoint } from 'app/api/endpoints'
import TextSubtitle from 'app/components/textSubtitle'
import Select from 'app/components/select'
import { initializeAnimalsData } from 'app/components/partForm/PartForm.utils'
import TextField from 'app/components/textField'
import RadioGroupField from 'app/components/radioGroupField'
import TextError from 'app/components/textError'
import ClearField from './ClearField'
import checkAnimalsEmptyOptions from './CegidAnimalsForm.utils'

const CegidAnimalsForm = ({
  setIsInitialized,
  isInitialized,
  partSelected,
  defaultModel,
  inoculationMethods,
  isPartHealthy,
  cegidAnimals,
  animalSpecies,
  fetchEntities,
  cegidAnimalStrains,
  cegidAnimalProviders,
  cegidAnimalOriginAreas,
  cegidAnimalSexes,
  cegidAnimalAges,
  cegidAnimalWeights
}) => {
  const { animalsData, setAnimalsData, isFormDisabled, action } = React.useContext(
    PartAnimalsDataContext
  )
  const [animalWeightAgeRadio, setAnimalWeightAgeRadio] = useState('age')
  const [cegidRequestParams, setCegidRequestParams] = useState({})
  const animalsPerCageMaxValue = () =>
    animalsData && animalsData.get('animalSpecie') === 'rat' ? 3 : 10

  const requestCegidAnimals = useCallback(
    params => {
      fetchEntities('cegidAnimals', {
        endpoint: cegidAnimalsEndpoint(),
        params
      })
    },
    [fetchEntities]
  )

  useEffect(() => {
    if (action === 'view') requestCegidAnimals({})
    else requestCegidAnimals({ active: true })
  }, [action, requestCegidAnimals])

  useEffect(() => {
    if (!isEmpty(cegidRequestParams) && action !== 'view')
      requestCegidAnimals({ active: true, ...cegidRequestParams })
    // eslint-disable-next-line
  }, [cegidRequestParams, requestCegidAnimals])

  useEffect(() => {
    if (partSelected && isInitialized) {
      setCegidRequestParams({
        code_animaux_espece:
          partSelected.get('animal_species').toLowerCase() === 'souris' ? 'SOU' : 'RAT',
        vm_strain: partSelected.get('animal_strain'),
        libelle_fournisseur_principal: partSelected.get('animal_provider'),
        lieu_elevage_1_choix: partSelected.get('animal_origin_zone'),
        animaux_sexe_libelle: partSelected.get('animal_sex')
      })

      if (partSelected.has('animal_age')) setAnimalWeightAgeRadio('age')
      else setAnimalWeightAgeRadio('weight')
      setIsInitialized(false)
    }
  }, [setIsInitialized, partSelected, isInitialized])

  function onSelectAnimalSpecie(animalSpecieSelected) {
    setCegidRequestParams({
      code_animaux_espece: animalSpecieSelected.toLowerCase() === 'souris' ? 'SOU' : 'RAT'
    })
    setAnimalsData(
      fromJS({
        ...initializeAnimalsData,
        animalSpecie: animalSpecieSelected,
        animalsPerCage: animalSpecieSelected.toLowerCase() === 'rat' ? 3 : 10
      })
    )
  }

  function onSelectAnimalStrain(animalStrainSelected) {
    const cegidAnimalsFiltered = cegidAnimals
      .valueSeq()
      .toJS()
      .filter(item => item.vm_strain === animalStrainSelected)

    if (!isEmpty(cegidAnimalsFiltered)) {
      const irradiationDose = cegidAnimalsFiltered[0].vm_irradiation_dose

      if (irradiationDose)
        setAnimalsData(
          animalsData
            .set('animalStrain', animalStrainSelected)
            .set('isAnimalIrradiated', !isPartHealthy)
            .set('irradiationDose', isPartHealthy ? null : irradiationDose)
            .set('animalId', null)
        )
      else
        setAnimalsData(
          animalsData
            .set('animalStrain', animalStrainSelected)
            .set('isAnimalIrradiated', false)
            .set('irradiationDose', null)
            .set('animalId', null)
        )
    }
  }

  function setAnimalIdWeightAge(field, value, animalsDataField) {
    const cegidAnimalsFiltered = cegidAnimals
      .valueSeq()
      .toJS()
      .filter(item => item[field] === value)

    setAnimalsData(
      animalsData.set('animalId', cegidAnimalsFiltered[0].id).set(animalsDataField, value)
    )
  }

  const checkCegidAnimalsOptionsError = () =>
    checkAnimalsEmptyOptions(animalsData, cegidAnimalOriginAreas, cegidAnimalSexes)

  return (
    <>
      <Grid item xs={12}>
        <TextSubtitle text={<FormattedMessage id="global.animals" />} />
      </Grid>
      {checkCegidAnimalsOptionsError() && (
        <TextError text={<FormattedMessage id="partForm.cegidAnimalsError" />} />
      )}
      <Grid item xs={6}>
        <Select
          disabled={isFormDisabled}
          value={animalsData.get('animalSpecie')}
          label="partForm.input.animalSpecies"
          onChange={e => onSelectAnimalSpecie(e.target.value)}
          options={animalSpecies}
          highlightedOptionsObj={defaultModel}
          highlightedKey="animalSpecie"
        />
      </Grid>
      {animalsData.get('animalSpecie') && (
        <Grid item xs={6}>
          <div className="grid-animals-select__wrapper">
            <Select
              disabled={isFormDisabled}
              value={animalsData.get('animalStrain')}
              label="partForm.input.animalStrain"
              onChange={e => {
                setCegidRequestParams({
                  ...cegidRequestParams,
                  vm_strain: e.target.value
                })
                onSelectAnimalStrain(e.target.value)
              }}
              options={cegidAnimalStrains}
              highlightedOptionsObj={defaultModel}
              highlightedKey="animalStrain"
            />
            <ClearField
              cegidRequestParams={cegidRequestParams}
              setCegidRequestParams={setCegidRequestParams}
              requestFieldParams={['code_animaux_espece']}
              field="animalStrain"
            />
          </div>
        </Grid>
      )}
      {animalsData.get('animalStrain') && (
        <Grid item xs={6}>
          <div className="grid-animals-select__wrapper">
            <Select
              disabled={isFormDisabled}
              value={animalsData.get('animalProvider')}
              label="partForm.input.animalProvider"
              onChange={e => {
                setAnimalsData(animalsData.set('animalProvider', e.target.value))
                setCegidRequestParams({
                  ...cegidRequestParams,
                  libelle_fournisseur_principal: e.target.value
                })
              }}
              options={cegidAnimalProviders}
            />
            <ClearField
              cegidRequestParams={cegidRequestParams}
              setCegidRequestParams={setCegidRequestParams}
              requestFieldParams={['code_animaux_espece', 'vm_strain']}
              field="animalProvider"
            />
          </div>
        </Grid>
      )}
      {animalsData.get('animalProvider') && (
        <Grid item xs={6}>
          <div className="grid-animals-select__wrapper">
            <Select
              disabled={isFormDisabled}
              value={animalsData.get('animalOriginArea')}
              label="partForm.input.animalOriginArea"
              onChange={e => {
                setAnimalsData(animalsData.set('animalOriginArea', e.target.value))
                setCegidRequestParams({
                  ...cegidRequestParams,
                  lieu_elevage_1_choix: e.target.value
                })
              }}
              options={cegidAnimalOriginAreas}
            />
            <ClearField
              cegidRequestParams={cegidRequestParams}
              setCegidRequestParams={setCegidRequestParams}
              requestFieldParams={[
                'code_animaux_espece',
                'vm_strain',
                'libelle_fournisseur_principal'
              ]}
              field="animalOriginArea"
            />
          </div>
        </Grid>
      )}
      {animalsData.get('animalOriginArea') && (
        <>
          <Grid item xs={6}>
            <div className="grid-animals-select__wrapper">
              <Select
                disabled={isFormDisabled}
                value={animalsData.get('animalSex')}
                label="partForm.input.animalSex"
                onChange={e => {
                  setAnimalsData(animalsData.set('animalSex', e.target.value))
                  setCegidRequestParams({
                    ...cegidRequestParams,
                    animaux_sexe_libelle: e.target.value
                  })
                }}
                options={cegidAnimalSexes}
                highlightedOptionsObj={defaultModel}
                highlightedKey="animalSex"
              />
              <ClearField
                cegidRequestParams={cegidRequestParams}
                setCegidRequestParams={setCegidRequestParams}
                requestFieldParams={[
                  'code_animaux_espece',
                  'vm_strain',
                  'libelle_fournisseur_principal',
                  'lieu_elevage_1_choix'
                ]}
                field="animalSex"
              />
            </div>
          </Grid>
        </>
      )}
      {animalsData.get('animalSex') && (
        <Grid container xs={12}>
          <Grid item xs={6}>
            <div className="radio-group__wrapper">
              <RadioGroupField
                formDisabled={isFormDisabled}
                value={animalWeightAgeRadio === 'age'}
                labelRadioLeft="partForm.input.animalAge"
                labelRadioRight="partForm.input.animalWeight"
                setValue={value => setAnimalWeightAgeRadio(!value ? 'weight' : 'age')}
                label=""
                direction="row"
                content="space-between"
              />
            </div>
          </Grid>
          {animalWeightAgeRadio === 'age' ? (
            <Grid item xs={6}>
              <div className="grid-animals-select__wrapper">
                <Select
                  disabled={isFormDisabled}
                  value={animalsData.get('animalAge')}
                  label="partForm.input.animalAge"
                  onChange={e =>
                    setAnimalIdWeightAge('animaux_age_libelle', e.target.value, 'animalAge')
                  }
                  options={cegidAnimalAges}
                  highlightedOptionsObj={defaultModel}
                  highlightedKey="animalAge"
                />
                <ClearField
                  cegidRequestParams={cegidRequestParams}
                  setCegidRequestParams={setCegidRequestParams}
                  requestFieldParams={[
                    'code_animaux_espece',
                    'vm_strain',
                    'libelle_fournisseur_principal',
                    'lieu_elevage_1_choix',
                    'animaux_sexe_libelle'
                  ]}
                  field="animalAge"
                />
              </div>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <div className="grid-animals-select__wrapper">
                <Select
                  disabled={isFormDisabled}
                  value={animalsData.get('animalWeight')}
                  label="partForm.input.animalWeight"
                  onChange={e =>
                    setAnimalIdWeightAge('animaux_poids_libelle', e.target.value, 'animalWeight')
                  }
                  options={cegidAnimalWeights}
                />
                <ClearField
                  cegidRequestParams={cegidRequestParams}
                  setCegidRequestParams={setCegidRequestParams}
                  requestFieldParams={[
                    'code_animaux_espece',
                    'vm_strain',
                    'libelle_fournisseur_principal',
                    'lieu_elevage_1_choix',
                    'animaux_sexe_libelle'
                  ]}
                  field="animalWeight"
                />
              </div>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container xs={12}>
        {!isPartHealthy && (
          <Grid item xs={6}>
            <Select
              disabled={isFormDisabled}
              value={animalsData.get('animalInoculationMethod')}
              label="partForm.input.inoculationMethod"
              onChange={e =>
                setAnimalsData(animalsData.set('animalInoculationMethod', e.target.value))
              }
              options={inoculationMethods}
              highlightedOptionsObj={defaultModel}
              highlightedKey="inoculationMethod"
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            disabled={isFormDisabled}
            value={animalsData.get('animalsPerCage')}
            label={<FormattedMessage id="partForm.input.animalsPerCage" />}
            margin="normal"
            onChange={e => setAnimalsData(animalsData.set('animalsPerCage', e.target.value))}
            inputProps={{
              max: animalsPerCageMaxValue(),
              onInput: e => {
                e.target.value =
                  e.target.value <= animalsPerCageMaxValue()
                    ? e.target.value
                    : animalsPerCageMaxValue()
              }
            }}
          />
        </Grid>
      </Grid>
      {animalsData.get('isAnimalIrradiated') !== null && (
        <>
          <Grid item xs={12}>
            <RadioGroupField
              formDisabled={isFormDisabled}
              value={animalsData.get('isAnimalIrradiated') === true}
              setValue={value =>
                setAnimalsData(
                  animalsData.set('isAnimalIrradiated', value).set('irradiationDose', null)
                )
              }
              label={<FormattedMessage id="partForm.input.irradiation" />}
              direction="row"
              content="space-between"
            />
          </Grid>
          {animalsData.get('isAnimalIrradiated') && (
            <Grid item xs={6}>
              <TextField
                disabled={isFormDisabled}
                value={animalsData.get('irradiationDose')}
                label={<FormattedMessage id="partForm.input.irradiationDose" />}
                margin="normal"
                onChange={e => setAnimalsData(animalsData.set('irradiationDose', e.target.value))}
              />
            </Grid>
          )}
        </>
      )}
    </>
  )
}

export default CegidAnimalsForm
