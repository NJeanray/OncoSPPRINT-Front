import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import {
  ethicalProtocolsEndpoint,
  modelsDefaultValuesEndpoint,
  modelsEndpoint,
  cegidAnimalsEndpoint
} from 'app/api/endpoints'
import MuiAlert from '@material-ui/lab/Alert'
import RadioGroupField from 'app/components/radioGroupField'
import TextSubtitle from 'app/components/textSubtitle'
import displayFormErrors from 'app/utils/displayFormErrors'
import setChoiceFieldsOptions from 'app/utils/setChoiceFieldsOptions'
import { isEmpty, isEqual, sortBy } from 'lodash'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import CustomSpinner from 'app/components/customSpinner'
import Select from '../select'
import TextField from '../textField'
import PartFormWrapper from './PartForm.styled'
import { getErrorFieldName } from './PartForm.utils'
import PartFormButtons from './PartFormButtons'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'

function Alert({ onClose, ...rest }) {
  return <MuiAlert onClose={() => onClose()} elevation={4} variant="filled" {...rest} />
}

const PartForm = ({
  cegidAnimals,
  getCegidAnimals,
  modelsFiltered,
  getModelsFiltered,
  getModelDefaultValues,
  modelDefaultValues,
  getModels,
  models,
  handleCreatePart,
  action,
  studyChoiceFields,
  parts,
  partData,
  handleDeletePart,
  handleUpdatePart,
  resetStateErrors,
  getEthicalProtocols,
  ethicalProtocols
}) => {
  const initializeState = field => {
    const partUnit = parts && parts.get('data') ? parts.get('data').size + 1 : null

    if (partUnit) {
      switch (field) {
        case 'name':
          return action === 'create' ? `PART ${partUnit.toString()}` : partData.get(field)
        case 'age':
          if (action === 'create') return 'age'
          else {
            if (partData.get('animal_weight')) return 'weight'
            return 'age'
          }
        case 'starting_date': {
          const currentDate = new Date()
          let month = (currentDate.getMonth() + 1).toString()
          let day = currentDate.getDate().toString()
          const year = currentDate.getFullYear().toString()

          if (month.length < 2) month = `0${month}`
          if (day.length < 2) day = `0${day}`
          return action === 'create' ? `${year}-${month}-${day}` : partData.get(field)
        }
        case 'humanization':
          return action === 'create' ? false : partData.get(field)
        case 'animal_irradiation':
          return action === 'create' ? false : partData.get(field)
        default:
          return action === 'create' ? null : partData.get(field)
      }
    }
  }

  const getEthicalProtocolsRequest = React.useCallback(
    () =>
      getEthicalProtocols('ethicalProtocols', {
        endpoint: ethicalProtocolsEndpoint()
      }),
    [getEthicalProtocols]
  )
  const [partTitle, setPartTitle] = React.useState(initializeState('title'))
  const [formDisabled, setFormDisabled] = React.useState(action !== 'create')
  const [buttonAction, setButtonAction] = React.useState(action)
  const [tumorLineOptions, setTumorLineOptions] = React.useState([])
  const [ethicalProtocolsOptions, setEthicalProtocolsOptions] = React.useState([])
  const [name, setName] = React.useState(initializeState('name'))
  const [site, setSite] = React.useState(initializeState('site'))
  const [partType, setPartType] = React.useState(initializeState('type'))
  const [d0Date, setD0Date] = React.useState(initializeState('starting_date'))
  const [humanized, setHumanized] = React.useState(initializeState('humanization'))
  const [humanizedNature, setHumanizedNature] = React.useState(initializeState('humanization_type'))
  const [tumorLine, setTumorLine] = React.useState(initializeState('tumor_line'))
  const [animalType, setAnimalType] = React.useState(initializeState('animal'))
  const [animalOriginArea, setAnimalOriginArea] = React.useState(
    initializeState('animal_origin_zone')
  )
  const [animalInoculationMethod, setAnimalInoculationMethod] = React.useState(
    initializeState('inoculation_method')
  )
  const [animalId, setAnimalId] = React.useState(initializeState('animal_id'))
  const [animalStrain, setAnimalStrain] = React.useState(initializeState('animal_strain'))
  const [animalSpecies, setAnimalSpecies] = React.useState(initializeState('animal_species'))
  const [animalProvider, setAnimalProvider] = React.useState(initializeState('animal_provider'))
  const [animalAge, setAnimalAge] = React.useState(initializeState('animal_age'))
  const [animalWeightAgeRadio, setAnimalWeightAgeRadio] = React.useState(initializeState('age'))
  const [animalWeight, setAnimalWeight] = React.useState(initializeState('animal_weight'))
  const [animalSex, setAnimalSex] = React.useState(initializeState('animal_sex'))
  const [animalsPerCage, setAnimalsPerCage] = React.useState(initializeState('animal_per_cage'))
  const [ethicalProtocol, setEthicalProtocol] = React.useState(
    initializeState('ethical_protocol_number')
  )
  const [isTumorLineCreated, setIsTumorLineCreated] = React.useState(false)
  const [inductedMaterialType, setInductedMaterialType] = React.useState(
    initializeState('inducted_material_type')
  )
  const [isMatrigelUse, setIsMatrigelUse] = React.useState(false)
  const modelsData = models && models.get('data')
  const [irradiation, setIrradiation] = React.useState(initializeState('animal_irradiation'))
  const [irradiationDose, setIrradiationDose] = React.useState(initializeState('irradiation_dose'))
  const partFormErrors = parts && parts.get('errors') ? parts.get('errors') : null
  const isPartFetching = parts && parts.get('isFetching') ? parts.get('isFetching') : false
  const modelDefaultValuesData = modelDefaultValues && modelDefaultValues.get('data')
  const animalsPerCageMaxValue = () => (animalType === 'rat' ? 3 : 10)
  const ethicalProtocolsData = ethicalProtocols && ethicalProtocols.get('data')
  const getChoiceFieldsOptions = field =>
    studyChoiceFields && studyChoiceFields.get('data')
      ? setChoiceFieldsOptions(studyChoiceFields, field)
      : []
  const [isWarningSnackbarOpen, setIsWarningSnackbarOpen] = React.useState(false)
  const [isPartHealthy, setIsPartHealthy] = React.useState(true)

  function resetStateAnimalsFields() {
    setAnimalType(null)
    setAnimalOriginArea(null)
    setIrradiation(null)
    setIrradiationDose(null)
  }

  function setFormToView() {
    setFormDisabled(true)
    setButtonAction('view')
  }

  const partParamsToSend = () => {
    const payload = {
      site,
      title: partTitle,
      type: partType,
      starting_date: d0Date,
      humanization: humanized,
      humanization_type: humanizedNature,
      tumor_line: tumorLine,
      animal_origin_zone: animalOriginArea,
      animal_per_cage: animalsPerCage,
      ethical_protocol: ethicalProtocol,
      animal_irradiation: irradiation,
      irradiation_dose: irradiationDose,
      inoculation_method: animalInoculationMethod,
      matrigel: isMatrigelUse,
      animal_id: animalId
    }
    if (inductedMaterialType) payload.inducted_material_type = inductedMaterialType

    return payload
  }

  const initializeAnimals = React.useCallback(
    arrayKeys => {
      arrayKeys.map(key => {
        const fieldValue = modelDefaultValues.getIn(['data', key])

        switch (key) {
          case 'animal':
            return setAnimalType(fieldValue)
          case 'animal_per_cage':
            return setAnimalsPerCage(fieldValue)
          case 'animal_irradiation':
            return setIrradiation(fieldValue)
          case 'irradiation_dose':
            return setIrradiationDose(fieldValue)
          default:
            return setEthicalProtocol(fieldValue)
        }
      })
      if (modelDefaultValues.getIn(['data', 'animal']))
        setAnimalsPerCage(modelDefaultValues.getIn(['data', 'animal']) === 'rat' ? 3 : 10)
    },
    [modelDefaultValues]
  )

  React.useEffect(() => {
    const ethicalProtocolsList = ethicalProtocols ? ethicalProtocols.get('data') : null

    if (ethicalProtocolsList && ethicalProtocolsList.size !== 0) {
      const ethicalProtocolsArrayImmutable = ethicalProtocolsList
        .valueSeq()
        .map(ethicalProtocolItem => ({
          id: ethicalProtocolItem.get('id'),
          label: `${ethicalProtocolItem.get('procedure_number')} // ${ethicalProtocolItem.get(
            'experimental_procedure'
          )}`,
          value: ethicalProtocolItem.get('id')
        }))

      setEthicalProtocolsOptions(ethicalProtocolsArrayImmutable.toJS())
    }
  }, [ethicalProtocolsData, ethicalProtocols])

  const requestCegidAnimals = React.useCallback(
    params => {
      getCegidAnimals('cegidAnimals', {
        endpoint: cegidAnimalsEndpoint(),
        params
      })
    },
    [getCegidAnimals]
  )

  React.useEffect(() => {
    if (partData) {
      setPartTitle(partData.get('title'))
      setName(partData.get('name'))
      setSite(partData.get('site'))
      setPartType(partData.get('type'))
      setD0Date(partData.get('starting_date'))
      setHumanized(partData.get('humanization'))
      setHumanizedNature(partData.get('humanization_type'))
      setTumorLine(partData.get('tumor_line'))
      if (partData.has('tumor_line')) setIsPartHealthy(false)
      else setIsPartHealthy(true)
      setAnimalType(partData.get('animal'))
      setAnimalOriginArea(partData.get('animal_origin_zone'))
      setAnimalsPerCage(partData.get('animal_per_cage'))
      setEthicalProtocol(partData.get('ethical_protocol'))
      setIrradiation(partData.get('animal_irradiation'))
      setIrradiationDose(partData.get('irradiation_dose'))
      setAnimalStrain(partData.get('animal_strain'))
      setAnimalSpecies(partData.get('animal_species'))
      setAnimalProvider(partData.get('animal_provider'))
      if (partData.has('animal_weight')) {
        setAnimalWeight(partData.get('animal_weight'))
        setAnimalAge(null)
      } else {
        setAnimalAge(partData.get('animal_age'))
        setAnimalWeight(null)
      }
      setAnimalSex(partData.get('animal_sex'))
      setIsMatrigelUse(partData.get('matrigel') ? true : false)
      requestCegidAnimals({
        code_animaux_espece:
          partData.get('animal_species').toLowerCase() === 'souris' ? 'SOU' : 'RAT',
        vm_strain: partData.get('animal_strain'),
        libelle_fournisseur_principal: partData.get('animal_provider'),
        lieu_elevage_1_choix: partData.get('animal_origin_zone'),
        animaux_sexe_libelle: partData.get('animal_sex')
      })

      setFormToView()
    }
  }, [partData, requestCegidAnimals])

  React.useEffect(() => {
    getModels('models', {
      endpoint: modelsEndpoint()
    })
    getEthicalProtocolsRequest()
  }, [getEthicalProtocolsRequest, getModels])

  React.useEffect(() => {
    const modelDefaultValuesList = modelDefaultValues ? modelDefaultValues.get('data') : null

    if (modelDefaultValuesList && modelDefaultValuesList.size !== 0) {
      const modelDefaultValuesKeys = modelDefaultValuesList.keySeq().toJS()

      initializeAnimals(modelDefaultValuesKeys)
    }
  }, [modelDefaultValuesData, initializeAnimals, modelDefaultValues])

  React.useEffect(() => {
    const modelsList = models ? models.get('data') : null

    if (modelsList && modelsList.size !== 0) {
      const modelOptionsTumorLine = modelsList.valueSeq().reduce((acc, item) => {
        const isTumorLineExists = acc.findIndex(accItem => accItem.label === item.get('tumor_line'))
        const itemToAdd =
          isTumorLineExists !== -1
            ? ''
            : {
                label: item.get('tumor_line'),
                id: item.get('id'),
                matrigel: item.get('matrigel'),
                value: item.get('id'),
                inducted_material_type: item.get('inducted_material_type'),
                inoculation_method: item.get('inoculation_method'),
                host_species: item.get('host_species'),
                host_strain: item.get('host_strain')
              }
        return [...acc, itemToAdd]
      }, [])
      const modelOptionsTumorLineFiltered = sortBy(
        modelOptionsTumorLine.filter(name => name !== ''),
        tumorLineItem => tumorLineItem.label
      )

      if (
        partData &&
        !isEmpty(
          modelOptionsTumorLineFiltered.filter(item => item.label === partData.get('tumor_line'))
        )
      )
        setIsTumorLineCreated(false)
      else if (action !== 'create') setIsTumorLineCreated(true)
      setTumorLineOptions(modelOptionsTumorLineFiltered)
    }
  }, [modelsData, models, partData, action])

  React.useEffect(() => {
    setButtonAction(action)
  }, [action])

  function resetAllAnimalsParams() {
    resetAnimalsParams([
      'animalStrain',
      'animalProvider',
      'animalOriginArea',
      'animalSex',
      'weightAge'
    ])
  }
  function onSelectTumorLine(tumorLineSelected) {
    const tumorLineSeletedData = tumorLineOptions.find(item => item.label === tumorLineSelected)

    resetStateAnimalsFields()
    getModelDefaultValues('modelDefaultValues', {
      endpoint: modelsDefaultValuesEndpoint(tumorLineSelected),
      common: true
    })
    getModelsFiltered('modelsFiltered', {
      endpoint: modelsEndpoint(),
      params: {
        tumor_line: tumorLineSeletedData.label
      }
    })
    setAnimalInoculationMethod(tumorLineSeletedData.inoculation_method)
    setAnimalSpecies(tumorLineSeletedData.host_species)
    setIrradiation(true)
    setAnimalsPerCage(tumorLineSeletedData.host_species === 'rat' ? 3 : 10)
    setIrradiationDose(tumorLineSeletedData.host_species === 'rat' ? 3 : 10)
    requestCegidAnimals({
      code_animaux_espece:
        tumorLineSeletedData.host_species.toLowerCase() === 'souris' ? 'SOU' : 'RAT'
    })
    setTumorLine(tumorLineSelected)
    setIsMatrigelUse(!!tumorLineSeletedData.matrigel)
    if (tumorLineSeletedData['inducted_material_type'] === 'fragment') {
      setIsWarningSnackbarOpen(true)
    }
    resetAllAnimalsParams()
  }

  const handleCreate = () => handleCreatePart(partParamsToSend())

  const handleSaveUpdate = () => {
    const partDataReceivedFields = {
      ...partData.toJS(),
      humanization_type: partData.get('humanization_type')
        ? partData.get('humanization_type')
        : undefined,
      irradiation_dose: partData.get('irradiation_dose')
        ? partData.get('irradiation_dose')
        : undefined,
      animal_origin_zone: partData.get('animal_origin_zone')
        ? partData.get('animal_origin_zone')
        : undefined
    }

    const partDataSentFields = {
      ...partParamsToSend(),
      id: partData.get('id'),
      name: partData.get('name'),
      study_id: partData.get('study_id')
    }
    if (!isEqual(partDataReceivedFields, partDataSentFields)) handleUpdatePart(partParamsToSend())
    else setFormToView()
  }

  React.useEffect(() => {
    if (buttonAction === 'update' && parts && parts.get('updated')) setFormToView()
  }, [parts, buttonAction])

  const getCegidAnimalsFieldOptions = itemToGet => {
    const cegidAnimalsStrainOptions =
      cegidAnimals &&
      cegidAnimals.get('data') &&
      cegidAnimals
        .get('data')
        .valueSeq()
        .reduce((acc, item) => {
          const isAnimalStrainExists = acc.findIndex(
            accItem => accItem.label === item.get(itemToGet)
          )
          const itemToAdd =
            isAnimalStrainExists !== -1
              ? ''
              : {
                  label: item.get(itemToGet),
                  id: item.get('id'),
                  value: item.get(itemToGet)
                }
          return [...acc, itemToAdd]
        }, [])

    const cegidAnimalsStrainOptionsFiltered = cegidAnimalsStrainOptions
      ? sortBy(
          cegidAnimalsStrainOptions.filter(name => name !== ''),
          [animalStraing => animalStraing.label]
        )
      : []
    return cegidAnimalsStrainOptionsFiltered.filter(
      item => item.label !== null && item.label.trim() !== ''
    )
  }

  const isModelSuggestion = (valueToCheck, fieldToCheck) => {
    const modelsFilteredList = modelsFiltered?.get('data')

    if (modelsFilteredList && modelsFilteredList.size !== 0 && fieldToCheck) {
      const isSuggestion = modelsFilteredList
        .valueSeq()
        .toJS()
        .findIndex(item => {
          if (item[fieldToCheck] && typeof item[fieldToCheck] === 'string') {
            return item[fieldToCheck]
              ? item[fieldToCheck].toLowerCase().trim() === valueToCheck.toLowerCase()
              : -1
          } else if (item[fieldToCheck] && typeof item[fieldToCheck] === 'number')
            return item[fieldToCheck].toString().trim() === valueToCheck.toLowerCase()
          return -1
        })

      if (isSuggestion === -1) return valueToCheck
      return (
        <u>
          <b>{valueToCheck}</b>
        </u>
      )
    }
    return valueToCheck
  }

  if (isPartFetching)
    return (
      <PartFormWrapper fetching={true.toString()}>
        <CustomSpinner type="circle" />
      </PartFormWrapper>
    )

  const resetAnimalsParams = itemsToReset => {
    if (itemsToReset.includes('animalStrain')) setAnimalStrain(null)
    if (itemsToReset.includes('animalProvider')) setAnimalProvider(null)
    if (itemsToReset.includes('animalOriginArea')) setAnimalOriginArea(null)
    if (itemsToReset.includes('animalSex')) setAnimalSex(null)
    if (itemsToReset.includes('weightAge')) {
      setAnimalWeight(null)
      setAnimalAge(null)
    }
  }

  const onSelectPartType = partTypeSelected => {
    resetAllAnimalsParams()
    setPartType(partTypeSelected)
    if (partTypeSelected.toLowerCase() === 'pk' || partTypeSelected.toLowerCase() === 'tolérance')
      setIsPartHealthy(true)
    else setIsPartHealthy(false)
  }

  return (
    <PartFormWrapper>
      {partFormErrors && displayFormErrors(partFormErrors, getErrorFieldName)}
      <Grid container>
        <Grid item xs={6}>
          <TextField
            disabled
            value={name || ''}
            label={<FormattedMessage id="partForm.input.name" />}
            margin="normal"
            required
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={formDisabled}
            value={partTitle || ''}
            label={<FormattedMessage id="partForm.input.title" />}
            margin="normal"
            required
            onChange={e => setPartTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={formDisabled}
            label={<FormattedMessage id="partForm.input.site" />}
            value={site}
            onChange={e => setSite(e.target.value)}
          >
            {getChoiceFieldsOptions('sites').map(arr => (
              <MenuItem disabled={arr.label !== 'DIJ'} key={arr.value} value={arr.value}>
                {arr.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={formDisabled}
            required
            label={<FormattedMessage id="partForm.input.type" />}
            value={partType}
            onChange={e => onSelectPartType(e.target.value)}
          >
            {getChoiceFieldsOptions('part_types').map(arr => {
              return (
                <MenuItem key={arr.value} value={arr.value}>
                  {arr.label}
                </MenuItem>
              )
            })}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <RadioGroupField
            formDisabled={formDisabled}
            label={<FormattedMessage id={'partForm.input.isTumorModel'} />}
            labelRadioRight="global.boolean.yes"
            labelRadioLeft="global.boolean.no"
            value={isPartHealthy}
            setValue={value => {
              if (value) {
                setTumorLine(null)
                setInductedMaterialType(null)
              }
              setIsPartHealthy(value)
              resetAllAnimalsParams()
              setAnimalInoculationMethod(null)
            }}
            direction="column"
            align="flex-start"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={formDisabled}
            label={<FormattedMessage id="partForm.input.d0date" />}
            value={d0Date}
            type="date"
            onChange={e => setD0Date(e.target.value)}
          />
        </Grid>
        {/*TODO: display later when we will work on humanization*/}
        {/*<Grid item xs={12}>*/}
        {/*  <RadioGroupField*/}
        {/*    formDisabled={formDisabled}*/}
        {/*    radioDisabled*/}
        {/*    value={humanized}*/}
        {/*    setValue={value => setHumanized(value)}*/}
        {/*    label={<FormattedMessage id="partForm.input.humanized" />}*/}
        {/*    direction="row"*/}
        {/*    content="space-between"*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={6}>*/}
        {/*  <TextField*/}
        {/*    disabled*/}
        {/*    value={humanizedNature}*/}
        {/*    label={<FormattedMessage id="partForm.input.humanizedNature" />}*/}
        {/*    onChange={e => setHumanizedNature(e.target.value)}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={6}>
          <Select
            required
            disabled={formDisabled || isEmpty(ethicalProtocolsOptions)}
            label={<FormattedMessage id="partForm.input.ethicalProtocol" />}
            value={ethicalProtocol || ''}
            onChange={e => setEthicalProtocol(e.target.value)}
          >
            {sortBy(ethicalProtocolsOptions, [item => item.label.toLowerCase()]).map(arr => (
              <MenuItem key={arr.id} value={arr.value}>
                {arr.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {!isPartHealthy && (
          <>
            <Grid item xs={12}>
              <RadioGroupField
                formDisabled={formDisabled}
                label=""
                labelRadioRight="partForm.input.selectTumorLine"
                labelRadioLeft="partForm.input.createTumorLine"
                value={isTumorLineCreated}
                setValue={value => {
                  setTumorLine(null)
                  setInductedMaterialType(null)
                  setIsTumorLineCreated(value)
                  setAnimalInoculationMethod(null)
                  resetAllAnimalsParams()
                }}
                direction="column"
                align="flex-start"
              />
            </Grid>
            {!isTumorLineCreated ? (
              <Grid item xs={6}>
                <Select
                  disabled={formDisabled}
                  required
                  label={<FormattedMessage id="partForm.input.tumorLine" />}
                  value={tumorLine}
                  onChange={e => onSelectTumorLine(e.target.value)}
                >
                  {models && !models.get('isFetching') ? (
                    sortBy(tumorLineOptions, [item => item.label.toLowerCase()]).map(arr => (
                      <MenuItem key={arr.value} value={arr.label}>
                        {arr.label}
                      </MenuItem>
                    ))
                  ) : (
                    <CustomSpinner type="line" />
                  )}
                </Select>
              </Grid>
            ) : (
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <TextField
                    disabled={formDisabled}
                    value={tumorLine}
                    label={<FormattedMessage id="partForm.input.tumorLine" />}
                    margin="normal"
                    onChange={e => setTumorLine(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    disabled={formDisabled}
                    value={inductedMaterialType}
                    label={<FormattedMessage id="partForm.input.inductedMaterialType" />}
                    onChange={e => setInductedMaterialType(e.target.value)}
                  >
                    {['ascites', 'cellules', 'fragment'].map(arr => (
                      <MenuItem key={arr} value={arr}>
                        {arr}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            )}
          </>
        )}
        <Grid item xs={12}>
          {isWarningSnackbarOpen && (
            <Alert severity="warning" onClose={() => setIsWarningSnackbarOpen(false)}>
              <FormattedMessage id="partForm.snackbar.tumorLineSelected" />
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <RadioGroupField
            formDisabled={!tumorLine || formDisabled}
            value={isMatrigelUse}
            setValue={value => setIsMatrigelUse(value)}
            label={<FormattedMessage id="partForm.input.matrigel" />}
            direction="row"
            content="space-between"
          />
        </Grid>
        <Grid item xs={12}>
          <TextSubtitle text="Animaux" />
        </Grid>
        <Grid item xs={6}>
          <Select
            disabled={formDisabled}
            value={animalSpecies}
            label={<FormattedMessage id="partForm.input.animalSpecies" />}
            onChange={e => {
              resetAllAnimalsParams()
              setAnimalSpecies(e.target.value)
              setAnimalsPerCage(e.target.value.toLowerCase() === 'rat' ? 3 : 10)
              requestCegidAnimals({
                code_animaux_espece: e.target.value.toLowerCase() === 'souris' ? 'SOU' : 'RAT'
              })
            }}
          >
            {getChoiceFieldsOptions('animal_species').map(arr => (
              <MenuItem key={arr.value} value={arr.value}>
                {isModelSuggestion(arr.label, 'host_species')}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {animalSpecies && (
          <Grid item xs={6}>
            <div className="grid-animals-select__wrapper">
              <Select
                disabled={formDisabled}
                value={animalStrain}
                label={<FormattedMessage id="partForm.input.animalStrain" />}
                onChange={e => {
                  setAnimalStrain(e.target.value)

                  requestCegidAnimals({
                    code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                    vm_strain: e.target.value.trim()
                  })
                }}
              >
                {getCegidAnimalsFieldOptions('vm_strain').map(arr => (
                  <MenuItem key={arr.id} value={arr.value}>
                    {isModelSuggestion(arr.label, 'host_strain')}
                  </MenuItem>
                ))}
              </Select>
              <IconButton disabled={formDisabled} size="small" style={{ padding: '15px' }}>
                <ClearIcon
                  onClick={() => {
                    requestCegidAnimals({
                      code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT'
                    })
                    resetAnimalsParams([
                      'animalStrain',
                      'animalProvider',
                      'animalOriginArea',
                      'animalSex',
                      'weightAge'
                    ])
                  }}
                />
              </IconButton>
            </div>
          </Grid>
        )}
        {animalStrain && (
          <Grid item xs={6}>
            <div className="grid-animals-select__wrapper">
              <Select
                disabled={formDisabled}
                value={animalProvider}
                label={<FormattedMessage id="partForm.input.animalProvider" />}
                onChange={e => {
                  setAnimalProvider(e.target.value)
                  requestCegidAnimals({
                    code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                    vm_strain: animalStrain,
                    libelle_fournisseur_principal: e.target.value
                  })
                }}
              >
                {getCegidAnimalsFieldOptions('libelle_fournisseur_principal').map(arr => (
                  <MenuItem key={arr.value} value={arr.value}>
                    {arr.label}
                  </MenuItem>
                ))}
              </Select>
              <IconButton disabled={formDisabled} size="small" style={{ padding: '15px' }}>
                <ClearIcon
                  onClick={() => {
                    requestCegidAnimals({
                      code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                      vm_strain: animalStrain
                    })
                    resetAnimalsParams([
                      'animalProvider',
                      'animalOriginArea',
                      'animalSex',
                      'weightAge'
                    ])
                  }}
                />
              </IconButton>
            </div>
          </Grid>
        )}
        {animalProvider && (
          <Grid item xs={6}>
            <div className="grid-animals-select__wrapper">
              <Select
                disabled={formDisabled}
                value={animalOriginArea}
                label={<FormattedMessage id="partForm.input.animalOriginArea" />}
                onChange={e => {
                  setAnimalOriginArea(e.target.value)

                  requestCegidAnimals({
                    code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                    vm_strain: animalStrain,
                    libelle_fournisseur_principal: animalProvider,
                    lieu_elevage_1_choix: e.target.value
                  })
                }}
              >
                {isEmpty(getCegidAnimalsFieldOptions('lieu_elevage_1_choix')) ? (
                  <MenuItem disabled>
                    <FormattedMessage id="partForm.animalOriginArea.unavailable" />
                  </MenuItem>
                ) : (
                  getCegidAnimalsFieldOptions('lieu_elevage_1_choix').map(arr => (
                    <MenuItem key={arr.value} value={arr.value}>
                      {arr.label}
                    </MenuItem>
                  ))
                )}
              </Select>
              <IconButton disabled={formDisabled} size="small" style={{ padding: '15px' }}>
                <ClearIcon
                  onClick={() => {
                    requestCegidAnimals({
                      code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                      vm_strain: animalStrain,
                      libelle_fournisseur_principal: animalProvider
                    })
                    resetAnimalsParams(['animalOriginArea', 'animalSex', 'weightAge'])
                  }}
                />
              </IconButton>
            </div>
          </Grid>
        )}
        {animalOriginArea && (
          <>
            <Grid item xs={6}>
              <div className="grid-animals-select__wrapper">
                <Select
                  disabled={formDisabled}
                  value={animalSex}
                  label={<FormattedMessage id="partForm.input.animalSex" />}
                  onChange={e => {
                    setAnimalSex(e.target.value)

                    requestCegidAnimals({
                      code_animaux_espece: animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                      vm_strain: animalStrain,
                      libelle_fournisseur_principal: animalProvider,
                      lieu_elevage_1_choix: animalOriginArea,
                      animaux_sexe_libelle: e.target.value
                    })
                  }}
                >
                  {getCegidAnimalsFieldOptions('animaux_sexe_libelle').map(arr => (
                    <MenuItem key={arr.value} value={arr.value}>
                      {isModelSuggestion(arr.label, 'host_sexe')}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton disabled={formDisabled} size="small" style={{ padding: '15px' }}>
                  <ClearIcon
                    onClick={() => {
                      requestCegidAnimals({
                        code_animaux_espece:
                          animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                        vm_strain: animalStrain,
                        libelle_fournisseur_principal: animalProvider,
                        lieu_elevage_1_choix: animalOriginArea
                      })
                      resetAnimalsParams(['animalSex', 'weightAge'])
                    }}
                  />
                </IconButton>
              </div>
            </Grid>
          </>
        )}
        {animalSex && (
          <Grid container xs={12}>
            <Grid item xs={6}>
              <div className="radio-group__wrapper">
                <RadioGroupField
                  formDisabled={formDisabled}
                  value={animalWeightAgeRadio === 'age' ? true : false}
                  labelRadioLeft={'partForm.input.animalAge'}
                  labelRadioRight={'partForm.input.animalWeight'}
                  setValue={value => setAnimalWeightAgeRadio(!value ? 'weight' : 'age')}
                  label={''}
                  direction="row"
                  content="space-between"
                />
              </div>
            </Grid>
            {animalWeightAgeRadio === 'age' ? (
              <Grid item xs={6}>
                <div className="grid-animals-select__wrapper">
                  <Select
                    disabled={formDisabled}
                    value={animalAge}
                    label={<FormattedMessage id="partForm.input.animalAge" />}
                    onChange={e => {
                      setAnimalAge(e.target.value)

                      const getAnimalId = cegidAnimals
                        .get('data')
                        .valueSeq()
                        .toJS()
                        .filter(item => item.animaux_age_libelle === e.target.value)

                      if (getAnimalId) setAnimalId(getAnimalId[0].id)
                    }}
                  >
                    {isEmpty(getCegidAnimalsFieldOptions('animaux_age_libelle')) ? (
                      <MenuItem disabled>
                        <FormattedMessage id="partForm.animalAgeOptions.unavailable" />
                      </MenuItem>
                    ) : (
                      getCegidAnimalsFieldOptions('animaux_age_libelle').map(arr => (
                        <MenuItem key={arr.value} value={arr.value}>
                          {isModelSuggestion(arr.label, 'host_age')}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <IconButton disabled={formDisabled} size="small" style={{ padding: '15px' }}>
                    <ClearIcon
                      onClick={() => {
                        requestCegidAnimals({
                          code_animaux_espece:
                            animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                          vm_strain: animalStrain,
                          libelle_fournisseur_principal: animalProvider,
                          lieu_elevage_1_choix: animalOriginArea,
                          animaux_sexe_libelle: animalSex
                        })
                        resetAnimalsParams('weightAge')
                      }}
                    />
                  </IconButton>
                </div>
              </Grid>
            ) : (
              <Grid item xs={6}>
                <div className="grid-animals-select__wrapper">
                  <Select
                    disabled={formDisabled}
                    value={animalWeight}
                    label={<FormattedMessage id="partForm.input.animalWeight" />}
                    onChange={e => {
                      setAnimalWeight(e.target.value)

                      const getAnimalId = cegidAnimals
                        .get('data')
                        .valueSeq()
                        .toJS()
                        .filter(item => item.animaux_poids_libelle === e.target.value)

                      if (getAnimalId) setAnimalId(getAnimalId[0].id)
                    }}
                  >
                    {isEmpty(getCegidAnimalsFieldOptions('animaux_poids_libelle')) ? (
                      <MenuItem disabled>
                        <FormattedMessage id="partForm.animalWeightOptions.unavailable" />
                      </MenuItem>
                    ) : (
                      getCegidAnimalsFieldOptions('animaux_poids_libelle').map(arr => (
                        <MenuItem key={arr.value} value={arr.value}>
                          {isModelSuggestion(arr.label, 'host_weight')}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <IconButton disabled={formDisabled} size="small" style={{ padding: '15px' }}>
                    <ClearIcon
                      onClick={() => {
                        requestCegidAnimals({
                          code_animaux_espece:
                            animalSpecies.toLowerCase() === 'souris' ? 'SOU' : 'RAT',
                          vm_strain: animalStrain,
                          libelle_fournisseur_principal: animalProvider,
                          lieu_elevage_1_choix: animalOriginArea,
                          animaux_sexe_libelle: animalSex
                        })
                        resetAnimalsParams('weightAge')
                      }}
                    />
                  </IconButton>
                </div>
              </Grid>
            )}
          </Grid>
        )}
        <Grid container xs={12}>
          {!isPartHealthy && (
            <Grid item xs={6}>
              <Select
                disabled={formDisabled}
                value={animalInoculationMethod}
                label={<FormattedMessage id="partForm.input.inoculationMethod" />}
                onChange={e => setAnimalInoculationMethod(e.target.value)}
              >
                {getChoiceFieldsOptions('inoculation_method').map(arr => (
                  <MenuItem key={arr.value} value={arr.value}>
                    {isModelSuggestion(arr.label, 'inoculation_method')}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
          <Grid item xs={6}>
            <TextField
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              disabled={formDisabled}
              value={animalsPerCage}
              label={<FormattedMessage id="partForm.input.animalsPerCage" />}
              margin="normal"
              onChange={e => setAnimalsPerCage(e.target.value)}
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
        <Grid item xs={12}>
          <RadioGroupField
            formDisabled={formDisabled}
            value={irradiation}
            setValue={value => setIrradiation(value)}
            label={<FormattedMessage id="partForm.input.irradiation" />}
            direction="row"
            content="space-between"
          />
        </Grid>
        {irradiation && (
          <Grid item xs={6}>
            <TextField
              disabled={formDisabled}
              value={irradiationDose}
              label={<FormattedMessage id="partForm.input.irradiationDose" />}
              margin="normal"
              onChange={e => setIrradiationDose(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
      <PartFormButtons
        isBtnDisabled={!animalWeight && !animalAge}
        action={buttonAction}
        handleCreate={handleCreate}
        handleUpdate={() => {
          setFormDisabled(false)
          setButtonAction('update')
        }}
        handleSaveUpdate={() => handleSaveUpdate()}
        handleCancel={() => {
          resetStateErrors('parts', { value: null })
          setFormToView()
        }}
        handleDelete={() => handleDeletePart()}
      />
    </PartFormWrapper>
  )
}

export default PartForm
