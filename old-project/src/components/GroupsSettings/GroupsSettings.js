import React, { Component, Fragment } from 'react'
import { isEmpty } from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar/index'
import Tabs from '@material-ui/core/Tabs/index'
import Tab from '@material-ui/core/Tab/index'
import { unstable_Box as Box } from '@material-ui/core/Box'

import Create from '@material-ui/icons/Create'
import Clear from '@material-ui/icons/Clear'
import SubdirectoryArrowRight from '@material-ui/icons/SubdirectoryArrowRight'

import InputText, { checkPositiveNumber } from '../Form'
import CATEGORIES from 'app/components/Brick/categories'
import SmallSpinner from 'app/components/SmallSpinner'
import BrickSelector from 'app/components/Brick/BrickSelector'
import BrickModify from 'app/components/Brick/BrickModify'
import ConfirmPopup from 'app/components/ConfirmPopup'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import instance from '../../service/api_base'

const styles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'lightgrey'
  }
})

const Brick = ({ group_brick, disabled, showConfirmPopup, modifyBrick }) => (
  <ListItem button alignItems="flex-start" className="list-item">
    <ListItemIcon>
      <SubdirectoryArrowRight />
    </ListItemIcon>
    <ListItemText>{group_brick.brick.name}</ListItemText>
    {!disabled && (
      <Fragment>
        <Create className="list-item__icon" onClick={() => modifyBrick(group_brick.id)} />
        <Clear className="list-item__icon" onClick={() => showConfirmPopup(group_brick.id)} />
      </Fragment>
    )}
    {group_brick.is_d0 && <Badge color="error" variant="dot" />}
  </ListItem>
)

