import React, { Component, Fragment } from 'react'
import { isEmpty, cloneDeep } from 'lodash'
import instance from 'service/api_base'
import { FormattedMessage } from 'react-intl'

import AssignmentIcon from '@material-ui/icons/Assignment'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import PeopleIcon from '@material-ui/icons/People'
import Modal from '@material-ui/core/Modal/index'
import ExpansionPanel from '@material-ui/core/ExpansionPanel/index'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index'
import ExpandMoreIcon from '@material-ui/core/SvgIcon/SvgIcon'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index'
// import DollarMoneyIcon from '@material-ui/icons/AttachMoney'
import AccessTime from '@material-ui/icons/AccessTime'

import EuroMoneyIcon from '@material-ui/icons/EuroSymbol'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions/index'
import Button from '@material-ui/core/Button/index'

import Spinner from 'app/components/Spinner'
import ConfirmPopup from 'app/components/ConfirmPopup'
import AddButton from 'app/components/AddButton'
import CreateContentItem from './CreateContentItem'

import { getCustomSubcontractingsUrl } from '../StudyCustomSubcontracting'

const icons = {
  customTasks: <AssignmentIcon />,
  customConsumables: <ShoppingBasketIcon />,
  subcontractings: <PeopleIcon />
}

class TabContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTabContent: {},
      openCreateModifyModal: false,
      itemInfos: {},
      actionCreateModifyModal: null,
      openConfirmPopup: false,
      expanded: -1,
      itemId: -1
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : -1
    })
  }

  handleDelete = () => {
    const { type, getStudyCosting, study } = this.props
    const { itemId } = this.state
    const url = getCustomSubcontractingsUrl[type]

    instance
      .delete(`api/v1/${url}/${itemId}/`)
      .then(data => {
        if (data.status === 204) {
          const { currentTabContent } = this.state

          const itemsCloned = cloneDeep(currentTabContent)
          //Remove the item that has been deleted from the objects array and update
          // the local react state with this new objects array
          itemsCloned.objects = itemsCloned.objects.filter(item => item.id !== itemId)
          this.setState({ currentTabContent: itemsCloned, openConfirmPopup: false })
          getStudyCosting(study.object.id)
        }
      })
      .catch(err => {})
  }

  getCustomSubcontractings = () => {
    const { studyModel, getCustomTasks, getCustomConsumables, getSubcontractings } = this.props

    getCustomTasks({ study_model_id: studyModel.id })
    getCustomConsumables({ study_model_id: studyModel.id })
    getSubcontractings({ study_model_id: studyModel.id })
  }

  componentDidMount() {
    const {
      getFunctionJobs,
      getConsumables,
      getLaboratories,
      customTasks,
      customConsumables,
      subcontractings,
      type
    } = this.props
    let selectTabContent = {}

    getFunctionJobs()
    getConsumables()
    getLaboratories()
    this.getCustomSubcontractings()
    if (type === 'customTasks') selectTabContent = cloneDeep(customTasks)
    else if (type === 'customConsumables') selectTabContent = cloneDeep(customConsumables)
    else if (type === 'subcontractings') selectTabContent = cloneDeep(subcontractings)
    this.setState({ currentTabContent: selectTabContent })
  }

  modify = () => {
    const { resetCustomTasks, studyModel } = this.props

    resetCustomTasks(null, {
      description: 'ornella',
      hours: 1,
      labor_type: {
        id: 1,
        name: 'TEC',
        description: 'test',
        hourly_rate: 1
      },
      total_cost: 0,
      study_model_id: studyModel.id
    })
  }

  closeUpdateCustomsSubcontractings = newItem => {
    const { currentTabContent } = this.state
    const itemsCloned = cloneDeep(currentTabContent)
    //Remove the item that has been deleted from the objects array and update
    // the local react state with this new objects array
    // itemsCloned.objects = itemsCloned.objects.filter(item => item.id !== itemId)
    itemsCloned.objects = itemsCloned.objects.map(item => {
      return item.id === newItem.id ? newItem : item
    })
    this.setState({ currentTabContent: itemsCloned, openCreateModifyModal: false })
  }

  componentDidUpdate(prevProps) {
    const {
      type,
      customTasks,
      customConsumables,
      subcontractings,
      studyModel,
      getStudyCosting,
      study
    } = this.props
    const { openCreateModifyModal } = this.state
    let currentTabContent = {}
    let prevTabContent = {}

    if (prevProps.studyModel.id !== studyModel.id) this.getCustomSubcontractings()

    //Set state openCreateModifyModal false if customs or subcontractings have been created
    if (type === 'customTasks') {
      currentTabContent = cloneDeep(customTasks)
      prevTabContent = cloneDeep(prevProps.customTasks)
    } else if (type === 'customConsumables') {
      currentTabContent = cloneDeep(customConsumables)
      prevTabContent = cloneDeep(prevProps.customConsumables)
    } else if (type === 'subcontractings') {
      currentTabContent = cloneDeep(subcontractings)
      prevTabContent = cloneDeep(prevProps.subcontractings)
    }

    if (
      openCreateModifyModal === true &&
      prevTabContent.creating &&
      prevTabContent.creating.loading === true &&
      currentTabContent.creating &&
      currentTabContent.creating.loading === false &&
      !isEmpty(currentTabContent.creating.object)
    )
      this.setState({ openCreateModifyModal: false })

    if (
      currentTabContent.objects.length !== prevTabContent.objects.length ||
      (!prevTabContent.creating && currentTabContent.creating)
    )
      this.setState({
        currentTabContent
      })

    //update costing when custom consumable/tasks or subcontractings has been created,
    // modified or deleted
    if (prevTabContent.loading && !currentTabContent.loading) {
      getStudyCosting(study.object.id)
      this.setState({ currentTabContent })
      this.setState({ openCreateModifyModal: false })
    }
  }

  render() {
    const { type, name, disabled } = this.props
    const {
      expanded,
      openConfirmPopup,
      itemInfos,
      actionCreateModifyModal,
      currentTabContent
    } = this.state

    if (currentTabContent.loading === true) return <Spinner />
    return (
      <div className="tab-content">
        {!isEmpty(currentTabContent.objects) &&
          currentTabContent.objects.map(contentTab => (
            <ExpansionPanel
              expanded={expanded === contentTab.id}
              onChange={this.handleChange(contentTab.id)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="tab-content__expansion-panel-summary">
                  <div className="tab-content__expansion-panel-summary-left">
                    {icons[type]}
                    <h2 style={{ margin: 0 }}>
                      {type === 'subcontractings' ? contentTab.label : contentTab.description}
                    </h2>
                  </div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ flexWrap: 'wrap' }}>
                <div style={{ width: '100%' }}>
                  {type === 'customTasks' && (
                    <Fragment>
                      <div>
                        <b>
                          <FormattedMessage id="Job function" />:{' '}
                        </b>{' '}
                        {contentTab.labor_type.name}
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <b>
                          <FormattedMessage id="Laboratory" />:{' '}
                        </b>{' '}
                        {contentTab.laboratory ? contentTab.laboratory.name : ''}
                      </div>
                      <div className="cost__wrapper-content">
                        <div>
                          <b>
                            <FormattedMessage id="Hourly rate" />:{' '}
                          </b>{' '}
                          {parseFloat(contentTab.labor_type.hourly_rate).toFixed(2)}
                        </div>
                        <div className="cost">
                          <AccessTime />
                          <div>
                            <b>
                              <FormattedMessage id="Hours" />:{' '}
                            </b>{' '}
                            {contentTab.hours}
                          </div>
                        </div>
                      </div>
                      <div className="cost" style={{ justifyContent: 'flex-end' }}>
                        <EuroMoneyIcon />
                        <div>
                          <b>Total: </b> {parseFloat(contentTab.total_cost).toFixed(2)}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {type === 'customConsumables' && (
                    <Fragment>
                      <h3>
                        {contentTab.consumable.libelle_article} -{' '}
                        {contentTab.consumable.libelle_complementaire}
                      </h3>
                      <div className="cost__wrapper-content">
                        <div>
                          <b>
                            <FormattedMessage id="Price" /> (HT):{' '}
                          </b>{' '}
                          {parseFloat(contentTab.consumable.prix_achat_ht).toFixed(2)}
                        </div>
                        <div>
                          <b>
                            <FormattedMessage id="Quantity" />:{' '}
                          </b>{' '}
                          {contentTab.quantity}
                        </div>
                      </div>
                      <div className="cost" style={{ justifyContent: 'flex-end' }}>
                        <EuroMoneyIcon />
                        <div>
                          <b>Total: </b> {parseFloat(contentTab.total_cost).toFixed(2)}
                        </div>
                      </div>
                    </Fragment>
                  )}
                  {type === 'subcontractings' && (
                    <Fragment>
                      <div className="cost">
                        <EuroMoneyIcon />
                        <FormattedMessage id="COST BEFORE REDUCTION" /> :{' '}
                        {parseFloat(contentTab.cost).toFixed(2)}
                      </div>
                      <div className="cost">
                        <EuroMoneyIcon />
                        <FormattedMessage id="COST REDUCTION" />:{' '}
                        {parseFloat(contentTab.reduc_cost).toFixed(2)}
                      </div>
                      <div className="cost">
                        <EuroMoneyIcon />
                        <FormattedMessage id="COST AFTER REDUCTION" />:{' '}
                        {parseFloat(contentTab.total_cost).toFixed(2)}
                      </div>
                    </Fragment>
                  )}
                </div>
              </ExpansionPanelDetails>
              {!disabled && (
                <ExpansionPanelActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() =>
                      this.setState({
                        itemInfos: contentTab,
                        actionCreateModifyModal: 'modify',
                        openCreateModifyModal: true
                      })
                    }
                  >
                    <FormattedMessage id="Modify" />
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.setState({ openConfirmPopup: true, itemId: contentTab.id })}
                  >
                    <FormattedMessage id="Delete" />
                  </Button>
                </ExpansionPanelActions>
              )}
            </ExpansionPanel>
          ))}
        {!disabled && (
          <div className="tab-content__add-btn">
            <AddButton
              add={() =>
                this.setState({
                  actionCreateModifyModal: 'create',
                  openCreateModifyModal: true
                })
              }
            />
          </div>
        )}
        <Modal
          className="tab-content__modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openCreateModifyModal && actionCreateModifyModal !== null}
          onClose={() => this.setState({ openCreateModifyModal: false })}
        >
          <CreateContentItem
            currentTabContent={currentTabContent}
            type={type}
            itemInfos={itemInfos}
            actionCreateModifyModal={actionCreateModifyModal}
            onClose={() => this.setState({ openCreateModifyModal: false })}
            closeUpdate={this.closeUpdateCustomsSubcontractings}
            {...this.props}
          />
        </Modal>
        <ConfirmPopup
          open={openConfirmPopup}
          onClose={() => this.setState({ openConfirmPopup: false })}
          onConfirm={() => this.handleDelete()}
          popUpText={`Are you sure you want to delete this ${name}?`}
        />
      </div>
    )
  }
}

export default TabContent
