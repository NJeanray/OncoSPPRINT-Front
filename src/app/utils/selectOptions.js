import { sortBy } from 'lodash'

const getOptionItem = (eachField, labelFields, defaultField) => {
  const getLabelValue = () => {
    if (labelFields.length === 1) return eachField.get(labelFields[0])

    const firstField = eachField.get(labelFields[0])
    const secondField = eachField.get(labelFields[1])

    if (firstField.trim() === '' || secondField.trim() === '') return eachField.get(defaultField)
    return `${firstField} ${secondField}`
  }

  return {
    label: getLabelValue(),
    value: eachField.get('id')
  }
}

const setSelectOptions = (fieldState, labelFields, defaultField) => {
  const optionsArrayImmutable = fieldState
    .get('data')
    .valueSeq()
    .map(eachField => getOptionItem(eachField, labelFields, defaultField))
  return sortBy(optionsArrayImmutable.toJS(), [item => item.label.toLowerCase()])
}

export default setSelectOptions
