import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { sortBy, isEmpty, cloneDeep } from 'lodash'
import instance from 'service/api_base'

import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography/index'
import Button from '@material-ui/core/Button/index'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import ConsumableAutocomplete from '../../../../../../../ConsumableAutocomplete'
import Spinner from 'app/components/Spinner'
import InputText, { checkPositiveNumber } from 'app/components/Form'
import { getCustomSubcontractingsUrl } from '../../StudyCustomSubcontracting'
import {
  paramsSubcontractings,
  paramsCustomTasks,
  paramsCustomConsumables
} from './CreateContentItem.util'

const functionJobsPlaceholder = {
  ING: 'Scientist',
  PHD: 'Senior Scientist',
  TEC: 'Technician'
}

class CreateContentItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      //custom tasks
      taskFunctionJobSelected:
        props.actionCreateModifyModal === 'create' ? {} : cloneDeep(props.itemInfos.labor_type),
      taskLaboratorySelected:
        props.actionCreateModifyModal === 'create' ? {} : cloneDeep(props.itemInfos.laboratory),
      taskDescription:
        props.actionCreateModifyModal === 'create' ? '' : props.itemInfos.description,
      taskHours: props.actionCreateModifyModal === 'create' ? 0 : props.itemInfos.hours,

      //custom consumables
      consumableSelected:
        props.actionCreateModifyModal === 'create' ? {} : cloneDeep(props.itemInfos.consumable),
      consumableQuantity: props.actionCreateModifyModal === 'create' ? 0 : props.itemInfos.quantity,
      consumableDescription:
        props.actionCreateModifyModal === 'create' ? '' : props.itemInfos.description,

      //subcontractings
      subcontractingLabel: props.actionCreateModifyModal === 'create' ? '' : props.itemInfos.label,
      subcontractingCosting: props.actionCreateModifyModal === 'create' ? 0 : props.itemInfos.cost,
      subcontractingCostingReduction:
        props.actionCreateModifyModal === 'create' ? 0 : props.itemInfos.reduc_cost
    }
  }

  componentDidMount() {
    const { type, actionCreateModifyModal, functionJobs, consumables, itemInfos } = this.props

    if (type === 'customTasks' && actionCreateModifyModal === 'modify')
      this.setState({
        taskFunctionJobSelected: cloneDeep(
          functionJobs.objects.find(functionJob => functionJob.id === itemInfos.labor_type.id)
        )
      })
    else if (type === 'customConsumables' && actionCreateModifyModal === 'modify')
      this.setState({
        consumableSelected: cloneDeep(
          consumables.objects.find(consumable => consumable.id === itemInfos.consumable.id)
        )
      })
  }

  submitTask = () => {
    const { createCustomTasks, studyModel } = this.props
    const {
      taskDescription,
      taskHours,
      taskFunctionJobSelected,
      taskLaboratorySelected
    } = this.state

    if (!isEmpty(taskFunctionJobSelected) && studyModel.id && taskHours > 0)
      createCustomTasks(
        null,
        paramsCustomTasks({
          taskDescription,
          taskHours,
          taskFunctionJobSelected,
          studyModel,
          taskLaboratorySelected
        })
      )
  }

  submitConsumable = () => {
    const { createCustomConsumables, studyModel } = this.props
    const { consumableSelected, consumableQuantity, consumableDescription } = this.state

    if (!isEmpty(consumableSelected) && consumableQuantity > 0 && consumableDescription)
      createCustomConsumables(
        null,
        paramsCustomConsumables({
          consumableSelected,
          consumableQuantity,
          consumableDescription,
          studyModel
        })
      )
  }

  submitSubcontracting = () => {
    const { createSubcontractings, studyModel } = this.props
    const {
      subcontractingLabel,
      subcontractingCosting,
      subcontractingCostingReduction
    } = this.state

    if (subcontractingLabel && subcontractingCosting)
      createSubcontractings(
        null,
        paramsSubcontractings({
          subcontractingLabel,
          subcontractingCosting,
          studyModel,
          subcontractingCostingReduction
        })
      )
  }

  handleModify = () => {
    const { type, studyModel, itemInfos, closeUpdate } = this.props
    const url = getCustomSubcontractingsUrl[type]
    const {
      consumableSelected,
      consumableQuantity,
      consumableDescription,
      taskFunctionJobSelected,
      taskDescription,
      taskHours,
      taskLaboratorySelected,
      subcontractingLabel,
      subcontractingCosting,
      subcontractingCostingReduction
    } = this.state

    const getParams = () => {
      if (type === 'customTasks')
        return paramsCustomTasks({
          taskFunctionJobSelected,
          taskDescription,
          taskHours,
          studyModel,
          taskLaboratorySelected
        })
      else if (type === 'customConsumables')
        return paramsCustomConsumables({
          consumableSelected,
          consumableQuantity,
          consumableDescription,
          studyModel
        })
      else if (type === 'subcontractings')
        return paramsSubcontractings({
          subcontractingLabel,
          subcontractingCosting,
          subcontractingCostingReduction,
          studyModel
        })
      return {}
    }

    instance
      .put(`api/v1/${url}/${itemInfos.id}/`, getParams())
      .then(data => {
        if (data.status === 200) closeUpdate(data.data)
      })
      .catch(err => {})
    this.setState({ isLoading: true })
  }

  handleCreate = () => {
    const { type } = this.props

    type === 'customTasks' && this.submitTask()
    type === 'customConsumables' && this.submitConsumable()
    type === 'subcontractings' && this.submitSubcontracting()
  }

  handleOnChangeConsumable = value => {
    this.setState({ consumableSelected: value })
  }

  render() {
    const {
      type,
      onClose,
      functionJobs,
      currentTabContent,
      name,
      actionCreateModifyModal,
      laboratories,
      study
    } = this.props
    const {
      taskFunctionJobSelected,
      consumableSelected,
      taskDescription,
      taskHours,
      taskLaboratorySelected,
      consumableQuantity,
      subcontractingCostingReduction,
      subcontractingCosting,
      subcontractingLabel,
      consumableDescription,
      isLoading
    } = this.state
    const getLaboratoriesBelongingToStudySite = () => {
      const laboratoriesOnSite =
        laboratories.objects &&
        laboratories.objects.filter(laboratory => laboratory.site.id === study.object.site.id)

      return laboratoriesOnSite && sortBy(laboratoriesOnSite, laboratory => laboratory.name)
    }

    const formCreateCustomTask = () => (
      <Fragment>
        <InputText
          value={taskDescription}
          label="Description"
          onChange={e => this.setState({ taskDescription: e })}
          multiline
          margin="normal"
        />
        <InputText
          label="Hours"
          value={taskHours}
          errors={null}
          validators={[checkPositiveNumber]}
          onChange={e => {
            if (Number(e) > 0) this.setState({ taskHours: Number(e) })
          }}
          margin="normal"
          type="number"
          required
        />
        <div style={{ marginTop: '12px ' }}>
          <InputLabel style={{ fontSize: '12px' }} htmlFor="function-job" required>
            <FormattedMessage id="Job function" />
          </InputLabel>
          <Select
            style={{ width: '100%' }}
            renderValue={functionJob =>
              functionJob ? functionJobsPlaceholder[functionJob.name] : ''
            }
            value={taskFunctionJobSelected ? taskFunctionJobSelected : ''}
            onChange={e => this.setState({ taskFunctionJobSelected: e.target.value })}
          >
            {functionJobs.objects &&
              sortBy(functionJobs.objects, obj => obj.name).map(functionJob => (
                <MenuItem value={functionJob}>{functionJobsPlaceholder[functionJob.name]}</MenuItem>
              ))}
          </Select>
        </div>
        <div style={{ marginTop: '12px ' }}>
          <InputLabel style={{ fontSize: '12px', marginTop: '16px' }} htmlFor="laboratory" required>
            <FormattedMessage id="Laboratory" />
          </InputLabel>
          <Select
            style={{ width: '100%' }}
            renderValue={laboratory => (laboratory ? laboratory.name : '')}
            value={taskLaboratorySelected ? taskLaboratorySelected : ''}
            onChange={e => this.setState({ taskLaboratorySelected: e.target.value })}
          >
            {getLaboratoriesBelongingToStudySite().map(laboratory => (
              <MenuItem value={laboratory}>{laboratory.name}</MenuItem>
            ))}
          </Select>
        </div>
      </Fragment>
    )

    const formCreateCustomConsumables = () => (
      <div>
        <div style={{ marginTop: '10px' }}>
          <ConsumableAutocomplete
            isAutoCompleteEditable={false}
            consumables={this.props.consumables}
            getConsumables={this.props.getConsumables}
            onChange={this.handleOnChangeConsumable}
            consumableValue={consumableSelected ? consumableSelected.libelle_article : ''}
          />
        </div>
        {consumableSelected && consumableSelected.unit && (
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <b>Reference consumable:</b> {consumableSelected.ref_constructeur}
          </div>
        )}
        <InputText
          label="Quantity"
          value={consumableQuantity}
          validators={[checkPositiveNumber]}
          onChange={e => {
            if (Number(e) > 0) this.setState({ consumableQuantity: Number(e) })
          }}
          margin="normal"
          type="number"
        />
        <InputText
          value={consumableDescription}
          label="Description"
          onChange={e => this.setState({ consumableDescription: e })}
          multiline
          margin="normal"
          required
        />
      </div>
    )

    const formCreateSubcontractings = () => (
      <div>
        <InputText
          value={subcontractingLabel}
          label="Label"
          onChange={e => this.setState({ subcontractingLabel: e })}
          multiline
          margin="normal"
          required
        />
        <InputText
          style={{ width: '100%' }}
          label="Costing"
          value={subcontractingCosting}
          validators={[checkPositiveNumber]}
          onChange={e => {
            if (Number(e) > 0) this.setState({ subcontractingCosting: Number(e) })
          }}
          margin="normal"
          type="number"
          required
        />
        <InputText
          value={subcontractingCostingReduction}
          style={{ width: '100%' }}
          label="Reduction Costing"
          validators={[checkPositiveNumber]}
          onChange={e => {
            if (Number(e) > 0) this.setState({ subcontractingCostingReduction: Number(e) })
          }}
          margin="normal"
          type="number"
        />
      </div>
    )

    return (
      <div className="modal__wrapper" style={{ overflow: 'initial' }}>
        <div className="modal__header">
          <Typography variant="h6" id="modal-title">
            {actionCreateModifyModal.charAt(0).toUpperCase() + actionCreateModifyModal.slice(1)} a
            new {name}
          </Typography>
        </div>
        {currentTabContent.loading ||
        (currentTabContent.creating && currentTabContent.creating.loading) ||
        isLoading ? (
          <div className="modal__content">
            <Spinner />
          </div>
        ) : (
          <div className="modal__content">
            {type === 'customTasks' && formCreateCustomTask()}
            {type === 'customConsumables' && formCreateCustomConsumables()}
            {type === 'subcontractings' && formCreateSubcontractings()}
            <div className="btn-submit-cancel">
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  actionCreateModifyModal === 'create' ? this.handleCreate() : this.handleModify()
                }
              >
                <FormattedMessage id={actionCreateModifyModal === 'create' ? 'Create' : 'Save'} />
              </Button>
              <Button variant="outlined" color="primary" onClick={() => onClose()}>
                {/*<FormattedMessage id="Cancel" />*/}
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CreateContentItem
