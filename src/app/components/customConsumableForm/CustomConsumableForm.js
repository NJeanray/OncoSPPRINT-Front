import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import InputAdornment from '@material-ui/core/InputAdornment'

import ListFormBtn from 'app/components/listFormBtn'
import ConsumableSelect from 'app/components/consumableSelect'
import TextField from 'app/components/textField'
import displayFormErrors from 'app/utils/displayFormErrors'
import CustomConsumableWrapper from './CustomConsumableForm.styled'
import getErrorFieldName from './CustomConsumableForm.utils'

const CustomConsumableForm = ({
  action,
  handleCreateCustomConsumable,
  handleModifyCustomConsumable,
  customConsumableSelected,
  customConsumable
}) => {
  const [consumableToDisplay, setConsumableToDisplay] = useState(action === 'update')
  const [cost, setCost] = useState(0)
  const [description, setDescription] = useState(null)
  const [consumable, setConsumable] = useState(null)
  const [provider, setProvider] = useState('')
  const customConsumableError = customConsumable ? customConsumable.get('errors') : null
  const initializeCost = consumableCost => setCost(consumableCost)

  useEffect(() => {
    if (customConsumableSelected) {
      setCost(customConsumableSelected.get('cost'))
      setDescription(customConsumableSelected.get('description'))
      setConsumable({
        label: customConsumableSelected.get('libelle_article'),
        value: customConsumableSelected.get('consumable_id')
      })
      setProvider(customConsumableSelected.get('consumable_provider'))
    }
  }, [customConsumableSelected])

  const handleSelectConsumable = (consumables, consumableSelected) => {
    let consumableSelectedCost = 0

    if (consumableSelected) {
      consumableSelectedCost = consumables.getIn([
        consumableSelected.value.toString(),
        'prix_achat_ht'
      ])
      setProvider(
        consumables.getIn([consumableSelected.value.toString(), 'libelle_fournisseur_principal'])
          ? consumables.getIn([
              consumableSelected.value.toString(),
              'libelle_fournisseur_principal'
            ])
          : consumables.getIn([consumableSelected.value.toString(), 'libelle_fournisseur'])
      )
    }
    setCost(consumableSelectedCost)
    setConsumable(consumableSelected)
  }

  const customConsumableParamsToSend = () => ({
    consumable_id: consumable.value,
    cost: cost || 0,
    consumable_provider: provider,
    description
  })

  const isBtnDisabled = () => !consumable || !description

  return (
    <CustomConsumableWrapper cost={!!cost}>
      {customConsumableError && displayFormErrors(customConsumableError, getErrorFieldName)}
      <ConsumableSelect
        consumableToDisplay={consumableToDisplay}
        setConsumableToDisplay={setConsumableToDisplay}
        consumableData={consumable}
        onSelect={handleSelectConsumable}
        initializeCost={initializeCost}
      />
      <div className="cost-input__wrapper">
        <TextField
          type="number"
          disabled={!consumable}
          value={cost}
          width="100%"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label={<FormattedMessage id="customConsumable.cost" />}
          margin="normal"
          onChange={e => setCost(e.target.value)}
          inputProps={{
            onInput: e => {
              e.target.value = Number(e.target.value)
            },
            min: 0,
            shrink: true
          }}
        />
        <div className="cost-input__start-adornment">€</div>
      </div>
      <TextField
        disabled
        value={provider}
        width="100%"
        label={<FormattedMessage id="consumable.provider" />}
        margin="normal"
      />
      <TextField
        value={description}
        width="100%"
        label={<FormattedMessage id="customConsumable.description" />}
        margin="normal"
        onChange={e => setDescription(e.target.value)}
        multiline
        rowsMax="6"
      />
      <ListFormBtn
        handleModify={() => handleModifyCustomConsumable(customConsumableParamsToSend())}
        handleCreate={() => handleCreateCustomConsumable(customConsumableParamsToSend())}
        isBtnDisabled={isBtnDisabled()}
        action={action}
      />
    </CustomConsumableWrapper>
  )
}

export default CustomConsumableForm
