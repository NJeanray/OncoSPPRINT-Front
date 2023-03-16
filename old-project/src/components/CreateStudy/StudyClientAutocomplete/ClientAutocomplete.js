import React, { PureComponent } from 'react'
import _ from 'lodash'
import Downshift from 'downshift'
import MenuItem from '@material-ui/core/MenuItem/index'
import Paper from '@material-ui/core/Paper/index'

import InputText from 'app/components/Form'

class ClientAutocomplete extends PureComponent {
  state = {
    options: []
  }

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

  componentDidMount() {
    this.props.getClients()
  }

  componentDidUpdate(prevProps) {
    const { clients } = this.props

    if (prevProps.clients.objects !== clients.objects)
      this.setState({ options: [...clients.objects] })
  }

  renderSuggestion = suggestionProps => {
    const { suggestion, index, itemProps, highlightedIndex } = suggestionProps

    return (
      <MenuItem {...itemProps} key={itemProps.id} selected={highlightedIndex === index}>
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

  render() {
    const { options } = this.state
    const optionsFiltered = inputValue =>
      options.filter(option => option.nom_client.toLowerCase().includes(inputValue.toLowerCase()))

    return (
      <div className="autocomplete">
        <Downshift
          id="downshift-simple"
          onSelect={selectedItem => this.handleSelectedItem(selectedItem)}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            openMenu
          }) => {
            return (
              <div>
                {this.renderInput({
                  fullWidth: true,
                  InputProps: getInputProps({
                    onFocus: openMenu
                  }),
                  openMenu
                })}
                <div
                  {...getMenuProps()}
                  className="autocomplete__paper"
                  style={{
                    maxHeight: '300px',
                    overflow: 'scroll',
                    border: isOpen ? '1px solid whitesmoke' : 'none',
                    minWidth: '300px',
                    width: 'fit-content'
                  }}
                >
                  {isOpen ? (
                    <Paper square style={{ zIndex: '20px' }}>
                      {_.isEmpty(optionsFiltered(inputValue)) && inputValue.trim() !== '' ? (
                        <MenuItem
                          selected
                          classes={{
                            root: 'menu-item',
                            selected: 'selected'
                          }}
                        >
                          No client found. Please create one.
                        </MenuItem>
                      ) : (
                        optionsFiltered(inputValue).map((suggestion, index) =>
                          this.renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.nom_client }),
                            highlightedIndex
                          })
                        )
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            )
          }}
        </Downshift>
      </div>
    )
  }
}

export default ClientAutocomplete
