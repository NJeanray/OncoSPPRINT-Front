import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { fromJS, remove } from 'immutable'
import { Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import { eventChoiceFieldsEndpoint } from 'app/api/endpoints'
import getBrickIdRequest from 'app/utils/getBrickIdRequest'
import RadioGroupField from 'app/components/radioGroupField/RadioGroupField'
import ListFormBtn from 'app/components/listFormBtn'
import TextError from 'app/components/textError'
import TextField from 'app/components/textField'
import BrickSelect from 'app/components/brickSelect'
import RadioConsumableCustomerCompound from 'app/components/radioConsumableCustomerCompound'
import StyledGrid from 'app/components/styledGrid'
import Select from 'app/components/select'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { PartContext } from 'app/contexts/PartProvider'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import StyledMainAddBtn from 'app/components/styledMainAddBtn/StyledMainAddBtn'
import BtnUnderline from 'app/components/btnUnderline'
import {
  brickCategory,
  treatmentObjInitialize,
  initializeTreatmentsFromEventSelected
} from './EventTreatmentForm.utils'

const EventTreatmentForm = ({
  fetchEntities,
  treatmentNames,
  isBricksFetching,
  eventChoiceFields,
  brickParamsValues,
  brickParamsList,
  doseUnities
}) => {
  const { partSelected } = useContext(PartContext)
  const {
    action,
    formDisabled,
    fetchBricks,
    fetchBrickParams,
    handleCreateModify,
    eventSelected,
    setIsFrequencyDisplayed,
    nbAnimalsDefault
  } = useContext(EventFormContext)
  const [nbAnimals, setNbAnimals] = useState(null)
  const [modifying, setModifying] = useState(-1)
  const [treatments, setTreatments] = useState(fromJS([treatmentObjInitialize]))
  const [hasBrickParamsError, setHasbrickParamsError] = useState(false)
  const [treatmentType, setTreatmentType] = useState(null)
  const [isGroupUntreated, setIsGroupUntreated] = useState(false)
  const [isVehicule, setIsVehicule] = useState(false)
  const [brickParams, setBrickParams] = useState(null)
  const isBtnDisabled = !isGroupUntreated && !treatmentType

  useEffect(() => {
    if (isGroupUntreated && action === 'create') setNbAnimals(nbAnimalsDefault)
    else if (!isGroupUntreated && action === 'create') {
      // do something to update each animalsNumber
    }
  }, [action, nbAnimalsDefault, isGroupUntreated])

  useEffect(() => {
    fetchBricks(brickCategory)
  }, [fetchBricks])

  useEffect(() => {
    if (brickParamsValues) setBrickParams(brickParamsValues)
  }, [brickParamsValues])

  useEffect(() => {
    if (!eventChoiceFields) {
      fetchEntities('eventChoiceFields', {
        endpoint: eventChoiceFieldsEndpoint(),
        common: true
      })
    }
  }, [eventChoiceFields, fetchEntities])

  useEffect(() => {
    if (nbAnimalsDefault) {
      const treatmentsUpdated = treatments
        .valueSeq()
        .toJS()
        .map(item => {
          return {
            ...item,
            nb_animals: item && item.nb_animals !== 0 ? item.nb_animals : nbAnimalsDefault
          }
        })

      setTreatments(fromJS(treatmentsUpdated))
    }
    // eslint-disable-next-line
  }, [nbAnimalsDefault])

  function onSelectTreatmentType(inductionTypeSelected) {
    setHasbrickParamsError(false)
    setTreatmentType(inductionTypeSelected)
    fetchBrickParams(inductionTypeSelected)
  }

  useEffect(() => {
    if (action === 'update' && eventSelected) {
      initializeTreatmentsFromEventSelected(setTreatments, eventSelected)
      setIsGroupUntreated(eventSelected.get('untreated'))
      setIsVehicule(eventSelected.get('vehicule'))
      setTreatmentType(eventSelected.get('brick_name'))
      if (eventSelected.get('untreated')) setNbAnimals(eventSelected.get('nb_animals'))
    }
  }, [action, eventSelected])

  const handleClickBtn = async () => {
    let payload = {}

    if (!isGroupUntreated) {
      const brickId = await getBrickIdRequest(
        action,
        eventSelected,
        partSelected.get('site'),
        brickCategory,
        treatmentType,
        brickParamsValues
      )

      if (brickId === -1) setHasbrickParamsError(true)
      else {
        payload.treatments = treatments.toJS()
        payload.untreated = isGroupUntreated
        payload.vehicule = isVehicule
        payload.brick_id = brickId
      }
    } else {
      payload.untreated = isGroupUntreated
      payload.nb_animals = nbAnimals
    }

    if (action === 'create') payload.type = 'treatment'
    handleCreateModify(payload)
  }

  return (
    <StyledGrid container style={{ width: '100%' }}>
      {hasBrickParamsError && (
        <TextError text={<FormattedMessage id="events.brickParamsError" />} />
      )}
      <Grid item xs={12}>
        <RadioGroupField
          formDisabled={formDisabled}
          radioDisabled={isVehicule}
          label={<FormattedMessage id="eventTreatmentForm.untreatedGroup" />}
          labelRadioRight="global.boolean.no"
          labelRadioLeft="global.boolean.yes"
          value={isGroupUntreated}
          setValue={value => {
            if (value) {
              setIsVehicule(false)
              setIsFrequencyDisplayed(false)
            } else setIsFrequencyDisplayed(true)

            setIsGroupUntreated(value)
          }}
          direction="column"
          align="flex-start"
        />
      </Grid>
      <Grid item xs={12}>
        <RadioGroupField
          formDisabled={formDisabled}
          radioDisabled={isGroupUntreated}
          label={<FormattedMessage id="eventTreatmentForm.placebo" />}
          labelRadioRight="global.boolean.no"
          labelRadioLeft="global.boolean.yes"
          value={isVehicule}
          setValue={value => {
            if (value) setIsGroupUntreated(false)
            setIsVehicule(value)
          }}
          direction="column"
          align="flex-start"
        />
      </Grid>
      {isGroupUntreated && (
        <Grid item xs={6}>
          <TextField
            disabled={formDisabled}
            width="100%"
            required
            type="number"
            label={<FormattedMessage id="eventTreatmentForm.animalsNumber" />}
            value={nbAnimals ? nbAnimals : ''}
            onChange={e => setNbAnimals(e.target.value)}
            inputProps={{
              onInput: e => {
                e.target.value = Number(e.target.value)
              },
              min: 0
            }}
          />
        </Grid>
      )}
      {!isGroupUntreated && (
        <>
          <Grid item xs={12}>
            <Box my={3}>
              <BrickSelect
                disabled={formDisabled}
                brickLabel="eventTreatmentForm.TreatmentType"
                onSelectBrick={e => onSelectTreatmentType(e.target.value)}
                brickValue={treatmentType}
                isBrickLoading={isBricksFetching}
                brickOptions={treatmentNames}
                brickParamsList={brickParamsList}
                brickParamsValue={brickParamsValues}
                brickParams={brickParams}
                setBrickParams={setBrickParams}
              />
            </Box>
            {!formDisabled && (
              <div className="btn__flex-end">
                <StyledMainAddBtn
                  onClick={() => {
                    const treatmentAdded = treatments.set(
                      treatments.size,
                      fromJS({
                        ...treatmentObjInitialize,
                        nb_animals: nbAnimalsDefault || 0
                      })
                    )
                    setTreatments(treatmentAdded)
                  }}
                />
              </div>
            )}
            {treatments.valueSeq().map((treatment, index) => {
              return (
                <ExpansionPanel expanded={modifying === index}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => {
                      setModifying(index)
                    }}
                  >
                    <div className="expansion-panel__summary-text">
                      <b>
                        <FormattedMessage id="eventTreatmentForm.expansionPanelSummary" /> n°{' '}
                        {index + 1}
                      </b>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <StyledGrid container>
                      <Grid item xs={6}>
                        <TextField
                          disabled={formDisabled}
                          width="100%"
                          required
                          type="number"
                          label={<FormattedMessage id="eventTreatmentForm.animalsNumber" />}
                          value={treatment.get('nb_animals')}
                          onChange={e =>
                            setTreatments(
                              treatments.updateIn(
                                [index.toString(), 'nb_animals'],
                                () => e.target.value
                              )
                            )
                          }
                          inputProps={{
                            onInput: e => {
                              e.target.value = Number(e.target.value)
                            },
                            min: 0
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} />
                      {treatments.size > 1 && (
                        <Grid item xs={6}>
                          <TextField
                            disabled={formDisabled}
                            width="100%"
                            type="number"
                            label={<FormattedMessage id="eventTreatmentForm.shift" />}
                            value={treatment.get('shift')}
                            onChange={e =>
                              setTreatments(
                                treatments.updateIn(
                                  [index.toString(), 'shift'],
                                  () => e.target.value
                                )
                              )
                            }
                            inputProps={{
                              onInput: e => {
                                e.target.value = Number(e.target.value)
                              },
                              min: 0
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                          disabled={formDisabled}
                          width="100%"
                          type="number"
                          label={<FormattedMessage id="eventTreatmentForm.DoseNumber" />}
                          value={treatment.get('administration_dose')}
                          onChange={e =>
                            setTreatments(
                              treatments.updateIn(
                                [index.toString(), 'administration_dose'],
                                () => e.target.value
                              )
                            )
                          }
                          inputProps={{
                            onInput: e => {
                              e.target.value = Number(e.target.value)
                            },
                            min: 0
                          }}
                          style={{ width: '60%' }}
                        />
                        <div style={{ marginBottom: '-8px', marginLeft: '10px', width: '30%' }}>
                          <Select
                            disabled={formDisabled}
                            label="eventTreatmentForm.unities"
                            value={treatment.get('unity')}
                            onChange={e =>
                              setTreatments(
                                treatments.updateIn(
                                  [index.toString(), 'unity'],
                                  () => e.target.value
                                )
                              )
                            }
                            options={doseUnities}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          disabled={formDisabled}
                          width="100%"
                          required
                          type="number"
                          label={<FormattedMessage id="eventTreatmentForm.VolumeNumber" />}
                          value={treatment.get('administration_volume')}
                          onChange={e =>
                            setTreatments(
                              treatments.updateIn(
                                [index.toString(), 'administration_volume'],
                                () => e.target.value
                              )
                            )
                          }
                          inputProps={{
                            onInput: e => {
                              e.target.value = Number(e.target.value)
                            },
                            min: 0
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          disabled={formDisabled}
                          width="100%"
                          required
                          type="number"
                          label={<FormattedMessage id="eventTreatmentForm.volumeFix" />}
                          value={treatment.get('treatment_volume')}
                          onChange={e =>
                            setTreatments(
                              treatments.updateIn(
                                [index.toString(), 'treatment_volume'],
                                () => e.target.value
                              )
                            )
                          }
                          inputProps={{
                            onInput: e => {
                              e.target.value = Number(e.target.value)
                            },
                            min: 0
                          }}
                        />
                      </Grid>
                      <RadioConsumableCustomerCompound
                        disabled={formDisabled}
                        action={action}
                        index={index}
                        treatment={treatment}
                        treatments={treatments}
                        setTreatments={setTreatments}
                        eventSelected={eventSelected}
                      />
                    </StyledGrid>
                    {!formDisabled && treatments && treatments.size > 1 && (
                      <div className="btn__flex-start">
                        <BtnUnderline
                          text={<FormattedMessage id="eventTreatmentForm.deleteTreatment" />}
                          onClick={() => {
                            const treatmentsWithItemDeleted = remove(treatments, index)

                            setTreatments(treatmentsWithItemDeleted)
                          }}
                        />
                      </div>
                    )}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })}
          </Grid>
        </>
      )}
      {!formDisabled && (
        <Grid item xs={12}>
          <ListFormBtn
            isBtnDisabled={isBtnDisabled}
            action={action}
            handleCreate={handleClickBtn}
            handleModify={handleClickBtn}
          />
        </Grid>
      )}
    </StyledGrid>
  )
}

export default EventTreatmentForm
