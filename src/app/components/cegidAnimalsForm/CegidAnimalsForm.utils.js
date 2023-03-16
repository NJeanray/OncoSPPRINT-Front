import { isEmpty } from 'lodash'

export default function checkAnimalsEmptyOptions(
  animalsData,
  cegidAnimalOriginAreas,
  cegidAnimalSexes
) {
  if (animalsData) {
    if (
      animalsData.get('animalProvider') &&
      !animalsData.get('animalOriginArea') &&
      isEmpty(cegidAnimalOriginAreas)
    )
      return true
    return !!(
      animalsData.get('animalProvider') &&
      animalsData.get('animalOriginArea') &&
      !animalsData.get('animalSex') &&
      isEmpty(cegidAnimalSexes)
    )
  }
  return false
}
