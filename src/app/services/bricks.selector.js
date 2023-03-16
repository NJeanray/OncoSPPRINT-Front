import { createSelector } from 'reselect'

export const brickParamFieldsAlreadySet = [
  'animal_strain',
  'animal_specie',
  'animal_number_by_cage'
]

function getAnimalStrainColor(animalStrain) {
  if (animalStrain && animalStrain.toLowerCase().includes('bl')) return 'black'
  if (animalStrain && animalStrain.toLowerCase().includes('nude')) return 'nude'
  return 'non_nude'
}

function between(number, min, max) {
  return number >= min && number <= max
}

function getAnimalNbByCageRange(ranges, animalSpecie, animalNumberByCage) {
  let rangeSelected = null
  let rangesFiltered = []

  if (animalSpecie === 'rat') rangesFiltered = ranges.filter(item => item === '[1-3]')
  else rangesFiltered = ranges.filter(item => item !== '[1-3]')

  rangesFiltered.forEach(range => {
    const rangeArray = range.split('-')

    if (
      between(
        animalNumberByCage,
        Number(rangeArray[0].substring(1, rangeArray[0].length)),
        Number(rangeArray[1].substring(0, rangeArray[1].length - 1))
      )
    )
      rangeSelected = range
  })

  return rangeSelected
}

const getBrickParams = state => {
  return state.data.getIn(['brickParams', 'data'])
}

export const getBrickParamsFields = createSelector([getBrickParams], brickParams => {
  if (!brickParams) return []

  return brickParams
    .valueSeq()
    .map(eachField => eachField.get('name'))
    .toJS()
})

export const getBrickParamsList = createSelector([getBrickParams], brickParams => {
  if (!brickParams) return []

  return brickParams
    .valueSeq()
    .map(eachField => ({
      field: eachField.get('name'),
      values: eachField.get('values')
    }))
    .toJS()
})

export const getBrickParamsFiltered = createSelector([getBrickParamsList], brickParamsList => {
  return brickParamsList.filter(brickParam => {
    return !brickParamFieldsAlreadySet.includes(brickParam.field)
  })
})

export const getBrickParamValues = createSelector(
  [state => getBrickParamsList(state), (_, partSelected) => partSelected],
  (brickParamsList, partSelected) => {
    const getValue = brickParams => {
      const { values, field } = brickParams

      if (field === 'animal_strain') return getAnimalStrainColor(partSelected.get('animal_strain'))
      if (field === 'animal_specie') return partSelected.get('animal_species')
      if (field === 'animal_number_by_cage')
        return getAnimalNbByCageRange(
          values,
          partSelected.get('animal_species'),
          partSelected.get('animal_per_cage')
        )
      return values[0]
    }

    return brickParamsList.reduce(
      (acc, brickParam) => ({
        ...acc,
        [brickParam.field]: getValue(brickParam)
      }),
      {}
    )
  }
)
