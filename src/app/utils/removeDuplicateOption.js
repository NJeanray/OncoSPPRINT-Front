import { isEmpty } from 'lodash'

const removeDuplicateOption = options => {
  const optionsFiltered = options.reduce((acc, opt) => {
    const itemLabelAlreadyExist = acc.filter(existingItem => existingItem.label === opt.label)

    return isEmpty(itemLabelAlreadyExist) ? [...acc, opt] : acc
  }, [])

  return optionsFiltered
}

export default removeDuplicateOption
