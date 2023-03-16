import { connect } from 'react-redux'

import actions from '../../../../../../actions'
import Select from '../../../../../Select/Select'

export default connect(
  state => ({
    options: state.animalSpecie.objects
      ? state.animalSpecie.objects.filter(animalSpecie => animalSpecie.vm_species)
      : state.animalSpecie.objects,
    fetcher: 'getAnimalSpecie',
    optionsLoading: state.animalSpecie.loading,
    inputProps: {
      id: 'vm_species',
      name: 'vm_species'
    }
  }),
  actions
)(Select)
