import React, { useEffect, useState, useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { fromJS, remove } from 'immutable'
import Grid from '@material-ui/core/Grid'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon'

import { EventFormContext } from 'app/contexts/EventFormProvider'
import BrickSelect from 'app/components/brickSelect'
import StyledGrid from 'app/components/styledGrid'
import EventRandomizationFormButtons from './EventRandomizationFormButtons'
import StyledMainAddBtn from 'app/components/styledMainAddBtn/StyledMainAddBtn'
import { sampleObjInitialize } from 'app/components/eventSampleForm/EventSampleForm.utils'
import BtnUnderline from 'app/components/btnUnderline'
import TextField from '../textField'

const brickCategory = 'RANDOMISATION'

const initializeRandomizations = () =>
  fromJS([
    {
      brick_id: null
    }
  ])

const EventRandomizationForm = ({ randomizationNames, isBricksFetching, bricks }) => {
  const { action, formDisabled, fetchBricks, handleCreateModify, eventSelected } = useContext(
    EventFormContext
  )
  const [modifying, setModifying] = React.useState(-1)
  const [randomizations, setRandomizations] = useState(initializeRandomizations())
  const [animalsPerGroup, setAnimalsPerGroup] = useState(null)
  const [numberOfGroup, setNumberOfGroup] = useState(null)
  const isBtnDisabled = !animalsPerGroup || !numberOfGroup
  // const [imaging, setImaging] = useState(null)
  // const [biomarker, setBiomarker] = useState(null)
  // const [donor, setDonor] = React.useState(null)

  useEffect(() => {
    if (action === 'update' && eventSelected) {
      setRandomizations(eventSelected.get('randomization_criteria'))
    }
  }, [action, eventSelected])

  useEffect(() => {
    fetchBricks(brickCategory)
  }, [fetchBricks])

  const handleClickBtn = () => {
    const payload = {
      randomization_criteria: randomizations.toJS()
    }

    if (action === 'create') {
      payload.type = 'randomisation'
      payload.nb_animals_per_group = animalsPerGroup
      payload.nb_groups = numberOfGroup
    }

    handleCreateModify(payload)
  }

  function onSelectRandomizationType(index, randomizationTypeSelected) {
    const brickName = bricks.getIn([randomizationTypeSelected.toString(), 'name'])

    setRandomizations(
      randomizations
        .setIn([index.toString(), 'brick_id'], randomizationTypeSelected)
        .setIn([index.toString(), 'brick_name'], brickName)
        .setIn([index.toString(), 'volume'], {
          min: brickName?.toLowerCase() === 'bw' ? 0 : 100,
          max: brickName?.toLowerCase() === 'bw' ? 0 : 200
        })
        .setIn([index.toString(), 'animal_weight'], null)
    )
  }

  return (
    <>
      <StyledGrid container style={{ width: '100%' }}>
        {action === 'create' && (
          <>
            <Grid item xs={6}>
              <TextField
                disabled={formDisabled}
                type="number"
                value={numberOfGroup}
                width="100%"
                label={<FormattedMessage id="eventRandomizationForm.numberOfGroup" />}
                margin="normal"
                onChange={e => setNumberOfGroup(e.target.value)}
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
                type="number"
                value={animalsPerGroup}
                width="100%"
                label={<FormattedMessage id="eventRandomizationForm.animalsPerGroup" />}
                margin="normal"
                onChange={e => setAnimalsPerGroup(e.target.value)}
                inputProps={{
                  onInput: e => {
                    e.target.value = Number(e.target.value)
                  },
                  min: 0
                }}
              />
            </Grid>
          </>
        )}
        {randomizations.size < 2 && (
          <div className="btn__flex-end">
            <StyledMainAddBtn
              disabled={formDisabled}
              onClick={() => {
                const randomizationsAdded = randomizations.set(
                  randomizations.size,
                  fromJS(sampleObjInitialize)
                )
                setRandomizations(randomizationsAdded)
              }}
            />
          </div>
        )}
        {randomizations.valueSeq().map((randomization, index) => {
          return (
            <ExpansionPanel expanded={modifying === index} style={{ width: '100%' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={() => setModifying(index)}
              >
                <div className="expansion-panel__summary-text">
                  <b>
                    <FormattedMessage id="eventRandomizationForm.criteria" /> n° {index + 1}
                  </b>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <BrickSelect
                  disabled={formDisabled}
                  brickLabel="eventRandomizationForm.randomizationType"
                  onSelectBrick={e => onSelectRandomizationType(index, e.target.value)}
                  brickValue={randomization.get('brick_id')}
                  isBrickLoading={isBricksFetching}
                  brickOptions={randomizationNames}
                />
                {randomization.get('brick_name') &&
                  (randomization.get('brick_name').toLowerCase() === 'bw' ||
                    randomization.get('brick_name').toLowerCase() === 'tv') &&
                  !randomization
                    .get('brick_name')
                    .toLowerCase()
                    .includes('bioluminescence') && (
                    <StyledGrid container>
                      <Grid item xs={6}>
                        <TextField
                          disabled={formDisabled}
                          type="number"
                          value={randomization.getIn(['volume', 'min'])}
                          width="100%"
                          label={
                            <FormattedMessage
                              id={`eventRandomizationForm.randomizationVolumeMin.${randomizations
                                .getIn([index.toString(), 'brick_name'])
                                ?.toLowerCase()}`}
                            />
                          }
                          margin="normal"
                          onChange={e =>
                            setRandomizations(
                              randomizations.setIn(
                                [index.toString(), 'volume', 'min'],
                                e.target.value
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
                          type="number"
                          value={randomization.getIn(['volume', 'max'])}
                          width="100%"
                          label={
                            <FormattedMessage
                              id={`eventRandomizationForm.randomizationVolumeMax.${randomizations
                                .getIn([index.toString(), 'brick_name'])
                                ?.toLowerCase()}`}
                            />
                          }
                          margin="normal"
                          onChange={e =>
                            setRandomizations(
                              randomizations.setIn(
                                [index.toString(), 'volume', 'max'],
                                e.target.value
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
                    </StyledGrid>
                  )}
                {/*{randomization.get('brick_name') &&*/}
                {/*  randomization*/}
                {/*    .get('brick_name')*/}
                {/*    .toLowerCase()*/}
                {/*    .includes('bw') && (*/}
                {/*    <Grid item xs={6}>*/}
                {/*      <TextField*/}
                {/*        disabled={formDisabled}*/}
                {/*        type="number"*/}
                {/*        value={randomization.get('animal_weight')}*/}
                {/*        width="100%"*/}
                {/*        label={<FormattedMessage id="eventRandomizationForm.animalWeight" />}*/}
                {/*        margin="normal"*/}
                {/*        onChange={e =>*/}
                {/*          setRandomizations(*/}
                {/*            randomizations.setIn(*/}
                {/*              [index.toString(), 'animal_weight'],*/}
                {/*              e.target.value*/}
                {/*            )*/}
                {/*          )*/}
                {/*        }*/}
                {/*        inputProps={{*/}
                {/*          onInput: e => {*/}
                {/*            e.target.value = Number(e.target.value)*/}
                {/*          },*/}
                {/*          min: 0*/}
                {/*        }}*/}
                {/*      />*/}
                {/*    </Grid>*/}
                {/*  )}*/}
                {randomizations.size === 2 && !formDisabled && (
                  <div className="btn__flex-start">
                    <BtnUnderline
                      text={<FormattedMessage id="eventRandomization.deleteRandomization" />}
                      onClick={() => {
                        const randomizationsWithItemDeleted = remove(randomizations, index)

                        setRandomizations(randomizationsWithItemDeleted)
                      }}
                    />
                  </div>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
        {/*TODO: display later when we will be working on it*/}
        {/*<Grid item xs={6}>*/}
        {/*  <TextField*/}
        {/*    value={imaging}*/}
        {/*    width="100%"*/}
        {/*    label={<FormattedMessage id="eventRandomizationForm.imaging" />}*/}
        {/*    margin="normal"*/}
        {/*    onChange={e => setImaging(e.target.value)}*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={6}>*/}
        {/*  <TextField*/}
        {/*    value={biomarker}*/}
        {/*    width="100%"*/}
        {/*    label={<FormattedMessage id="eventRandomizationForm.biomarker" />}*/}
        {/*    margin="normal"*/}
        {/*    onChange={e => setBiomarker(e.target.value)}*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={6}>*/}
        {/*  <TextField*/}
        {/*    value={donor}*/}
        {/*    width="100%"*/}
        {/*    label={<FormattedMessage id="eventRandomizationForm.donor" />}*/}
        {/*    margin="normal"*/}
        {/*    onChange={e => setDonor(e.target.value)}*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*</Grid>*/}
      </StyledGrid>
      {!formDisabled && (
        <EventRandomizationFormButtons
          disabled={isBtnDisabled}
          handleModify={handleClickBtn}
          handleCreate={handleClickBtn}
          action={action}
        />
      )}
    </>
  )
}

export default EventRandomizationForm
