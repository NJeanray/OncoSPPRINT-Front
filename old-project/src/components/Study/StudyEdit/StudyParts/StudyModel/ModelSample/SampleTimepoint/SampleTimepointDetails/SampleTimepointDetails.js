import React, { Fragment } from 'react'
import { isEmpty } from 'lodash'
import { FormattedMessage } from 'react-intl'

import { FormControlLabel, InputLabel } from '@material-ui/core'
// import RadioGroup from '@material-ui/core/es/RadioGroup'
// import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'
import ConfirmPopup from '../../../../../../../ConfirmPopup'
import SmallSpinner from '../../../../../../../SmallSpinner'
import InputText, { checkPositiveNumber } from '../../../../../../../Form'
// import DialogContent from '@material-ui/core/DialogContent'

function SampleTimepointDetails({
  updateSampleArray,
  bricks,
  getBrickParams,
  studySiteId,
  sampleArray,
  studyModel,
  allGroups,
  disabled,
  index,
  deleteTimepoint,
  updateGroupIdError,
  setSnackbarOpen,
  brickParams
}) {
  function recursionGroupChild(childId, arr = [], index = 0) {
    if (studyModel.initial_group !== childId) arr.push(childId)
    if (allGroups[childId].children.length > 0) {
      allGroups[childId].children.map(id => {
        return recursionGroupChild(id, arr, index + 1)
      })
    }

    return arr
  }

  const [groupsToApply, setGroupsToApply] = React.useState([])
  const [postRandoGroups, setPostRandoGroups] = React.useState([])
  const [sampleSelected, setSampleSelected] = React.useState('')
  const [displayConfirmPopup, setDisplayConfirmPopup] = React.useState(false)
  const [params, setParams] = React.useState(initializeParams())
  const [displayBrickParams, setDisplayBrickParams] = React.useState(false)
  const [brickParamsVolume, setBrickParamsVolume] = React.useState(0)

  function initializeParams() {
    const newObj = {}

    Object.keys(brickParams.objects).forEach(key => {
      if (key !== 'animal_specie' && !key.includes('duration'))
        newObj[key] = brickParams.objects[key].values[0]
      else if (key.includes('duration')) newObj[key] = 1
    })
    return newObj
  }

  React.useEffect(() => {
    setParams(initializeParams)
  }, [brickParams])

  React.useEffect(() => {
    const allPostRandoGroups = recursionGroupChild(studyModel.initial_group)

    setPostRandoGroups(allPostRandoGroups)
  }, [])

  function handleChange(event) {
    setGroupsToApply(event.target.value)

    const newGroups = event.target.value.map(groupId => {
      const findGroup = sampleArray[index].groups.filter(group => group.id === groupId)

      return !isEmpty(findGroup) ? { ...findGroup[0] } : { id: groupId }
    })

    updateSampleArray([
      ...sampleArray.map((item, indexImagingArray) =>
        index === indexImagingArray
          ? {
              ...sampleArray[index],
              groups: [...newGroups]
            }
          : item
      )
    ])
  }

  function displayBrickParamsSelectLabel(key) {
    const firstLetterUpperCase = key.charAt(0).toUpperCase() + key.slice(1)

    if (key.includes('duration')) return firstLetterUpperCase.replace('_', ' ') + ' (in hours)'
    else if (key.includes('volume')) return firstLetterUpperCase.replace('_', ' ') + ' (mL)'
    return firstLetterUpperCase.replace('_', ' ')
  }

  function getBrickSelectedId(brickName) {
    getBrickParams({
      category: 'PRELEVEMENT',
      name: brickName,
      site: studySiteId
    })
    setSampleSelected(brickName)
    if (!displayBrickParams) setDisplayBrickParams(true)
  }

  function checkBeforeDisplayingGroups() {
    if (isEmpty(allGroups[studyModel.initial_group].children)) return true
    const returnFiltered = allGroups[studyModel.initial_group].group_bricks.filter(
      brick => brick.brick.category === 'RANDOMISATION'
    )

    if (!isEmpty(returnFiltered)) {
      if (sampleArray[index].days_after_d0 <= returnFiltered[0].days_after_d0) return true
    }
    return false
  }

  const groupsToDisplay = checkBeforeDisplayingGroups()
    ? [studyModel.initial_group]
    : [...postRandoGroups]

  return (
    <div>
      <div>
        <InputLabel htmlFor="brick-select-label" style={{ margin: '10px 0' }}>
          Sample Method
        </InputLabel>
        <Select
          disabled={disabled}
          style={{ width: '300px', display: 'flex' }}
          value={sampleSelected}
          onChange={e => getBrickSelectedId(e.target.value)}
        >
          {!isEmpty(bricks.objects) ? (
            bricks.objects.map(option => <MenuItem value={option.name}>{option.name}</MenuItem>)
          ) : (
            <SmallSpinner />
          )}
        </Select>
      </div>
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
                      {!key.toLowerCase().includes('volume') ? (
                        <Fragment>
                          <InputLabel style={{ display: 'flex' }} htmlFor="brick-select-label">
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
                        </Fragment>
                      ) : (
                        <InputText
                          label={displayBrickParamsSelectLabel(key)}
                          validators={[checkPositiveNumber]}
                          margin="normal"
                          type="number"
                          inputProps={{ min: 0 }}
                          value={brickParamsVolume}
                          onChange={e => setBrickParamsVolume(e)}
                          required
                        />
                      )}
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
      {displayBrickParams &&
        !brickParams.loading &&
        (Object.keys(brickParams.objects).length === 0 ||
          (Object.keys(brickParams.objects).length === 1 &&
            Object.keys(brickParams.objects)[0] === 'animal_specie')) && (
          <div style={{ marginTop: '25px' }}>
            <span
              style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px', color: 'grey' }}
            >
              No params are required for this brick
            </span>
          </div>
        )}
      {sampleSelected && sampleSelected.toLowerCase().includes('sang') && (
        <div style={{ fontWeight: '600', fontSize: '16px', color: 'red' }}>
          Sorry, FACS are not available
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <FormControl style={{ width: '400px', marginTop: '20px' }}>
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
                    label={studyModel.initial_group === value ? 'pre randomisation' : value}
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
                  Group {studyModel.initial_group === childId ? 'pre randomisation' : childId}
                </MenuItem>
              </div>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '20px' }}>
          <FormControlLabel
            value="start"
            control={
              <Checkbox checked={groupsToDisplay.length === groupsToApply.length} color="default" />
            }
            label="All groups"
            labelPlacement="end"
            onChange={() => {
              setGroupsToApply(
                groupsToDisplay.length !== groupsToApply.length ? [...groupsToDisplay] : []
              )
              updateSampleArray([
                ...sampleArray.map((item, indexImagingArray) =>
                  index === indexImagingArray
                    ? {
                        ...sampleArray[index],
                        groups: [
                          ...groupsToDisplay.map(groupId => {
                            return { id: groupId }
                          })
                        ]
                      }
                    : item
                )
              ])
            }}
            style={{ marginLeft: '20px', fontSize: '16px' }}
          />
        </div>
      </div>
      {!isEmpty(groupsToApply) && (
        <div style={{ width: '800px', margin: '30px 0' }}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: '16px', fontWeight: '400' }}>Group</TableCell>
                  <TableCell align="right" style={{ fontSize: '16px', fontWeight: '400' }}>
                    Nb of animals per group
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupsToApply.map((groupId, indexGroupToApply) => (
                  <TableRow key={groupId}>
                    <TableCell component="th" scope="groupId" style={{ fontSize: '18px' }}>
                      <span style={{ width: '160px', display: 'flex' }}>
                        {studyModel.initial_group === groupId ? 'pre randomisation' : groupId}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <input
                        value={
                          sampleArray[index].groups.filter(group => group.id === groupId)[0]
                            .animalsNumber === 0
                            ? ''
                            : sampleArray[index].groups.filter(group => group.id === groupId)[0]
                                .animalsNumber
                        }
                        onChange={e => {
                          updateSampleArray(
                            sampleArray.map((item, indexImagingArray) =>
                              index === indexImagingArray
                                ? {
                                    ...sampleArray[index],
                                    groups: [
                                      ...sampleArray[index].groups.map(group => {
                                        if (group.id === groupId)
                                          return {
                                            ...group,
                                            animalsNumber: Number(e.target.value)
                                          }
                                        return indexGroupToApply === 0
                                          ? { ...group, animalsNumber: Number(e.target.value) }
                                          : { ...group }
                                      })
                                    ]
                                  }
                                : item
                            )
                          )
                          if (Number(e.target.value) > allGroups[groupId].animalsNumber)
                            updateGroupIdError(groupId, index)
                          else setSnackbarOpen(false)
                        }}
                        disabled={disabled}
                        style={{
                          outline: 'none',
                          width: '200px',
                          textAlign: 'end',
                          fontSize: '17px',
                          paddingBottom: '3px',
                          border: 'none',
                          borderBottom: '1px solid lightgrey',
                          marginRight: '15px'
                        }}
                        type="number"
                        min={0}
                        max={allGroups[groupId].animalsNumber}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="primary"
          onClick={() => {
            setDisplayConfirmPopup(true)
          }}
        >
          <FormattedMessage id={'DELETE'} />
        </Button>
      </div>
      <ConfirmPopup
        open={displayConfirmPopup}
        onClose={() => setDisplayConfirmPopup(false)}
        onConfirm={() => {
          deleteTimepoint(index)
          setDisplayConfirmPopup(false)
        }}
        popUpText={`Are you sure you want to delete this timepoint?`}
      />
    </div>
  )
}

export default SampleTimepointDetails
