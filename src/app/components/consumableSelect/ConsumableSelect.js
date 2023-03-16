import React, { useCallback, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { consumablesEndpoint } from 'app/api/endpoints'
import TextField from 'app/components/textField'
import ClearButton from 'app/components/clearButton'

import SearchSelect from 'app/components/searchSelect'

const ConsumableSelect = ({
  disabled = false,
  setConsumableToDisplay,
  consumableToDisplay,
  consumables,
  consumableData,
  isConsumablesLoading,
  fetchEntities,
  consumablesLibelleArticles,
  onSelect
}) => {
  const fetchConsumables = useCallback(libelleArticle => {
    const params = libelleArticle ? { libelle_article: libelleArticle } : {}

    fetchEntities('consumables', {
      endpoint: consumablesEndpoint(),
      params: {
        active: true,
        ...params
      }
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchConsumables()
  }, [fetchConsumables])

  const onSelectConsumable = itemSelected => onSelect(consumables, itemSelected)

  return (
    <div style={{ width: '100%' }}>
      {consumableToDisplay && consumableData && consumableData.label ? (
        <div style={{ display: 'flex' }}>
          <TextField
            disabled
            width="100%"
            label={<FormattedMessage id="customConsumable.consumable" />}
            value={consumableData?.label}
          />
          <ClearButton
            disabled={disabled}
            onClickFn={() => {
              onSelectConsumable('')
              setConsumableToDisplay(false)
            }}
          />
        </div>
      ) : (
        <SearchSelect
          disabled={disabled}
          isLoading={isConsumablesLoading}
          value={consumableData}
          setValue={() => {}}
          fetchOptions={fetchConsumables}
          options={consumablesLibelleArticles}
          label="customConsumable.consumable"
          required
          onSelect={onSelectedConsumable => onSelectConsumable(onSelectedConsumable)}
        />
      )}
    </div>
  )
}

export default ConsumableSelect
