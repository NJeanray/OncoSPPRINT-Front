import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'

import Error from '@material-ui/icons/Error'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { FormControlLabel, InputLabel } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'

import ImagingTimepoint from './ImagingTimepoint'
import SmallSpinner from '../../../../../SmallSpinner'
import InputText, { checkPositiveNumber } from '../../../../../Form'
import Snackbar from '@material-ui/core/Snackbar'
import RadioGroup from '@material-ui/core/es/RadioGroup'
import Radio from '@material-ui/core/Radio'

const imagingTypeOptions = ['Optic', 'IRM', 'Nuclear']

const imagingMethodOptions = ['Bioluminescence', 'Fluorescence']

function ModelImaging({
  studyModel,
  disabled,
  allGroups,
  bricks,
  getBrickParams,
  brickParams,
  study,
  getGroupId
}) {
  const [imagingType, setImagingType] = React.useState('')
  const [isImagingSnackbarOpen, setImagingSnackbarOpen] = React.useState(false)
  const [imagingMethod, setImagingMethod] = React.useState('')
  const [numberOfImaging, setNumberOfImaging] = React.useState(0)
  const [displayTimepointsCards, setDisplayTimepointsCard] = React.useState(false)
  // const [biolumMethod, setBiolumMethod] = React.useState('');
  const [imagingArray, setImagingArray] = React.useState([])
  const [expanded, setExpanded] = React.useState(-1)
  const initializeTimepoint = {
    days_after_d0: 0,
    type: 'bf',
    created: false,
    positions: [],
    groups: []
  }
  const [groupIdError, setGroupIdError] = React.useState(-1)
  const [timepointIndexError, setTimepointIndexError] = React.useState(-1)
  const [isD0Defined, setD0Defined] = React.useState(false)
  const [params, setParams] = React.useState({
    duration: 'short',
    gfp: 'true'
  })

  const checkIsD0Defined = () => {
    const d0Found = allGroups[studyModel.initial_group].group_bricks.filter(brick => brick.is_d0)

    return !isEmpty(d0Found)
  }

  React.useEffect(() => {
    setD0Defined(checkIsD0Defined())
  }, [allGroups[studyModel.initial_group].group_bricks])

  function updateImagingArray(arrayUpdated) {
    setImagingArray([...arrayUpdated])
  }

  function createTimepoints() {
    setDisplayTimepointsCard(true)
  }

  function deleteTimepoint(indexItemToDelete) {
    const imagingArrayItemDeleted = [...imagingArray]
    imagingArrayItemDeleted.splice(indexItemToDelete, 1)

    updateImagingArray([...imagingArrayItemDeleted])
  }

  function updateGroupIdError(groupId, timepointIndex) {
    setGroupIdError(groupId)
    setImagingSnackbarOpen(true)
    setTimepointIndexError(timepointIndex)
  }

  function shouldMenuItemBeDisabled(option) {
    if (option !== 'Bioluminescence') return true

    return studyModel.modelName && !studyModel.modelName.name.toLowerCase().includes('luc')
  }

  function getBiolumParamsArray() {
    const { modelName } = studyModel

    if (modelName.name) {
      if (modelName.name.toLowerCase().includes('gfp')) return ['duration', 'gfp']
      else return ['duration']
    }

    return ['duration']
  }

  return (
    <div style={{ width: '100%' }}>
      <InputLabel htmlFor="brick-select-label">Imaging Type</InputLabel>
      <Select
        disabled={disabled || allGroups[studyModel.initial_group].group_bricks.length === 2}
        style={{ width: '300px', display: 'flex' }}
        value={imagingType}
        onChange={e => setImagingType(e.target.value)}
      >
        {!isEmpty(imagingTypeOptions) ? (
          imagingTypeOptions.map(option => (
            <MenuItem disabled={option !== 'Optic'} value={option}>
              {option}
            </MenuItem>
          ))
        ) : (
          <SmallSpinner />
        )}
      </Select>
      {imagingType.trim() !== '' && (
        <div style={{ margin: '20px 0' }}>
          <InputLabel htmlFor="brick-select-label">Imaging Method</InputLabel>
          <Select
            disabled={disabled}
            style={{ width: '300px', display: 'flex' }}
            value={imagingMethod}
            onChange={e => setImagingMethod(e.target.value)}
          >
            {imagingMethodOptions.map(option => (
              <MenuItem disabled={shouldMenuItemBeDisabled(option)} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
      {imagingMethod.toLowerCase() === 'bioluminescence' && (
        <Fragment>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '20px' }}>
            Bioluminescence Params
          </div>
          <div style={{ marginLeft: '30px' }}>
            {getBiolumParamsArray().map(key => (
              <Fragment>
                <InputLabel htmlFor="brick-select-label" style={{ margin: '10px 0' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                </InputLabel>
                <RadioGroup
                  aria-label="imaging-duration"
                  name="imaging-duration"
                  style={{ display: 'flex', flexDirection: 'row' }}
                  value={params}
                  onChange={e =>
                    setParams({
                      ...params,
                      [key]: e.target.value
                    })
                  }
                >
                  <FormControlLabel
                    value={key === 'gfp' ? 'true' : 'short'}
                    control={
                      <Radio
                        color="primary"
                        checked={key === 'gfp' ? params[key] === 'true' : params[key] === 'short'}
                      />
                    }
                    label={key === 'gfp' ? 'True' : 'Short (5min)'}
                  />
                  <FormControlLabel
                    value={key === 'gfp' ? 'false' : 'long'}
                    control={
                      <Radio
                        color="primary"
                        checked={key === 'gfp' ? params[key] === 'false' : params[key] === 'long'}
                      />
                    }
                    label={key === 'gfp' ? 'False' : 'Long (10min)'}
                  />
                </RadioGroup>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
      {!isD0Defined && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          No D0 has been defined in group pre randomisation
        </div>
      )}
      {isD0Defined && imagingMethod && isEmpty(imagingArray) && (
        <div className="imaging-options">
          <InputText
            disabled={disabled && allGroups[studyModel.initial_group].group_bricks.length > 2}
            label="Number of timepoints"
            validators={[checkPositiveNumber]}
            margin="normal"
            type="number"
            inputProps={{ min: 0 }}
            onChange={value => {
              value = value.replace(/^0+/, '')
              setNumberOfImaging(Number(value))
            }}
            value={numberOfImaging}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              disabled={numberOfImaging === 0}
              variant="contained"
              color="primary"
              onClick={() => {
                setImagingArray([
                  ...Array.from({ length: numberOfImaging }, () => {
                    return { ...initializeTimepoint }
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
      <div style={{ width: '100%', marginTop: '30px' }}>
        {displayTimepointsCards &&
          imagingArray.map((card, index) => (
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
                          : 'NEW IMAGING TIMEPOINT'
                      }
                    />
                    {/*<div style={{ float: 'right' }}>SAVED</div>*/}
                  </div>
                </h2>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
                <ImagingTimepoint
                  getGroupId={getGroupId}
                  brickParams={brickParams}
                  getBrickParams={getBrickParams}
                  study={study}
                  // biolumMethod={biolumMethod}
                  imagingArray={imagingArray}
                  index={index}
                  disabled={disabled}
                  studyModel={studyModel}
                  allGroups={allGroups}
                  updateImagingArray={updateImagingArray}
                  deleteTimepoint={deleteTimepoint}
                  updateGroupIdError={updateGroupIdError}
                  setImagingSnackbarOpen={setImagingSnackbarOpen}
                  isImagingSnackbarOpen={isImagingSnackbarOpen}
                  // setGroupIdError={setGroupIdError}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </div>
      {!isEmpty(imagingArray) && displayTimepointsCards && (
        <div className="tab-content__add-btn" style={{ display: 'flex', marginTop: '20px' }}>
          <Button
            disabled={disabled}
            variant="contained"
            color="primary"
            onClick={() => setImagingArray([...imagingArray, { ...initializeTimepoint }])}
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
        open={isImagingSnackbarOpen}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={
          <span id="message-id" className="snack-bar__content">
            <Error />
            <span>
              <b>IMAGING</b> --The number of animals of the group{' '}
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
