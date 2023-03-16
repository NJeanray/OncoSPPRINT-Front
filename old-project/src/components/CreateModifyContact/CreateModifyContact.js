import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import moment from 'moment'
import Downshift from 'downshift'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

import Spinner from 'app/components/Spinner'
import InputText, { checkMaxLength } from 'app/components/Form'
import { inputs, contactInit } from './CreateModifyContact.utils'

class CreateModifyContact extends PureComponent {
  state = {
    contact: {
      ...contactInit
    },
    options: [],
    isLoading: true
  }

  updateState = (field, value) => {
    const { contact } = this.state
    const contactCopy = _.cloneDeep(contact)

    contactCopy[field] = value
    this.setState({ contact: contactCopy })
  }

  initializeClient = () =>
    this.setState({
      contact: {
        ...contactInit
      }
    })

  renderInput = inputProps => {
    const { InputProps, ref, ...other } = inputProps
    const { value } = this.state

    return (
      <InputText
        value={value}
        label="Email"
        maxLength="254"
        InputProps={{
          inputRef: ref,
          ...InputProps
        }}
        required
        margin="normal"
        {...other}
      />
    )
  }

  renderSuggestion = suggestionProps => {
    const { suggestion, index, itemProps, highlightedIndex } = suggestionProps

    return (
      <MenuItem
        {...itemProps}
        // key={itemProps.id}
        selected={highlightedIndex === index}
      >
        {suggestion.contact}
      </MenuItem>
    )
  }

  componentDidMount() {
    const { clientSelected } = this.props

    if (clientSelected && clientSelected.id) this.props.getContactsBrains(clientSelected.id)
  }

  componentDidUpdate(prevProps) {
    const { contactsBrains, contacts } = this.props

    if (prevProps.contactsBrains.objects !== contactsBrains.objects)
      this.setState({
        isLoading: false,
        options: contactsBrains.objects
      })
    else if (!_.isEmpty(contacts.creating)) {
      this.handleCancel()
      this.props.onClose()
    }
  }

  handleSubmit = () => {
    const { contact } = this.state
    const { clientSelected } = this.props

    contact.identifiant = contact.identifiant.concat(moment().format())
    if (contact.email.trim() !== '' && contact.identifiant.trim() !== '')
      this.props.createContacts(clientSelected.id, contact)
  }

  handleCancel = () => {
    this.setState({
      options: [],
      value: ''
    })
    this.props.onClose()
  }

  render() {
    const { type } = this.props
    const { isLoading, contact, options } = this.state
    const optionsFiltered = inputValue =>
      options.filter(option => option.contact.toLowerCase().includes(inputValue.toLowerCase()))

    return (
      <div className="modal__wrapper">
        <div className="modal__header">
          <Typography variant="h6" id="modal-title">
            {type === 'create' ? 'Create a new ' : 'Modify '} contact
          </Typography>
        </div>
        {isLoading && <Spinner>Loading...</Spinner>}
        {!isLoading && (
          <form className="modal__content">
            <Downshift
              id="downshift-simple"
              onStateChange={({ inputValue }) => {
                if (inputValue && inputValue.trim() === '') this.initializeClient()
                return inputValue && this.updateState('email', inputValue)
              }}
              selectedItem={this.state.contact.email}
              onSelect={selectedItem => {
                const getSelectedItemObj = this.state.options.filter(
                  option => option.contact === selectedItem
                )
                this.setState({ contact: getSelectedItemObj[0] })
              }}
            >
              {({
                getInputProps,
                getItemProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                openMenu
              }) => (
                <div>
                  {this.renderInput({
                    fullWidth: true,
                    InputProps: getInputProps({
                      onFocus: openMenu
                    })
                  })}
                  <div
                    {...getMenuProps()}
                    className="autocomplete__paper"
                    style={{
                      maxHeight: '300px',
                      overflow: 'scroll',
                      border: isOpen ? '1px solid whitesmoke' : 'none',
                      width: 'fit-content',
                      maxWidth: '300px',
                      minWidth: '300px',
                      position: 'absolute',
                      zIndex: '100',
                      borderRadius: '5px'
                    }}
                  >
                    {isOpen ? (
                      <Paper square>
                        {optionsFiltered(inputValue).map((suggestion, index) =>
                          this.renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({
                              item: suggestion.email
                            }),
                            highlightedIndex
                          })
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              )}
            </Downshift>
            {inputs.map(input => (
              <InputText
                id={input.id}
                value={contact[input.id]}
                label={input.label}
                validators={[checkMaxLength(input.maxLength)]}
                onChange={value => this.updateState(input.id, value)}
                margin="normal"
              />
            ))}
            <div className="btn-submit-cancel">
              <Button variant="contained" color="primary" onClick={() => this.handleSubmit()}>
                <FormattedMessage id={type === 'create' ? `CREATE` : `SAVE MODIFICATIONS`} />
              </Button>
              <Button variant="outlined" color="primary" onClick={() => this.handleCancel()}>
                <FormattedMessage id="CANCEL" />
              </Button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

export default CreateModifyContact
