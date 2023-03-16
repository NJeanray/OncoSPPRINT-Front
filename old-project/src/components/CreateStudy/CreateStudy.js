import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add'
import Spinner from '../Spinner'

import StudySiteSelect from './StudySiteSelect'
import CreateModifyClient from 'app/components/CreateModifyClient'
import CreateModifyContact from 'app/components/CreateModifyContact'
import InputText, { checkMaxLength } from 'app/components/Form'
import ClientAutocomplete from './StudyClientAutocomplete'
import ContactAutocomplete from './StudyContactAutocomplete'

class CreateStudy extends Component {
  state = {
    title: '',
    description: '',
    client: {},
    contact: {},
    site: null,
    errors: {},
    openModalCreateModifyClient: false,
    openModalCreateModifyContact: false,
    isLoading: false
  }

  setStudyTitle = title => this.setState({ title })
  setStudyDescription = description => this.setState({ description })
  setStudySite = (_, site) => this.setState({ site })
  setClient = clientValue => {
    this.setState({ client: clientValue })
    this.props.getContacts(clientValue.id)
  }
  setContact = contactValue => {
    this.setState({ contact: contactValue })
  }

  componentDidUpdate(prevProps) {
    const { studies, history, clients } = this.props
    const { title } = this.state

    if (
      prevProps.clients.objects !== clients.objects &&
      clients.creating &&
      clients.creating.object
    )
      this.setClient(clients.creating.object)
    else if (prevProps.studies.objects !== studies.objects) {
      this.setState({ isLoading: false })
      this.props.setNotification(`The study ${title} has successfully been created`)
      history.push('/')
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { title, description, client, contact, site } = this.state

    if (site) {
      this.props.createStudies(null, {
        title,
        site,
        client,
        contact,
        description
      })
      this.setState({ isLoading: true })
    }
  }

  openModal = modalName => {
    modalName === 'client'
      ? this.setState({ openModalCreateModifyClient: true })
      : this.setState({ openModalCreateModifyContact: true })
  }

  render() {
    const { client, isLoading } = this.state
    const { history } = this.props

    return (
      <div className="create-study__wrapper">
        <form method="POST" onSubmit={this.onSubmit}>
          <h1>
            <FormattedMessage id="Create a new Study" />
          </h1>
          {isLoading ? (
            <Spinner>Loading...</Spinner>
          ) : (
            <Paper classes={{ root: 'paper-root' }}>
              <div className="create-study__btn-create-wrapper">
                <Button
                  size="small"
                  onClick={() => this.openModal('client')}
                  variant="contained"
                  color="primary"
                >
                  <AddIcon />
                  <FormattedMessage id="Create Client" />
                </Button>
                <Button
                  disabled={_.isEmpty(client)}
                  size="small"
                  onClick={() => this.openModal('contact')}
                  variant="contained"
                  color="primary"
                >
                  <AddIcon />
                  <FormattedMessage id="Create Contact" />
                </Button>
              </div>
              <InputText
                id="study_title"
                label="Study Title"
                value={this.state.title}
                validators={[checkMaxLength(400)]}
                onChange={this.setStudyTitle}
                margin="normal"
                disabled={
                  typeof this.props.creating === 'object' && this.props.creating.loading === true
                }
                errors={
                  typeof this.props.creating === 'object' &&
                  this.props.creating.errors &&
                  this.props.creating.errors.title
                }
                required
              />
              <StudySiteSelect
                instance={{ object: this.state }}
                id="study_studysite"
                label="Study Site"
                field="site"
                onChange={this.setStudySite}
                disabled={
                  typeof this.props.creating === 'object' && this.props.creating.loading === true
                }
                errors={
                  typeof this.props.creating === 'object' &&
                  this.props.creating.errors &&
                  this.props.creating.errors.site
                }
                required
              />
              <ClientAutocomplete
                // clientValue={this.state.client}
                onChange={this.setClient}
                disabled={
                  typeof this.props.creating === 'object' && this.props.creating.loading === true
                }
                errors={
                  typeof this.props.creating === 'object' &&
                  this.props.creating.errors &&
                  this.props.creating.errors.client
                }
              />
              <ContactAutocomplete
                clientSelected={client}
                client={this.state.client}
                onChange={this.setContact}
                disabled={
                  typeof this.props.creating === 'object' && this.props.creating.loading === true
                }
                errors={
                  typeof this.props.creating === 'object' &&
                  this.props.creating.errors &&
                  this.props.creating.errors.contact
                }
              />
              <InputText
                id="study_description"
                label="Study Description"
                value={this.state.description}
                onChange={this.setStudyDescription}
                margin="normal"
                multiline
                disabled={
                  typeof this.props.creating === 'object' && this.props.creating.loading === true
                }
                errors={
                  typeof this.props.creating === 'object' &&
                  this.props.creating.errors &&
                  this.props.creating.errors.description
                }
              />
              <div className="btn-submit-cancel">
                <Button variant="contained" color="primary" type="submit">
                  <FormattedMessage id="SUBMIT" />
                </Button>
                <Button m={2} variant="outlined" color="primary" onClick={() => history.push('/')}>
                  <FormattedMessage id="CANCEL" />
                </Button>
              </div>
            </Paper>
          )}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.openModalCreateModifyClient}
            onClose={() => this.setState({ openModalCreateModifyClient: false })}
          >
            <CreateModifyClient
              type="create"
              onClose={() => this.setState({ openModalCreateModifyClient: false })}
            />
          </Modal>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.openModalCreateModifyContact}
            onClose={() => this.setState({ openModalCreateModifyContact: false })}
          >
            <CreateModifyContact
              clientSelected={client}
              type="create"
              onClose={() => this.setState({ openModalCreateModifyContact: false })}
            />
          </Modal>
        </form>
      </div>
    )
  }
}

export default CreateStudy
