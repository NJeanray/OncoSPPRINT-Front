import React from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'

import Error from '@material-ui/icons/Error'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Snackbar from '@material-ui/core/Snackbar'

import SampleTimepoint from './SampleTimepoint'
import InputText, { checkPositiveNumber } from '../../../../../Form'

function ModelImaging({
  getBricks,
  bricks,
  study,
  studyModel,
  disabled,
  allGroups,
  getBrickParams,
  brickParams
}) {
  const [numberOfSample, setNumberOfSample] = React.useState(0)
  const [sampleArray, setSampleArray] = React.useState([])
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false)
  const [displayTimepointsCard, setDisplayTimepointsCard] = React.useState(false)
  const [expanded, setExpanded] = React.useState(0)
  const [groupIdError, setGroupIdError] = React.useState(-1)
  const [timepointIndexError, setTimepointIndexError] = React.useState(-1)
  const [isD0Defined, setD0Defined] = React.useState(false)

  const checkIsD0Defined = () => {
    const d0Found = allGroups[studyModel.initial_group].group_bricks.filter(brick => brick.is_d0)

    return !isEmpty(d0Found)
  }

  React.useEffect(() => {
    setD0Defined(checkIsD0Defined())
  }, [allGroups[studyModel.initial_group].group_bricks])

  React.useEffect(() => {
    getBricks({
      category: 'PRELEVEMENT',
      site: study.site.id,
      animal_specie:
        studyModel && studyModel.animalsSpecie ? studyModel.animalsSpecie.vm_species : ''
    })
  }, [])

  const initializeSample = {
    sampleId: '',
    groups: [],
    days_after_d0: 0,
    created: false
  }

  function createTimepoints() {
    setDisplayTimepointsCard(true)
  }

  function updateSampleArray(arrayUpdated) {
    setSampleArray([...arrayUpdated])
  }

  function deleteTimepoint(indexItemToDelete) {
    const sampleArrayItemDeleted = [...sampleArray]
    sampleArrayItemDeleted.splice(indexItemToDelete, 1)

    updateSampleArray([...sampleArrayItemDeleted])
  }

  function updateGroupIdError(groupId, timepointIndex) {
    setGroupIdError(groupId)
    setSnackbarOpen(true)
    setTimepointIndexError(timepointIndex)
  }

  return (
    <div style={{ width: '100%' }}>
      {isEmpty(sampleArray) && (
        <div className="imaging-options">
          <InputText
            disabled={
              (disabled && allGroups[studyModel.initial_group].group_bricks.length > 2) ||
              !isD0Defined
            }
            label="Number of sample"
            validators={[checkPositiveNumber]}
            margin="normal"
            type="number"
            inputProps={{ min: 0 }}
            onChange={value => {
              value = value.replace(/^0+/, '')
              setNumberOfSample(Number(value))
            }}
            value={numberOfSample}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              disabled={numberOfSample === 0}
              variant="contained"
              color="primary"
              onClick={() => {
                setSampleArray([
                  ...Array.from({ length: numberOfSample }, () => {
                    return { ...initializeSample }
                  })
                ])
                createTimepoints()
              }}
            >
              <FormattedMessage id={'CREATE'} />
            </Button>
          </div>
        </div>
      )}
      {!isEmpty(sampleArray) && (
        <div>
          {sampleArray.map((card, index) => (
            <ExpansionPanel expanded={expanded === index} onChange={() => setExpanded(index)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <h2 style={{ margin: 0, width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormattedMessage
                      style={{ color: card.created ? '#025590' : 'lightgrey' }}
                      id={
                        card.created
                          ? `Timepoint ${index + 1} `.concat(
                              ` - ${
                                card.days_after_d0 < 0
                                  ? card.days_after_d0 * -1
                                  : card.days_after_d0
                              } DAYS ${card.type === 'bf' ? 'BEFORE' : 'AFTER'} D0`
                            )
                          : 'NEW SAMPLE TIMEPOINT'
                      }
                    />
                    {/*<div style={{ float: 'right' }}>SAVED</div>*/}
                  </div>
                </h2>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
                <SampleTimepoint
                  brickParams={brickParams}
                  studySiteId={study.site.id}
                  getBrickParams={getBrickParams}
                  bricks={bricks}
                  sampleArray={sampleArray}
                  index={index}
                  disabled={disabled}
                  studyModel={studyModel}
                  allGroups={allGroups}
                  updateSampleArray={updateSampleArray}
                  deleteTimepoint={deleteTimepoint}
                  updateGroupIdError={updateGroupIdError}
                  setSnackbarOpen={setSnackbarOpen}
                  setGroupIdError={setGroupIdError}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      )}
      {!isD0Defined && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          No D0 has been defined in group pre randomisation
        </div>
      )}
      {!isEmpty(sampleArray) && displayTimepointsCard && (
        <div className="tab-content__add-btn" style={{ display: 'flex', marginTop: '20px' }}>
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            onClick={() => setSampleArray([...sampleArray, { ...initializeSample }])}
            style={{
              border: '1px solid #025590',
              backgroundColor: 'white',
              color: '#025590',
              boxShadow: 'none'
            }}
          >
            <div style={{ marginRight: '10px', display: 'flex' }}>
              <AddIcon />
            </div>
            <FormattedMessage id={'TIMEPOINT'} style={{ fontWeight: '600' }} />
          </Button>
        </div>
      )}
      <Snackbar
        className="snack-bar__error"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={isSnackbarOpen}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id" className="snack-bar__content">
            <Error />
            <span>
              <b>SAMPLE</b> -- The number of animals of the group{' '}
              {groupIdError === studyModel.initial_group ? 'pre randomisation' : groupIdError} for
              the timepoint {timepointIndexError + 1} is greater than the total number of animals in
              the group
            </span>
          </span>
        }
      />
    </div>
  )
}

export default ModelImaging