class GroupBrickList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addOpen: false,
      creatingBrick: null,
      value: 0,
      displayBrickSelector: false,
      confirmPopupVisible: false,
      brickToDeleteId: -1,
      brickToModifyObj: {},
      openModifyModal: false
    }

    this.toggleAddOpen = event => {
      this.refAddButton = event.currentTarget
      this.setState({ addOpen: !this.state.addOpen })
    }
    this.createBrick = this.createBrick.bind(this)
    this.cancelCreateBrick = () => this.setState({ addOpen: false, creatingBrick: null })

    this.renderGroupBrick = group_brick => {
      return group_brick.id && this.props.group.group_bricks ? (
        <Brick
          key={group_brick.id}
          group_brick={group_brick}
          group={this.props.group}
          disabled={this.props.disabled}
          showConfirmPopup={brickToDeleteId => {
            this.setState({ confirmPopupVisible: true, brickToDeleteId: brickToDeleteId })
          }}
          modifyBrick={brickToModifyId => {
            const { group_bricks } = this.props.group

            const data = group_bricks.filter(item => item.id === brickToModifyId)
            if (!isEmpty(data)) {
              if (
                data[0].schedule &&
                data[0].schedule.frequency === 2 &&
                data[0].schedule.period === 'Q' &&
                data[0].schedule.interval === null
              )
                data[0].schedule.period = 'BID'
              else if (
                data[0].schedule &&
                data[0].schedule.frequency === 2 &&
                data[0].schedule.period === 'W'
              )
                data[0].schedule.period = 'TW'
              this.setState({ brickToModifyObj: data[0], openModifyModal: true })
              this.cancelCreateBrick()
              this.props.resetBrickParams()
            }
          }}
        />
      ) : (
        <SmallSpinner />
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { isFetching } = this.props
    const { openModifyModal } = this.state

    if (prevProps.isFetching && prevProps.isFetching !== isFetching && openModifyModal) {
      this.setState({ openModifyModal: false })
    } else if (prevProps.isFetching && prevProps.isFetching !== isFetching) this.cancelCreateBrick()
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  getBrickId = (brick, action, category, params, groupsToApply) => {
    const { study, studyModel } = this.props
    const { creatingBrick } = this.state
    const site = study.site.id
    const animal_specie = studyModel ? studyModel.animalsSpecie.vm_species : ''
    const urlCategory = action === 'create' ? creatingBrick.brick.category : category
    const brickNameUrl = brick.brick.name.replace('+', '%2B')

    const addParamAnimalSpecie = {
      ...params,
      animal_specie
    }
    const paramsStringified = JSON.stringify(addParamAnimalSpecie)

    instance
      .get(
        `/api/v1/brick/check_unique/?category=${urlCategory}&site=${site}&name=${brickNameUrl}&params=${paramsStringified}`,
        {}
      )
      .then(data => {
        if (data.status === 200) {
          brick.brick.id = data.data[0].id

          if (action === 'create') this.createBrick({ ...brick }, groupsToApply)
          else if (action === 'modify') this.modifyBrick({ ...brick })
        }
      })
      .catch(err => {})
  }

  addBrick(category, brickFrequency = true) {
    const brick = {
      brick: {
        category: category
      },
      params: [],
      is_d0: false,
      days_after_d0: 0,
      schedule: null
    }
    this.props.resetBrickParams()
    this.setState({ creatingBrick: brick })
  }

  createBrick(brick, groupsToApply) {
    if (this.props.group && brick) {
      this.props.setGroupBrick(this.props.group.id, [
        ...this.props.group.group_bricks.map(gb => ({
          ...gb,
          is_d0: brick.is_d0 ? false : gb.is_d0
        })),
        {
          ...brick,
          schedule: !brick.schedule
            ? {
                is_before: null,
                type: '',
                timepoints: null,
                interval: null,
                frequency: null,
                period: null,
                duration: null,
                duration2: null,
                time_hour: null,
                time_minute: null
              }
            : brick.schedule
        }
      ])

      if (!isEmpty(groupsToApply)) {
        groupsToApply.forEach(groupId => {
          this.props.setGroupBrick(groupId, [
            ...this.props.groups[groupId].group_bricks.map(gb => ({
              ...gb,
              is_d0: brick.is_d0 ? false : gb.is_d0
            })),
            {
              ...brick,
              schedule: !brick.schedule
                ? {
                    is_before: null,
                    type: '',
                    timepoints: null,
                    interval: null,
                    frequency: null,
                    period: null,
                    duration: null,
                    duration2: null,
                    time_hour: null,
                    time_minute: null
                  }
                : brick.schedule
            }
          ])
        })
      }
    }
  }

  modifyBrick = brick => {
    this.props.setGroupBrick(this.props.group.id, [
      ...this.props.group.group_bricks.map(gb => {
        if (gb.id === brick.id) return { ...brick }
        else
          return {
            ...gb,
            is_d0: brick.is_d0 ? false : gb.is_d0
          }
      })
    ])
  }

  handleDeleteBrick = () => {
    const { brickToDeleteId } = this.state
    const { group_bricks } = this.props.group

    const newGroupBricks = group_bricks.filter(item => item.id !== brickToDeleteId)

    this.props.setGroupsGroup_bricks(this.props.group, [
      ...newGroupBricks.map(gb => ({
        ...gb
      }))
    ])
    //if randomisation delete group children
    const getBrickToDelete = group_bricks.filter(item => item.id === brickToDeleteId)
    if (getBrickToDelete[0].brick.name.toLowerCase().includes('randomisation'))
      this.props.setGroupChildren(this.props.group.id)
    this.setState({ confirmPopupVisible: false })
  }

  shouldDisabledRandomisation = () => {
    return !isEmpty(
      this.props.group.group_bricks.filter(brick =>
        brick.brick.name.toLowerCase().includes('randomisation')
      )
    )
  }

  displayAndsSortGroupBricks = () => {
    if (this.props.group) {
      const bricksToDisplay = this.props.group.group_bricks.filter(
        group_brick => group_brick.brick.category !== 'PREPARATION CRBC'
      )
      const bricksSorted1 = []

      bricksToDisplay.forEach(brick => {
        if (brick.schedule && !brick.schedule.target_id) bricksSorted1.push(brick)
      })

      bricksToDisplay.forEach(brick => {
        if (brick.schedule && brick.schedule.target_id) {
          const index = bricksSorted1.findIndex(
            brickSorted => brickSorted.id === brick.schedule.target_id
          )
          const getIndexToAdd = () => {
            if (index === 0) {
              if (brick.schedule.is_before) return 0
              return index + 1
            }
            return brick.schedule.is_before ? index - 1 : index + 11
          }

          if (index === -1) bricksSorted1.push(brick)
          else bricksSorted1.splice(getIndexToAdd(), 0, brick)
        }
      })
      return bricksSorted1.map(this.renderGroupBrick)
    }
  }

  render() {
    const { disabled, isFetching, createChildrenStudyGroup } = this.props
    const { value, confirmPopupVisible, openModifyModal, brickToModifyObj } = this.state

    return (
      <div style={{ width: '100%' }}>
        <div style={{ marginLeft: '20px' }}>
          <Badge color="error" variant="dot" />
          <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '12px' }}>D0</span>
        </div>
        <List>{this.displayAndsSortGroupBricks()}</List>
        {!disabled && (
          <Paper classes={{ root: 'paper-root' }} style={{ padding: '0px' }}>
            <AppBar position="static">
              <Box display="flex" alignItems="center">
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab
                    onClick={() => this.addBrick(CATEGORIES.INDUCTION)}
                    label="INDUCTION"
                    disabled={disabled}
                  />
                  <Tab
                    onClick={() => this.addBrick(CATEGORIES.MONITORING)}
                    label="MONITORING"
                    disabled={disabled}
                  />
                  <Tab
                    onClick={() => this.addBrick(CATEGORIES.RANDOMISATION, false)}
                    label="RANDOMISATION"
                    disabled={disabled || this.shouldDisabledRandomisation()}
                  />
                  <Tab
                    onClick={() => this.addBrick(CATEGORIES.TREATMENT)}
                    label="TREATMENT"
                    disabled={disabled}
                  />
                </Tabs>
              </Box>
            </AppBar>
            <BrickSelector
              action={'create'}
              creatingBrick={this.state.creatingBrick}
              bricks={this.props.group ? this.props.group.group_bricks : []}
              cancel={this.cancelCreateBrick}
              save={this.getBrickId}
              animalsNumberLength={this.props.group ? this.props.group.animalsNumber : 0}
              isFetching={isFetching}
              group={this.props.group}
              createChildrenStudyGroup={createChildrenStudyGroup}
            />
          </Paper>
        )}
        <ConfirmPopup
          open={confirmPopupVisible}
          onClose={() => this.setState({ confirmPopupVisible: false })}
          onConfirm={() => this.handleDeleteBrick()}
          popUpText={`Are you sure you want to delete this brick?`}
        />
        <Modal
          className="tab-content__modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModifyModal}
          onClose={() => this.setState({ openModifyModal: false })}
          style={{ overflow: 'scroll' }}
        >
          <BrickModify onClose={() => this.setState({ openModifyModal: false })}>
            <BrickSelector
              action={'modify'}
              creatingBrick={brickToModifyObj}
              bricks={this.props.group ? this.props.group.group_bricks : []}
              cancel={() => this.setState({ openModifyModal: false })}
              save={this.getBrickId}
              animalsNumberLength={this.props.group ? this.props.group.animalsNumber : 0}
              isFetching={isFetching}
              group={this.props.group}
              createChildrenStudyGroup={createChildrenStudyGroup}
              getStudyCosting={this.props.getStudyCosting}
            />
          </BrickModify>
        </Modal>
      </div>
    )
  }
}

