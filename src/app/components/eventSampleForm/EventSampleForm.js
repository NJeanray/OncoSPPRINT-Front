import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'
import { fromJS, remove, removeIn } from 'immutable'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import TableBody from '@material-ui/core/TableBody'
import DeleteCrossIcon from '@material-ui/icons/Close'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import ClearButton from 'app/components/clearButton'
import StyledButton from 'app/components/styledButton'
import { eventChoiceFieldsEndpoint } from 'app/api/endpoints'
import StyledMainAddBtn from 'app/components/styledMainAddBtn'
import TextField from 'app/components/textField'
import Select from 'app/components/select'
import StyledTable from 'app/components/styledTable'
import TextError from 'app/components/textError'
import BtnUnderline from 'app/components/btnUnderline'
import BrickSelect from 'app/components/brickSelect'
import ListFormBtn from 'app/components/listFormBtn'
import { EventFormContext } from 'app/contexts/EventFormProvider'
import { PartContext } from 'app/contexts/PartProvider'
import WarningModal from 'app/components/warningModal'
import {
  sampleObjInitialize,
  brickCategory,
  brickWeightCategory,
  brickConservationCategory,
  getSampleFormPayload,
  checkToDisplayBloodQuantity,
  checkToDisplayWeightBrick,
  initializeSamplesFromEventSelected
} from './EventSampleForm.utils'

