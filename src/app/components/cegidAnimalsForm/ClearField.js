import React from 'react'

import ClearButton from 'app/components/clearButton'
import { PartAnimalsDataContext } from 'app/contexts/PartAnimalsDataProvider'

const ClearField = ({ field, requestFieldParams, cegidRequestParams, setCegidRequestParams }) => {
  const { animalsData, setAnimalsData, isFormDisabled } = React.useContext(PartAnimalsDataContext)

  function resetFields(fieldSelected) {
    if (fieldSelected === 'animalStrain') {
      setAnimalsData(
        animalsData
          .set('animalStrain', null)
          .set('animalProvider', null)
          .set('animalOriginArea', null)
          .set('animalSex', null)
          .set('animalAge', null)
          .set('animalWeight', null)
          .set('animalId', null)
      )
    } else if (fieldSelected === 'animalProvider') {
      setAnimalsData(
        animalsData
          .set('animalProvider', null)
          .set('animalOriginArea', null)
          .set('animalSex', null)
          .set('animalAge', null)
          .set('animalWeight', null)
          .set('animalId', null)
      )
    } else if (fieldSelected === 'animalOriginArea') {
      setAnimalsData(
        animalsData
          .set('animalOriginArea', null)
          .set('animalSex', null)
          .set('animalAge', null)
          .set('animalWeight', null)
          .set('animalId', null)
      )
    } else if (fieldSelected === 'animalSex') {
      setAnimalsData(
        animalsData
          .set('animalSex', null)
          .set('animalAge', null)
          .set('animalWeight', null)
          .set('animalId', null)
      )
    } else if (fieldSelected === 'animalAge') {
      setAnimalsData(animalsData.set('animalAge', null))
    } else if (fieldSelected === 'animalWeight') {
      setAnimalsData(animalsData.set('animalWeight', null))
    }

    setCegidRequestParams(
      requestFieldParams.reduce((acc, item) => {
        acc[item] = cegidRequestParams[item]
        return acc
      }, {})
    )
  }

  return (
    <ClearButton
      disabled={isFormDisabled}
      onClickFn={() => {
        resetFields(field)
      }}
    />
  )
}

export default ClearField