// const hasRandomisationBrick = group_bricks =>
//   isDefined(
//     group_bricks.find(gb => {
//       return gb.brick.category === CATEGORIES.RANDOMISATION
//     })
//   )

const GroupsSettings = ({
  groups,
  group,
  setGroupsAnimalsNumber,
  setGroupsGroup_bricks,
  resetBrickParams,
  disabled,
  setGroupBrick,
  isFetching,
  study,
  studyModel,
  createChildrenStudyGroup,
  setGroupChildren,
  setSnackbarOpen,
  getBrickParams,
  getStudyCosting
}) => {
  const checkNumberOfAnimals = group => {
    let count = 0

    groups[group.parent].children.forEach(childId => {
      if (groups[childId]) count += Number(groups[childId].animalsNumber)
    })
    return Number(count)
  }

  React.useEffect(() => {
    if (group.parent && groups[group.parent])
      setSnackbarOpen(
        studyModel.initial_group ? 'pre randomisation group' : `group ${this.props.group.parent}`,
        checkNumberOfAnimals(group) > Number(groups[group.parent].animalsNumber)
      )
  }, [group && group.animalsNumber])

  return (
    <Fragment>
      <InputText
        disabled={disabled}
        label="Number of Animals"
        value={group ? group.animalsNumber : 0}
        validators={[checkPositiveNumber]}
        inputProps={{ max: group.parent ? groups[group.parent].animalsNumber : null }}
        onChange={value => {
          if (value && value.trim() !== '') {
            if (group.parent && group.id === groups[group.parent].children[0]) {
              groups[group.parent].children.forEach(children =>
                setGroupsAnimalsNumber(groups[children], parseInt(value))
              )
            } else setGroupsAnimalsNumber(group, parseInt(value))
          }
        }}
        margin="normal"
        type="number"
        required
      />
      <GroupBrickList
        groups={groups}
        group={group}
        resetBrickParams={resetBrickParams}
        setGroupsGroup_bricks={setGroupsGroup_bricks}
        disabled={disabled}
        setGroupBrick={setGroupBrick}
        isFetching={isFetching}
        study={study}
        studyModel={studyModel}
        createChildrenStudyGroup={createChildrenStudyGroup}
        setGroupChildren={setGroupChildren}
        getBrickParams={getBrickParams}
        getStudyCosting={getStudyCosting}
      />
    </Fragment>
  )
}

export default withStyles(styles)(GroupsSettings)