const EventSampleForm = ({
  isWeighBricksLoading,
  weightBricksOptions,
  samplesState,
  sampleParamsList,
  sampleParamsValues,
  eventsChoiceFields,
  sampleNames,
  isBricksLoading,
  transportTemperatures,
  conservationNames,
  fetchEntities
}) => {
  const { partSelected } = useContext(PartContext)
  const {
    action,
    formDisabled,
    fetchBricks,
    fetchBrickParams,
    handleCreateModify,
    eventSelected
  } = useContext(EventFormContext)

  const [hasBrickParamsError, setHasbrickParamsError] = useState(false)
  const [modifying, setModifying] = React.useState(-1)
  const [samples, setSamples] = React.useState(fromJS([sampleObjInitialize]))
  const [sampleIndexToDelete, setSampleIndexToDelete] = useState(null)
  const [sampleIndexFragmentToDelete, setSampleIndexFragmentToDelete] = useState(null)
  const [fragmentIndexToDelete, setFragmentIndexToDelete] = useState(null)
  const [openDeleteFragmentWarningModal, setOpenDeleteFragmentWarningModal] = useState(false)
  const [openDeleteSampleWarningModal, setOpenDeleteSampleWarningModal] = useState(false)

  useEffect(() => {
    if (modifying !== -1 && sampleParamsValues) {
      if (samples.getIn([modifying.toString(), 'brickParams'])?.size === 0) {
        setSamples(samples.setIn([modifying.toString(), 'brickParams'], fromJS(sampleParamsValues)))
      }
    }
  }, [samples, modifying, sampleParamsValues])

  useEffect(() => {
    fetchBricks(brickCategory)
    fetchBricks(brickConservationCategory, 'conservationBricks', '')
    fetchBricks(brickWeightCategory, 'weightBricks')
  }, [fetchBricks])

  useEffect(() => {
    if (!eventsChoiceFields)
      fetchEntities('eventChoiceFields', {
        endpoint: eventChoiceFieldsEndpoint(),
        common: true
      })
  }, [fetchEntities, eventsChoiceFields])

  useEffect(() => {
    if (eventSelected) initializeSamplesFromEventSelected(setSamples, eventSelected)
  }, [eventSelected])

  const resetSampleFragmentIndexToDelete = () => {
    setSampleIndexFragmentToDelete(null)
    setFragmentIndexToDelete(null)
  }

  function onSelectSampleBrick(index, sampleNameSelected) {
    const isBloodQuantityToDisplay = checkToDisplayBloodQuantity(sampleNameSelected)
    const isBrickWeightToDisplay = checkToDisplayWeightBrick(samplesState, sampleNameSelected)

    setSamples(
      samples
        .setIn([index.toString(), 'sample_brick_name'], sampleNameSelected)
        .setIn([index.toString(), 'isWeightBrickDisplayed'], isBrickWeightToDisplay)
        .setIn([index.toString(), 'isBloodQuantityDisplayed'], isBloodQuantityToDisplay)
    )
    fetchBrickParams(sampleNameSelected)
  }

  const handleSetBrickParams = brickParams =>
    setSamples(samples.setIn([modifying, 'brickParams'], fromJS(brickParams)))

  const handleClickBtn = async (transferAfter = false) => {
    const payload = await getSampleFormPayload(
      action,
      eventSelected,
      partSelected.get('site'),
      samples,
      setHasbrickParamsError
    )

    if (action === 'create') payload.type = 'sample'
    handleCreateModify(payload, transferAfter)
  }

  const handleDeleteFragment = (indexSample, fragmentIndex) => {
    const samplesWithItemDeleted = removeIn(samples, [
      indexSample.toString(),
      'fragments',
      fragmentIndex.toString()
    ])

    setSamples(samplesWithItemDeleted)
    resetSampleFragmentIndexToDelete()
  }

  const handleDeleteSample = index => {
    const samplesWithItemDeleted = remove(samples, index)

    setSamples(samplesWithItemDeleted)
    setSampleIndexToDelete(null)
  }

  function cancelDeleteFragment() {
    setOpenDeleteFragmentWarningModal(false)
    resetSampleFragmentIndexToDelete()
  }

  function cancelDeleteSample() {
    setOpenDeleteSampleWarningModal(false)
    setSampleIndexToDelete(null)
  }

  return (
    <div>
      {hasBrickParamsError && (
        <TextError text={<FormattedMessage id="events.brickParamsError" />} />
      )}
      {!formDisabled && (
        <div className="btn__flex-end">
          <StyledMainAddBtn
            onClick={() => {
              const samplesAdded = samples.set(samples.size, fromJS(sampleObjInitialize))
              setSamples(samplesAdded)
            }}
          />
        </div>
      )}
      {samples.valueSeq().map((sample, index) => {
        const sampleFragmentsSize = sample.get('fragments').size

        return (
          <>
            <WarningModal
              open={openDeleteFragmentWarningModal}
              onClose={() => cancelDeleteFragment()}
              onCancel={() => cancelDeleteFragment()}
              onSubmit={() => {
                handleDeleteFragment(sampleIndexFragmentToDelete, fragmentIndexToDelete)
                setOpenDeleteFragmentWarningModal(false)
              }}
              warningTitle="eventSampleForm.warning.deleteSampleFragment.title"
              warningText="eventSampleForm.warning.deleteSampleFragment.text"
            />
            <WarningModal
              open={openDeleteSampleWarningModal}
              onClose={() => cancelDeleteSample()}
              onCancel={() => cancelDeleteSample()}
              onSubmit={() => {
                handleDeleteSample(sampleIndexToDelete)
                setOpenDeleteSampleWarningModal(false)
              }}
              warningTitle="eventSampleForm.warning.deleteSample.title"
              warningText="eventSampleForm.warning.deleteSample.text"
            />
            <ExpansionPanel expanded={modifying === index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={() => {
                  const samplePanelBrickName = samples.getIn([
                    index.toString(),
                    'sample_brick_name'
                  ])

                  setModifying(index)
                  if (samplePanelBrickName) fetchBrickParams(samplePanelBrickName)
                }}
              >
                <div className="expansion-panel__summary-text">
                  <b>
                    <FormattedMessage id="eventSampleForm.expansionPanelSummary" /> n° {index + 1}
                  </b>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={6}>
                  <TextField
                    disabled={formDisabled}
                    width="100%"
                    required
                    type="number"
                    label={<FormattedMessage id="eventInductionForm.animalsNumber" />}
                    value={sample.get('nb_animals')}
                    onChange={e =>
                      setSamples(
                        samples.updateIn([index.toString(), 'nb_animals'], () => e.target.value)
                      )
                    }
                    inputProps={{
                      onInput: e => {
                        e.target.value = Number(e.target.value)
                      }
                    }}
                  />
                </Grid>
                <Box mt={1}>
                  <BrickSelect
                    disabled={formDisabled}
                    brickLabel="eventSampleForm.sampleType"
                    brickValue={samples.getIn([index.toString(), 'sample_brick_name'])}
                    onSelectBrick={e => onSelectSampleBrick(index, e.target.value)}
                    isBrickLoading={isBricksLoading}
                    brickOptions={sampleNames}
                    brickParamsValue={sampleParamsValues}
                    brickParamsList={sampleParamsList}
                    brickParams={samples.getIn([index.toString(), 'brickParams']).toJS()}
                    setBrickParams={handleSetBrickParams}
                  />
                </Box>
                {samples.getIn([index.toString(), 'isBloodQuantityDisplayed']) && (
                  <Box mt={1}>
                    <Grid item xs={6}>
                      <TextField
                        disabled={formDisabled}
                        width="100%"
                        required
                        type="number"
                        label={<FormattedMessage id="eventSampleForm.bloodQuantity" />}
                        value={samples.getIn([index.toString(), 'blood_quantity'])}
                        onChange={e =>
                          setSamples(
                            samples.updateIn(
                              [index.toString(), 'blood_quantity'],
                              () => e.target.value
                            )
                          )
                        }
                        inputProps={{
                          onInput: e => {
                            e.target.value = Number(e.target.value)
                          }
                        }}
                      />
                    </Grid>
                  </Box>
                )}
                {samples.getIn([index.toString(), 'isWeightBrickDisplayed']) && (
                  <div style={{ marginTop: '10px', display: 'flex' }}>
                    <BrickSelect
                      disabled={formDisabled}
                      brickLabel="eventSampleForm.brickWeight"
                      brickValue={samples.getIn([index.toString(), 'weighing_brick_id'])}
                      onSelectBrick={e =>
                        setSamples(
                          samples.setIn([index.toString(), 'weighing_brick_id'], e.target.value)
                        )
                      }
                      isBrickLoading={isWeighBricksLoading}
                      brickOptions={weightBricksOptions}
                    />
                    {samples.getIn([index.toString(), 'weighing_brick_id']) && (
                      <ClearButton
                        onClickFn={() => {
                          setSamples(samples.setIn([index.toString(), 'weighing_brick_id'], null))
                        }}
                      />
                    )}
                  </div>
                )}
                <div className="event-form__step" style={{ marginBottom: '0' }}>
                  <FormattedMessage id="eventSampleForm.fragments" />
                </div>
                <StyledTable aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">N°</TableCell>
                      <TableCell align="right">
                        <FormattedMessage id="eventSampleForm.conservation" />
                      </TableCell>
                      <TableCell align="right">
                        <FormattedMessage id="eventSampleForm.temperature" />
                      </TableCell>
                      <TableCell align="right">
                        {!formDisabled && (
                          <IconButton size="small" style={{ padding: '10px' }}>
                            <AddIcon
                              onClick={() => {
                                const fragmentAdded = samples.setIn(
                                  [
                                    index ? index.toString() : '0',
                                    'fragments',
                                    sampleFragmentsSize.toString()
                                  ],
                                  {
                                    conservation_brick_id: null,
                                    temperature: null
                                  }
                                )
                                setSamples(fragmentAdded)
                              }}
                            />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sample.get('fragments') &&
                      samples
                        .getIn([index.toString(), 'fragments'])
                        .map((fragment, fragmentIndex) => {
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={fragmentIndex}>
                              <TableCell align="left" component="th" scope="row">
                                {fragmentIndex + 1}
                              </TableCell>
                              <TableCell align="right">
                                <Select
                                  disabled={formDisabled}
                                  label=""
                                  value={fragment.get('conservation_brick_id')}
                                  onChange={e =>
                                    setSamples(
                                      samples.updateIn(
                                        [
                                          index.toString(),
                                          'fragments',
                                          fragmentIndex.toString(),
                                          'conservation_brick_id'
                                        ],
                                        () => e.target.value
                                      )
                                    )
                                  }
                                  options={conservationNames}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Select
                                  disabled={formDisabled}
                                  label=""
                                  value={fragment.get('temperature')}
                                  onChange={e =>
                                    setSamples(
                                      samples.updateIn(
                                        [
                                          index.toString(),
                                          'fragments',
                                          fragmentIndex.toString(),
                                          'temperature'
                                        ],
                                        () => e.target.value
                                      )
                                    )
                                  }
                                  options={transportTemperatures}
                                />
                              </TableCell>
                              <TableCell align="right">
                                {!formDisabled && (
                                  <IconButton
                                    onClick={() => {
                                      if (fragment.get('transfer_id')) {
                                        setSampleIndexFragmentToDelete(index)
                                        setFragmentIndexToDelete(fragmentIndex)
                                        setOpenDeleteFragmentWarningModal(true)
                                      } else {
                                        handleDeleteFragment(index, fragmentIndex)
                                      }
                                    }}
                                    size="small"
                                    style={{ padding: '10px' }}
                                  >
                                    <DeleteCrossIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                  </TableBody>
                </StyledTable>
                {!formDisabled && samples && samples.size > 1 && (
                  <div className="btn__flex-start">
                    <BtnUnderline
                      text={<FormattedMessage id="eventSampleForm.deleteSample" />}
                      onClick={() => {
                        const sampleWithFragmentTransferred = sample
                          .get('fragments')
                          .toJS()
                          .filter(item => item.transfer_id)

                        if (isEmpty(sampleWithFragmentTransferred)) handleDeleteSample(index)
                        else {
                          setSampleIndexToDelete(index)
                          setOpenDeleteSampleWarningModal(true)
                        }
                      }}
                    />
                  </div>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        )
      })}
      {!formDisabled && (
        <>
          <ListFormBtn
            isBtnDisabled={false}
            action={action}
            handleCreate={() => handleClickBtn(false)}
            handleModify={() => handleClickBtn(false)}
          />
          {action === 'create' && (
            <StyledButton disabled={false} onClick={() => handleClickBtn(true)} variant="contained">
              <FormattedMessage id="eventSampleForm.createSampleAndCreateTransfertEvent" />
            </StyledButton>
          )}
        </>
      )}
    </div>
  )
}

export default EventSampleForm
