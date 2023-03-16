import React, { Component } from 'react'
import _ from 'lodash'
import Downshift from 'downshift'
import debounce from 'lodash'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'

import InputText from 'app/components/Form'

class ConsumableAutocomplete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      consumableInputValue: props.consumableValue
    }
  }

  renderInput = (inputProps, openMenu) => {
    const { InputProps, ref, value, ...other } = inputProps

    return (
      <InputText
        value={value}
        label="Consumable"
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

  renderSuggestion = ({ option, index, itemProps, highlightedIndex }) => (
    <MenuItem {...itemProps} key={option.libelle_article} selected={highlightedIndex === index}>
      {option.libelle_article.concat('  -  ', option.ref_constructeur)}
    </MenuItem>
  )

  handleSelectedItem = selectedItem => {
    const { onChange, consumables } = this.props
    const getItemObject = consumables.objects.filter(
      option => option.libelle_article === selectedItem
    )

    if (!_.isEmpty(getItemObject)) onChange(getItemObject[0])
    onChange(getItemObject[0])
  }

  render() {
    const { consumables, isAutoCompleteEditable, onChange } = this.props
    const { consumableInputValue } = this.state

    return (
      <div className="autocomplete">
        <Downshift
          id="downshift-simple"
          onSelect={selectedItem => {
            this.setState({ consumableInputValue: selectedItem })
            this.handleSelectedItem(selectedItem)
          }}
          onOuterClick={() => {
            if (!isAutoCompleteEditable) this.setState({ consumableInputValue: '' })
            else {
              onChange(consumableInputValue)
            }
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
                  onFocus: openMenu,
                  onChange: e => {
                    this.setState({ consumableInputValue: e.target.value })
                    debounce(this.props.getConsumables({ libelle_article: e.target.value }), 500)
                  },
                  value: this.state.consumableInputValue
                }),
                openMenu
              })}
              <div
                {...getMenuProps()}
                className="autocomplete__paper"
                style={{
                  maxHeight: '300px',
                  overflow: 'scroll'
                }}
              >
                {isOpen ? (
                  <Paper square style={{ zIndex: '20px' }}>
                    {inputValue.trim() !== '' &&
                      consumables &&
                      consumables.objects.map((option, index) =>
                        this.renderSuggestion({
                          option,
                          index,
                          itemProps: getItemProps({
                            item: option.libelle_article
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
      </div>
    )
  }
}

export default ConsumableAutocomplete
