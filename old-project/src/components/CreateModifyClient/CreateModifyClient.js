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
import { inputs, clientInit } from './CreateModifyClient.utils'

class CreateModifyClient extends PureComponent {
  state = {
    client: {
      ...clientInit
    },
    options: [],
    isLoading: true,
    isDropdownOpen: false
  }

  ///// START
  renderInput = (inputProps, openMenu) => {
    const { InputProps, ref, value, ...other } = inputProps

    return (
      <InputText
        value={value}
        label="Client"
        onFocus={openMenu}
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
        {suggestion.nom_client}
      </MenuItem>
    )
  }

  handleSelectedItem = selectedItem => {
    const { options } = this.state
    const { onChange } = this.props
    const getItemObject = options.filter(option => option.nom_client === selectedItem)

    if (!_.isEmpty(getItemObject)) onChange(getItemObject[0])
  }

  ////// END

  componentDidMount() {
    this.props.getClientsBrains()
  }

  componentDidUpdate(prevProps) {
    const { clientsBrains, clients } = this.props

    if (prevProps.clientsBrains.objects !== clientsBrains.objects) {
      this.setState({
        isLoading: false,
        options: clientsBrains.objects
      })
    } else if (!_.isEmpty(clients.creating)) {
      this.handleCancel()
      this.props.onClose()
    }
  }

  updateState = (field, value) => {
    const { client } = this.state
    const clientCopy = _.cloneDeep(client)

    clientCopy[field] = value
    this.setState({ client: clientCopy })
  }

  initializeClient = () =>
    this.setState({
      client: {
        ...clientInit
      }
    })

  handleSubmit = () => {
    const { client } = this.state

    client.identifiant = client.identifiant.concat(moment().format())
    if (client.nom_client.trim() !== '') this.props.createClients(null, client)
  }

  handleCancel = () => {
    this.setState({
      options: [],
      value: '',
      inputValue: ''
    })
    this.props.onClose()
  }

  updateIsOpen = isOpen => {
    const { isDropdownOpen } = this.state

    if (isOpen !== isDropdownOpen) this.setState({ isDropdownOpen: isOpen })
  }

  render() {
    const { type } = this.props
    const {
      isLoading,
      client,
      options
      // isDropdownOpen
    } = this.state
    const optionsFiltered = inputValue =>
      options.filter(option => option.nom_client.toLowerCase().includes(inputValue.toLowerCase()))

    return (
      <div
        className="modal__wrapper"
        // style={{ overflow: isDropdownOpen ? 'visible' : 'scroll'}}
      >
        <div className="modal__header">
          <Typography variant="h6" id="modal-title">
            {type === 'create' ? 'Create a new ' : 'Modify '} client
          </Typography>
        </div>
        {isLoading ? (
          <Spinner>Loading...</Spinner>
        ) : (
          <form className="modal__content" style={{ width: '300px' }}>
            <Downshift
              id="downshift-simple"
              onStateChange={({ inputValue }) => {
                if (inputValue && inputValue.trim() === '') this.initializeClient()
                return inputValue && this.updateState('nom_client', inputValue)
              }}
              selectedItem={this.state.client.nom_client}
              onSelect={selectedItem => {
                const getSelectedItemObj =
                  options && options.filter(option => option.nom_client === selectedItem)
                this.setState({ client: getSelectedItemObj[0] })
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
                  {this.updateIsOpen(isOpen)}
                  {this.renderInput({
                    fullWidth: true,
                    InputProps: getInputProps({
                      onFocus: openMenu
                    })
                    // openMenu
                  })}
                  <div
                    {...getMenuProps()}
                    className="autocomplete__paper"
                    style={{
                      maxHeight: '300px',
                      overflow: 'scroll',
                      border: isOpen ? '1px solid whitesmoke' : 'none',
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
                              item: suggestion.nom_client
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
                value={client[input.id]}
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

export default CreateModifyClient
