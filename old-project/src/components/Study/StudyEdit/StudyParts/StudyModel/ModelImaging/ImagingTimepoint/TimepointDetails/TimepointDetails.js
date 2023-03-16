import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'

import FormControl from '@material-ui/core/FormControl'
import { FormControlLabel, InputLabel } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
// import RadioGroup from '@material-ui/core/es/RadioGroup'
// import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'

import ConfirmPopup from '../../../../../../../ConfirmPopup'
// import SmallSpinner from '../../../../../../../SmallSpinner'

const positions = ['Right flank', 'Left flank', 'Back', 'Belly']

function TimepointDetails({
  updateImagingArray,
  imagingArray,
  studyModel,
  allGroups,
  disabled,
  index,
  biolumMethod,
  getBrickParams,
  brickParams,
  study,
  deleteTimepoint,
  updateGroupIdError,
  setImagingSnackbarOpen,
  isImagingSnackbarOpen,
                            // getGroupId
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
  // const [params, setParams] = React.useState(initializeParams());
  const [displayConfirmPopup, setDisplayConfirmPopup] = React.useState(false)

  // React.useEffect(() => {
  //   setParams(initializeParams)
  // }, [brickParams])

  // function initializeParams() {
  //   const newObj = {};
  //
  //   Object.keys(brickParams.objects).forEach(key => {
  //     if (key !== 'animal_specie' && !key.includes('duration'))
  //       newObj[key] = brickParams.objects[key].values[0]
  //     else if (key.includes('duration'))
  //       newObj[key] = 'short';
  //   })
  //   return newObj;
  // }

  React.useEffect(() => {
    const allPostRandoGroups = recursionGroupChild(studyModel.initial_group)

    setPostRandoGroups(allPostRandoGroups);
  }, []);

  React.useEffect(() => {
    getBrickParams({
      category: 'BIOLUMINESCENCE',
      name: biolumMethod,
      site: study.site.id,
    })
  }, [biolumMethod])

  // function handleSaveImaging() {
  //   const animal_specie = studyModel ? studyModel.animalsSpecie.vm_species : ''
  //   const addParamAnimalSpecie = {
  //     ...params,
  //     animal_specie
  //   }
  //
  //   getGroupId({
  //     urlCategory: 'BIOLUMINESCENCE',
  //     site: study.site.id,
  //     brickNameUrl: biolumMethod,
  //     paramsStringified: JSON.stringify(addParamAnimalSpecie)
  //   })
  // }

  function handleChange(event) {
    setGroupsToApply(event.target.value);

    const newGroups = event.target.value.map(groupId => {
      const findGroup = imagingArray[index].groups.filter(group => group.id === groupId)

      return (!isEmpty(findGroup)) ? {...findGroup[0]} : { id: groupId }
    })

    updateImagingArray([
      ...imagingArray.map((item, indexImagingArray) =>
        index === indexImagingArray
          ? {
            ...imagingArray[index],
            groups: [...newGroups]
          }
          : item)
    ])
  }

  function checkBeforeDisplayingGroups() {
    if (isEmpty(allGroups[studyModel.initial_group].children)) return true
    const returnFiltered = allGroups[studyModel.initial_group].group_bricks.filter(brick => brick.brick.category === 'RANDOMISATION')
    
    if (!isEmpty(returnFiltered)) {
      if (!returnFiltered[0].is_d0 && imagingArray[index].days_after_d0 <= returnFiltered[0].days_after_d0) return true
      else if (imagingArray[index].days_after_d0 <= 0) return true
    }
    return false
  }

  // function displayBrickParamsSelectLabel(key) {
  //   const firstLetterUpperCase = key.charAt(0).toUpperCase() + key.slice(1);
  //
  //   return firstLetterUpperCase.replace("_", " ");
  // }

  const groupsToDisplay = checkBeforeDisplayingGroups()
    ? [studyModel.initial_group]
    : [...postRandoGroups]

  function getLotsNumber(groupId) {
    const divider = studyModel.animalsSpecie && studyModel.animalsSpecie.vm_species === 'rat' ? 3 : 5
    const findGroup = imagingArray[index].groups.filter(group => group.id === groupId)

    if (!isEmpty(findGroup)) {
      // updateImagingArray([
      //   ...imagingArray.map((item, indexImagingArray) =>
      //     index === indexImagingArray
      //       ? {
      //         ...imagingArray[index],
      //         groups: [...imagingArray[index].groups.map(group => group.id === groupId
      //           ? {...imagingArray[index].groups[index], nbOfLots: findGroup[0].animalsNumber ? Math.ceil(findGroup[0].animalsNumber / divider) : 0}
      //           : group)]
      //       }
      //       : item)
      // ])
      return findGroup[0].animalsNumber ? Math.ceil(findGroup[0].animalsNumber / divider) : 0
    }
  }

  return (
    <div>
      {/*<div>*/}
      {/*  {*/}
      {/*    !brickParams.loading && Object.keys(brickParams.objects).length !== 0 && !(Object.keys(brickParams.objects).length === 1 && Object.keys(brickParams.objects)[0] === 'animal_specie') &&*/}
      {/*    <div style={{ marginTop: '20px' }}>*/}
      {/*      <span style={{ fontWeight: 'bold' }}>Params</span>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*  {*/}
      {/*    brickParams.loading &&*/}
      {/*    <div style={{ width: '270px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column' }}>*/}
      {/*      <span style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}>Looking for brick params...</span>*/}
      {/*      <SmallSpinner />*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*</div>*/}
      <div>
        <FormControl style={{ marginTop: '20px' }}>
          <InputLabel htmlFor="select-multiple-chip">Imaging Positions</InputLabel>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '20px' }}>
            <Select
              style={{ width: '400px' }}
              multiple
              value={imagingArray[index].positions}
              onChange={e =>
                updateImagingArray(
                  imagingArray.map((item, indexImagingArray) =>
                    index === indexImagingArray
                      ? { ...imagingArray[index], positions: e.target.value }
                      : item
                  )
                )
              }
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {positions.map(childId => (
                <div
                  className="timepoints-details__select-list-item"
                  key={childId}
                  value={childId}
                  style={{ display: 'flex' }}
                >
                  <Checkbox
                    checked={imagingArray[index].positions.includes(childId)}
                    color="default"
                  />
                  <MenuItem className="menu-item">Group {childId}</MenuItem>
                </div>
              ))}
            </Select>
            <FormControlLabel
              value="start"
              control={<Checkbox checked={imagingArray[index].positions.length === 4} color="default" />}
              label="All positions"
              labelPlacement="end"
              onChange={() => {
                updateImagingArray(
                  imagingArray.map((item, indexImagingArray) =>
                    index === indexImagingArray
                      ? {
                          ...imagingArray[index],
                          positions: imagingArray[index].positions.length !== 4 ? [...positions] : []
                        }
                      : item
                  )
                )
              }}
              style={{ marginLeft: '20px', fontSize: '16px' }}
            />
          </div>
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '20px' }}>
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
          <FormControlLabel
            value="start"
            control={<Checkbox checked={groupsToDisplay.length === groupsToApply.length} color="default" />}
            label="All groups"
            labelPlacement="end"
            onChange={() => {
              setGroupsToApply(groupsToDisplay.length !== groupsToApply.length ? [...groupsToDisplay] : [])
              updateImagingArray(
                [
                  ...imagingArray.map((item, indexImagingArray) =>
                    index === indexImagingArray
                      ? {
                        ...imagingArray[index],
                        groups: [...groupsToDisplay.map(groupId => {return { id: groupId }})]
                      }
                      : item)
                ]
              )
            }
            }
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
                  <TableCell align="right" style={{ fontSize: '16px', fontWeight: '400' }}>
                    Nb of lots
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
                        value={imagingArray[index].groups.filter(group => group.id === groupId)[0].animalsNumber === 0
                          ? "" : imagingArray[index].groups.filter(group => group.id === groupId)[0].animalsNumber}
                        onChange={e => {
                          updateImagingArray(
                            imagingArray.map((item, indexImagingArray) =>
                              index === indexImagingArray
                                ? {
                                  ...imagingArray[index],
                                  groups: [
                                    ...imagingArray[index].groups.map(group => {
                                      if (group.id === groupId)
                                        return {
                                          ...group,
                                          animalsNumber: Number(e.target.value)
                                        }
                                      return indexGroupToApply === 0 ? {...group, animalsNumber: Number(e.target.value)} : {...group}
                                    })
                                  ]
                                }
                                : item))
                          if (Number(e.target.value) > allGroups[groupId].animalsNumber)
                            updateGroupIdError(groupId, index)
                          else setImagingSnackbarOpen(false)
                        }}
                        onBlur={() => {
                          if (isImagingSnackbarOpen) {
                            updateImagingArray(
                              imagingArray.map((item, indexImagingArray) =>
                                index === indexImagingArray
                                  ? {
                                    ...imagingArray[index],
                                    groups: [
                                      ...imagingArray[index].groups.map(group => {
                                        if (group.id === groupId)
                                          return {
                                            ...group,
                                            animalsNumber: Number(0)
                                          }
                                        return indexGroupToApply === 0 ? {
                                          ...group,
                                          animalsNumber: Number(0)
                                        } : { ...group }
                                      })
                                    ]
                                  }
                                  : item))
                            setImagingSnackbarOpen(false)
                          }
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
                    <TableCell
                      component="th"
                      scope="groupId"
                      style={{ fontSize: '18px', paddingRight: '0' }}
                    >
                      <span style={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                        {getLotsNumber(groupId)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
        <Button
          style={{ marginRight: '10px', padding: '5px 20px' }}
          color="primary"
          variant="outlined"
          onClick={() =>
            // handleSaveImaging()
          }
        >
          <FormattedMessage id={'SAVE'} />
        </Button>
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

export default TimepointDetails