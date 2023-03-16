import { connect } from 'react-redux'

import { getChoiceFieldsSelector } from 'app/services/choiceFields.selector'
import { getStateFieldData } from 'app/services/field.selector'
import { getActionCreator } from 'app/store/actions'
import removeDuplicateOption from 'app/utils/removeDuplicateOption'
import { getFieldValueInObjectSelector } from 'app/services/utils.selector'
import CegidAnimalsForm from './CegidAnimalsForm'

const mapStateToProps = state => ({
  animalSpecies: getChoiceFieldsSelector(state, 'studyChoiceFields', 'animal_species'),
  cegidAnimals: getStateFieldData(state, 'cegidAnimals'),
  inoculationMethods: getChoiceFieldsSelector(state, 'studyChoiceFields', 'inoculation_method'),
  cegidAnimalStrains: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'cegidAnimals', 'vm_strain')
  ),
  cegidAnimalProviders: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'cegidAnimals', 'libelle_fournisseur_principal')
  ),
  cegidAnimalOriginAreas: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'cegidAnimals', 'lieu_elevage_1_choix')
  ),
  cegidAnimalSexes: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'cegidAnimals', 'animaux_sexe_libelle')
  ),
  cegidAnimalAges: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'cegidAnimals', 'animaux_age_libelle')
  ),
  cegidAnimalWeights: removeDuplicateOption(
    getFieldValueInObjectSelector(state, 'cegidAnimals', 'animaux_poids_libelle')
  )
})

const mapDispatchToProps = dispatch => ({
  fetchEntities: (name, payload) => dispatch(getActionCreator(name, payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(CegidAnimalsForm)
