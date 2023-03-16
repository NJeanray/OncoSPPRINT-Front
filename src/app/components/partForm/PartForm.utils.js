import { fromJS } from 'immutable'

export const getErrorFieldName = errorField => {
  switch (errorField) {
    case 'humanization_type':
      return 'humanization nature'
    case 'animal_origin_zone':
      return 'animal origin area'
    case 'animal_per_cage':
      return 'animal per cage'
    case 'ethical_protocol_number':
      return 'ethical protocol number'
    case 'animal_irradiation':
      return 'animal irradiation'
    case 'irradiation_dose':
      return 'irradiation dose'
    default:
      return errorField
  }
}

export const healthyPartTypes = ['pk', 'tolérance']

export const getCurrentDate = () => {
  const currentDate = new Date()
  let month = (currentDate.getMonth() + 1).toString()
  let day = currentDate.getDate().toString()
  const year = currentDate.getFullYear().toString()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`
  return `${year}-${month}-${day}`
}

export const initializeAnimalsData = () => ({
  animalId: null,
  animalSpecie: null,
  animalStrain: null,
  animalProvider: null,
  animalOriginArea: null,
  animalSex: null,
  animalWeight: null,
  animalAge: null,
  animalsPerCage: null,
  animalInoculationMethod: null,
  isAnimalIrradiated: null,
  irradiationDose: null
})

export function setAnimalsDataFromPartSelected(setAnimalsData, partSelected) {
  setAnimalsData(
    fromJS({
      animalId: partSelected.get('animal_id'),
      animalSpecie: partSelected.get('animal_species'),
      animalStrain: partSelected.get('animal_strain'),
      animalProvider: partSelected.get('animal_provider'),
      animalOriginArea: partSelected.get('animal_origin_zone'),
      animalSex: partSelected.get('animal_sex'),
      animalWeight: partSelected.has('animal_weight') ? partSelected.get('animal_weight') : null,
      animalAge: partSelected.has('animal_age') ? partSelected.get('animal_age') : null,
      animalsPerCage: partSelected.get('animal_per_cage'),
      animalInoculationMethod: partSelected.get('inoculation_method'),
      isAnimalIrradiated: partSelected.get('animal_irradiation'),
      irradiationDose: partSelected.get('irradiation_dose')
    })
  )
}
