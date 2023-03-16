import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { isEmpty, remove } from 'lodash'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import actions from '../../actions'
import { studyModelMapper } from '../../actions/mappers'
import SmallSpinner from '../SmallSpinner'
import Spinner from 'app/components/Spinner'

import BrickCustomFrequency from './BrickCustomFrequency'
import BrickFrequency from './BrickFrequency'
import CATEGORIES from './categories'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputText, { checkPositiveNumber } from '../Form'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { InputLabel } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import RadioGroup from '@material-ui/core/es/RadioGroup'
import Radio from '@material-ui/core/Radio'
import ConsumableAutocomplete from '../ConsumableAutocomplete'

/**
 * @return {null}
 */

let categories = ['INDUCTION', 'MONITORING', 'RANDOMISATION', 'TRAITEMENT']

function BrickSelector({
  action,
  getBricks,
  animalsNumberLength,
  cancel,
  save,
  study,
  getConsumables,
  consumables,
  creatingBrick,
  bricksState,
  studyModel,
  getBrickParams,
  isFetching,
  group,
  createChildrenStudyGroup,
  brickParams,
  allGroups,
  getStudyCosting
}) {
  const [brick, setBrick] = React.useState(creatingBrick)
  const [showGroupsToApply, setShowGroupsToApply] = React.useState('no')
  const [displayParamsNotNeeded, setDisplayParamsNotNeeded] = React.useState(false)
  const [params, setParams] = React.useState(initializeParams())
  const [displayBricksOptions, setDisplayBricksOptions] = React.useState(false)
  const [numberOfGroups, setNumberOfGroups] = React.useState(0)
  const [consumableDescription, setConsumableDescription] = React.useState('')
  const [groupsToApply, setGroupsToApply] = React.useState([])
  const [showAddConsumable, setShowAddConsumable] = React.useState('no')
  const [categoriesIndex, setCategoriesIndex] = React.useState(-1)
  const [groupsToDisplay, setGroupsToDisplay] = React.useState([])
  const [consumableSelected, setConsumableSelected] = React.useState('')
  const [displayScheduleBeforeAfter, setDisplayScheduleBeforeAfter] = React.useState(
    creatingBrick &&
      creatingBrick.schedule &&
      (creatingBrick.schedule.type === 'bf' || creatingBrick.schedule.type === 'af')
  )
  const [displayScheduleCustomFrequency, setDisplayScheduleCustomFrequency] = React.useState(
    creatingBrick && creatingBrick.schedule && creatingBrick.schedule.type === 'cf'
  )

  const recursionGroupChild = React.useCallback(
    (childId, arr = [], index = 0) => {
      if (studyModel.initial_group !== childId) arr.push(childId)
      if (allGroups[childId].children.length > 0) {
        allGroups[childId].children.map(id => {
          return recursionGroupChild(id, arr, index + 1)
        })
      }

      return arr
    },
    [allGroups, studyModel.initial_group]
  )

  function usePrevious(value) {
    const ref = React.useRef()
    React.useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevGroupBricks = usePrevious(group.group_bricks)
  React.useEffect(() => {
    if (prevGroupBricks) {
      if (
        prevGroupBricks.length !== group.group_bricks.length ||
        prevGroupBricks !== group.group_bricks
      ) {
        getStudyCosting(study.id)
      }
    }
  }, [getStudyCosting, group.group_bricks, prevGroupBricks, study.id])

  React.useEffect(() => {
    const initialGroupsChild = recursionGroupChild(studyModel.initial_group)
    const allGroups = [studyModel.initial_group, ...initialGroupsChild]

    remove(allGroups, function(groupId) {
      return groupId === group.id
    })
    setGroupsToDisplay(allGroups)
  }, [allGroups, group.id, recursionGroupChild, studyModel.initial_group])

  const prevBrickParamsLoadingValue = usePrevious(brickParams.loading)
  React.useEffect(() => {
    if (
      prevBrickParamsLoadingValue !== brickParams.loading &&
      prevBrickParamsLoadingValue &&
      !brickParams.loading
    )
      setDisplayParamsNotNeeded(true)
  }, [brickParams.loading, prevBrickParamsLoadingValue])

  React.useEffect(() => {
    setParams(initializeParams)
  }, [brickParams, initializeParams])

  React.useEffect(() => {
    setBrick(creatingBrick)
  }, [creatingBrick])

  React.useEffect(() => {
    if (creatingBrick && creatingBrick.brick && action === 'create') {
      getBricks({
        category: creatingBrick.brick.category,
        site: study.site.id,
        animal_specie: studyModel ? studyModel.animalsSpecie.vm_species : ''
      })
    }
  }, [action, creatingBrick, getBricks, study.site.id, studyModel])

  React.useEffect(() => {
    if (
      creatingBrick &&
      (bricksState.objects || []).find(obj => obj.name === creatingBrick.brick.name) &&
      categoriesIndex !== -1
    ) {
      setDisplayBricksOptions(true)
      getBrickParams({
        category: categories[categoriesIndex],
        name: creatingBrick.brick.name,
        site: study.site.id
      })
      return
    }

    if (action === 'modify') {
      getBricks({
        category: categories[categoriesIndex + 1],
        site: study.site.id,
        animal_specie: studyModel ? studyModel.animalsSpecie.vm_species : ''
      })
      if (categoriesIndex < 3 && !displayBricksOptions) setCategoriesIndex(categoriesIndex + 1)
    }
  }, [
    action,
    bricksState.objects,
    categoriesIndex,
    creatingBrick,
    displayBricksOptions,
    getBrickParams,
    getBricks,
    study.site.id,
    studyModel
  ])

  function initializeParams() {
    const newObj = {}

    Object.keys(brickParams.objects).forEach(key => {
      if (key !== 'animal_specie' && !key.includes('duration'))
        newObj[key] = brickParams.objects[key].values[0]
      else if (key.includes('duration')) newObj[key] = 1
    })
    return newObj
  }

  function setBrickName(value) {
    setBrick({
      ...brick,
      brick: {
        category: brick.brick.category,
        name: value.name,
        id: 0
      }
    })
    getBrickParams({
      category: brick.brick.category,
      name: value.name,
      site: study.site.id
    })
  }

  function getDialogTitle() {
    switch (brick.brick.category) {
      case CATEGORIES.MONITORING:
        return 'Add Monitoring'
      case CATEGORIES.SAMPLE:
        return 'Add Sample'
      case CATEGORIES.TREATMENT:
        return 'Add Treatment'
      case CATEGORIES.INDUCTION:
        return 'Add Induction'
      case CATEGORIES.RANDOMISATION:
        return 'Add Randomisation'
      default:
        return 'Add Task'
    }
  }

  function displayBrickParamsSelectLabel(key) {
    const firstLetterUpperCase = key.charAt(0).toUpperCase() + key.slice(1)

    if (key.includes('duration')) return firstLetterUpperCase.replace('_', ' ') + ' (in hours)'
    return firstLetterUpperCase.replace('_', ' ')
  }

  function getSelectLabel() {
    switch (brick.brick.category) {
      case CATEGORIES.MONITORING:
        return 'Monitorings'
      case CATEGORIES.SAMPLE:
        return 'Sampling Techniques'
      case CATEGORIES.TREATMENT:
        return 'Treatments'
      case CATEGORIES.INDUCTION:
        return 'Inductions Methods'
      case CATEGORIES.RANDOMISATION:
        return 'Randomisations'
      default:
        return 'Tasks'
    }
  }

  if (!brick) return null

  function isSubmitButtonDisabled() {
    if (!brick.brick.name) return true
    else if (action === 'modify') return false
    else if (
      brick.brick.category === 'RANDOMISATION' &&
      (group.animalsNumber === '0' || numberOfGroups === 0)
    )
      return true
    else if (
      numberOfGroups !== 0 &&
      group.animalsNumber !== '0' &&
      (numberOfGroups > Number(group.animalsNumber) || numberOfGroups < 1)
    )
      return true
    else if (
      brick.brick.category !== 'RANDOMISATION' &&
      brick.days_after_d0 === 0 &&
      !brick.is_d0 &&
      !brick.schedule
    )
      return true
    else if (brick.brick.category === 'RANDOMISATION' && brick.days_after_d0 === 0 && !brick.is_d0)
      return true
    return false
  }

  function updateSchedule(newScheduleObj) {
    setBrick({
      ...brick,
      schedule: {
        ...newScheduleObj
      }
    })
  }

  function getGroupBrickSelectList() {
    if (action === 'create')
      return group.group_bricks.filter(brick => brick.brick.id !== 33 && brick.brick.id !== 32)
    return group.group_bricks.filter(
      bk => bk.brick.id !== brick.brick.id && bk.brick.id !== 33 && bk.brick.id !== 32
    )
  }

  function handleCreateModifyBrick() {
    if (brick.schedule && brick.schedule.period === 'TW') {
      brick.schedule.period = 'W'
      brick.schedule.frequency = 2
      brick.schedule.interval = null
    } else if (brick.schedule && brick.schedule.period === 'BID') {
      brick.schedule.period = 'Q'
      brick.schedule.frequency = 2
      brick.schedule.interval = null
    }

    save(
      {
        ...brick
      },
      action,
      categories[categoriesIndex],
      params,
      groupsToApply
    )
    setDisplayParamsNotNeeded(false)
    //initialize local state
    setShowGroupsToApply(false)
    setBrick({
      ...brick,
      brick: {
        category: brick.brick.category
      },
      is_d0: false,
      days_after_d0: 0,
      schedule: null
    })
    if (displayScheduleBeforeAfter) setDisplayScheduleBeforeAfter(false)
    else if (displayScheduleCustomFrequency) setDisplayScheduleCustomFrequency(false)

    if (numberOfGroups !== 0)
      createChildrenStudyGroup(null, {
        numberOfGroups: numberOfGroups,
        groupParentId: group.id,
        animalsNumber: Number(group.animalsNumber)
      })
    if (brick.brick.category === 'RANDOMISATION' || categories[categoriesIndex] === 'RANDOMISATION')
      setNumberOfGroups(0)
  }

  function initializeDependency() {
    let i = 0

    if (action === 'create')
      while (
        i < group.group_bricks.length - 1 &&
        (group.group_bricks[i].brick.id === '32' || group.group_bricks[i].brick.id === '33')
      )
        i++
    else
      while (
        i < group.group_bricks.length - 1 &&
        (group.group_bricks[i].brick.id === '32' ||
          group.group_bricks[i].brick.id === '33' ||
          group.group_bricks[i].id === brick.id)
      )
        i++
    return group.group_bricks[i].schedule ? group.group_bricks[i].schedule.id : null
  }

  function checkBrickRandomisation() {
    const brickRandoFound = allGroups[studyModel.initial_group].group_bricks.find(
      groupBrick => groupBrick.brick.category === 'RANDOMISATION'
    )

    return !isEmpty(brickRandoFound)
  }

  function getBrickNameFromScheduleId(scheduleId) {
    return group.group_bricks.filter(brick => brick.schedule && brick.schedule.id === scheduleId)[0]
  }

  function handleChange(event) {
    setGroupsToApply(event.target.value)
  }

  return (
    <div
      className={
        action === 'create' ? 'brick-selector__wrapper-create' : 'brick-selector__wrapper-modify'
      }
    >
      {action === 'create' && (
        <DialogTitle id="responsive-dialog-title">{getDialogTitle()}</DialogTitle>
      )}
      {!isFetching ? (
        <Fragment>
          <div style={{ paddingLeft: '24px' }}>
            <FormControlLabel
              disabled={brick.days_after_d0 !== 0}
              control={<Checkbox value={brick.is_d0} color="default" checked={brick.is_d0} />}
              label="Set as D0"
              labelPlacement="end"
              onChange={() => {
                setBrick({ ...brick, is_d0: !brick.is_d0 })
              }}
            />
          </div>
          <DialogContent>
            <InputLabel htmlFor="brick-select-label">{getSelectLabel()}</InputLabel>
            <Select
              style={{ width: '300px', display: 'flex' }}
              renderValue={e => (e.brick.name ? e.brick.name : '')}
              value={brick}
              onChange={e => setBrickName(e.target.value)}
            >
              {!bricksState.loading && (action === 'create' || displayBricksOptions) ? (
                bricksState.objects.map(option => (
                  <MenuItem
                    disabled={
                      option.name === 'Intrasplenique + splenectomie (IS)'
                      // || option.name === 'Monitoring : Pesée + Volume tumoral'
                    }
                    value={option}
                  >
                    {option.name}
                  </MenuItem>
                ))
              ) : (
                <SmallSpinner />
              )}
              {!bricksState.loading && isEmpty(bricksState.objects) && (
                <MenuItem disabled={true}>
                  There are no bricks available for this study site
                </MenuItem>
              )}
            </Select>
            {!brickParams.loading &&
              Object.keys(brickParams.objects).length !== 0 &&
              !(
                Object.keys(brickParams.objects).length === 1 &&
                Object.keys(brickParams.objects)[0] === 'animal_specie'
              ) && (
                <div style={{ marginTop: '20px' }}>
                  <span style={{ fontWeight: 'bold' }}>Params</span>
                  <div style={{ marginLeft: '30px' }}>
                    {Object.keys(brickParams.objects).map(key => {
                      if (key !== 'animal_specie') {
                        return (
                          <div style={{ margin: '20px 0' }}>
                            <InputLabel htmlFor="brick-select-label">
                              {displayBrickParamsSelectLabel(key)}
                            </InputLabel>
                            <Select
                              style={{ width: '300px', display: 'flex' }}
                              renderValue={params =>
                                params[key]
                                  ? typeof params[key] !== 'number'
                                    ? params[key].charAt(0).toUpperCase() +
                                      params[key].slice(1).toLowerCase()
                                    : typeof params[key]
                                    ? params[key]
                                    : ''
                                  : ''
                              }
                              value={params}
                              onChange={e => {
                                setParams({
                                  ...params,
                                  [key]: e.target.value
                                })
                              }}
                            >
                              {key.includes('duration') && <MenuItem value={1}>1</MenuItem>}
                              {!isEmpty(brickParams.objects[key]) &&
                                brickParams.objects[key].values.map(option => (
                                  <MenuItem value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
                                  </MenuItem>
                                ))}
                            </Select>
                          </div>
                        )
                      }
                      return <div></div>
                    })}
                  </div>
                </div>
              )}
            {brickParams.loading && (
              <div
                style={{
                  width: '270px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <span style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}>
                  Looking for brick params...
                </span>
                <SmallSpinner />
              </div>
            )}
            {displayParamsNotNeeded &&
              !brickParams.loading &&
              (Object.keys(brickParams.objects).length === 0 ||
                (Object.keys(brickParams.objects).length === 1 &&
                  Object.keys(brickParams.objects)[0] === 'animal_specie')) && (
                <div style={{ marginTop: '25px' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '14px',
                      marginBottom: '20px',
                      color: 'grey'
                    }}
                  >
                    No params are required for this brick
                  </span>
                </div>
              )}
            <InputText
              disabled={brick.brick.category !== 'RANDOMISATION' && brick.is_d0}
              value={brick.days_after_d0 ? brick.days_after_d0 : 0}
              label="Days before (-) or after d0"
              margin="normal"
              type="number"
              required
              onChange={value => {
                setBrick({ ...brick, days_after_d0: Number(value) })
              }}
            />
            {brick.brick.category === 'RANDOMISATION' && action !== 'modify' && (
              <InputText
                disabled={group.animalsNumber === '0'}
                label="Number of Groups"
                validators={[checkPositiveNumber]}
                margin="normal"
                type="number"
                inputProps={{ max: animalsNumberLength }}
                onChange={value => {
                  setNumberOfGroups(Number(value))
                }}
                value={numberOfGroups}
                required
              />
            )}
            <div
              className={
                displayScheduleBeforeAfter || displayScheduleCustomFrequency ? 'brick-border' : ''
              }
            >
              <BrickFrequency
                brick={brick}
                allBricks={group.group_bricks}
                onChange={value => {
                  if (value.type === 'before/after') {
                    setDisplayScheduleBeforeAfter(true)
                    setDisplayScheduleCustomFrequency(false)
                    setBrick({
                      ...brick,
                      schedule: {
                        ...brick.schedule,
                        is_before: true,
                        type: 'bf',
                        timepoints: null,
                        frequency: null,
                        period: null,
                        duration: null,
                        interval: null,
                        duration2: null,
                        time_hour: null,
                        time_minute: null,
                        dependency: initializeDependency()
                        // dependency: group.group_bricks[2].schedule.id
                        // dependency: group.group_bricks[2].schedule.id,
                      }
                    })
                  } else if (value.type === 'cf') {
                    setDisplayScheduleBeforeAfter(false)
                    setDisplayScheduleCustomFrequency(true)
                    setBrick({
                      ...brick,
                      schedule: {
                        ...brick.schedule,
                        is_before: null,
                        type: value.type,
                        timepoints: null,
                        interval: 1,
                        frequency: 1,
                        period: 'Q',
                        duration: 1,
                        duration2: null,
                        time_hour: null,
                        time_minute: null,
                        dependency: null
                      }
                    })
                  }
                }}
                // onChange={this.setBrickFrequency}
              />
              {displayScheduleBeforeAfter && (
                <div>
                  <Select
                    value={brick.schedule ? brick.schedule.type : ''}
                    onChange={e => {
                      setBrick({
                        ...brick,
                        schedule: {
                          ...brick.schedule,
                          is_before: e.target.value === 'bf',
                          type: e.target.value
                        }
                      })
                    }}
                  >
                    <MenuItem value={'bf'}>Before</MenuItem>
                    <MenuItem value={'af'}>After</MenuItem>
                  </Select>
                  <span style={{ margin: '0 10px' }}>BRICK</span>
                  <Select
                    value={
                      brick.schedule && brick.schedule.dependency
                        ? getBrickNameFromScheduleId(brick.schedule.dependency)
                        : ''
                    }
                    onChange={e =>
                      setBrick({
                        ...brick,
                        schedule: {
                          ...brick.schedule,
                          dependency: e.target.value.schedule.id
                        }
                      })
                    }
                  >
                    {getGroupBrickSelectList().map(brickCreated => (
                      <MenuItem value={brickCreated}>{brickCreated.brick.name}</MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {displayScheduleCustomFrequency && (
                <BrickCustomFrequency schedule={brick.schedule} updateSchedule={updateSchedule} />
              )}
            </div>
            <div
              className={classNames('', {
                'brick-border': showGroupsToApply === 'yes'
              })}
            >
              {action === 'create' &&
                brick.brick.category !== 'RANDOMISATION' &&
                checkBrickRandomisation() && (
                  <div style={{ marginTop: '20px' }}>
                    <InputLabel htmlFor="brick-select-label" style={{ margin: '10px 0' }}>
                      Would you like to apply this brick to other groups ?
                    </InputLabel>
                    <RadioGroup
                      value={showGroupsToApply}
                      aria-label="radio groups to apply brick"
                      name="radio groups to apply brick"
                      style={{ display: 'flex', flexDirection: 'row' }}
                      onChange={e => setShowGroupsToApply(e.target.value)}
                    >
                      <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </div>
                )}
              {action === 'create' &&
                brick.brick.category !== 'RANDOMISATION' &&
                showGroupsToApply === 'yes' && (
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <FormControl style={{ width: '400px' }}>
                      <InputLabel htmlFor="select-multiple-chip">Group(s) to apply </InputLabel>
                      <Select
                        style={{ width: '400px' }}
                        multiple
                        value={groupsToApply}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                          <div>
                            {selected.map(value => (
                              <Chip
                                key={value}
                                label={
                                  studyModel.initial_group === value ? 'pre randomisation' : value
                                }
                              />
                            ))}
                          </div>
                        )}
                      >
                        {groupsToDisplay.map(childId => (
                          <div
                            className="timepoints-details__select-list-item"
                            key={childId}
                            value={childId}
                            style={{ display: 'flex' }}
                          >
                            <Checkbox checked={groupsToApply.includes(childId)} color="default" />
                            <MenuItem className="menu-item">
                              Group{' '}
                              {studyModel.initial_group === childId ? 'pre randomisation' : childId}
                            </MenuItem>
                          </div>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          checked={groupsToDisplay.length === groupsToApply.length}
                          color="default"
                        />
                      }
                      label="All groups"
                      labelPlacement="end"
                      onChange={() => {
                        setGroupsToApply(
                          groupsToDisplay.length !== groupsToApply.length
                            ? [...groupsToDisplay]
                            : []
                        )
                      }}
                      style={{ marginLeft: '20px', fontSize: '16px' }}
                    />
                  </div>
                )}
            </div>
            <div
              className={classNames('', {
                'brick-border': showAddConsumable === 'yes'
              })}
            >
              {brick.brick.category === 'TRAITEMENT' && (
                <div style={{ marginTop: '20px' }}>
                  <InputLabel htmlFor="brick-select-label" style={{ margin: '10px 0' }}>
                    Would you like to add a consumable ?
                  </InputLabel>
                  <RadioGroup
                    value={showAddConsumable}
                    aria-label="radio groups to add consumable"
                    name="radio groups to add consumable"
                    style={{ display: 'flex', flexDirection: 'row' }}
                    onChange={e => setShowAddConsumable(e.target.value)}
                  >
                    <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
                    <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
                  </RadioGroup>
                </div>
              )}
              {brick.brick.category === 'TRAITEMENT' && showAddConsumable === 'yes' && (
                <Fragment>
                  <div>
                    <ConsumableAutocomplete
                      isAutoCompleteEditable={true}
                      consumables={consumables}
                      getConsumables={getConsumables}
                      onChange={value => {
                        setConsumableSelected(value)
                      }}
                      consumableValue={
                        consumableSelected.libelle_article
                          ? consumableSelected.libelle_article
                          : consumableSelected
                      }
                    />
                  </div>
                  <InputText
                    value={consumableDescription}
                    label="Description"
                    onChange={e => setConsumableDescription(e)}
                    multiline
                    margin="normal"
                    required
                  />
                </Fragment>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <div style={{ padding: '20px' }}>
              <Button onClick={cancel} color="primary">
                Cancel
              </Button>
              <Button
                disabled={isSubmitButtonDisabled()}
                onClick={() => {
                  handleCreateModifyBrick()
                }}
                color="primary"
              >
                {action === 'create' ? 'Create' : 'Save'}
              </Button>
            </div>
          </DialogActions>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default connect(state => {
  return {
    ...studyModelMapper(state),
    consumables: state.consumables,
    allGroups: state.groups.objects,
    study: state.study.object,
    brickParams: state.brickParams,
    bricksState: state.bricks
  }
}, actions)(BrickSelector)
