import React from 'react'
import { FormattedMessage } from 'react-intl'
import { isEmpty } from 'lodash'

import StyledSelect from 'app/components/select'

const BrickSelect = ({
  disabled = false,
  brickLabel,
  brickOptions,
  isBrickLoading,
  onSelectBrick,
  brickValue,
  brickParamsList,
  brickParams,
  setBrickParams
}) => {
  const displayBrickParams = () =>
    brickParamsList.map(param => (
      <StyledSelect
        disabled={disabled}
        label={`global.input.${param.field.toLowerCase()}`}
        value={brickParams[param.field]}
        onChange={e => setBrickParams({ ...brickParams, [param.field]: e.target.value })}
        options={param.values.map(value => ({
          value,
          label:
            value === 'TRUE' || value === 'FALSE' ? (
              <FormattedMessage id={`global.boolean.${value.toLowerCase()}`} />
            ) : (
              value
            )
        }))}
      />
    ))

  return (
    <>
      <StyledSelect
        disabled={disabled}
        label={brickLabel}
        value={brickValue}
        onChange={onSelectBrick}
        isLoading={isBrickLoading}
        options={brickOptions}
      />
      {!isEmpty(brickParamsList) && brickValue && displayBrickParams()}
    </>
  )
}

export default BrickSelect
