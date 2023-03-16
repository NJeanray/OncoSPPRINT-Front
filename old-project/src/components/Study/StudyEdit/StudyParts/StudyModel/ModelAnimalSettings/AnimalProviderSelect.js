import { connectAdvanced } from 'react-redux'

import actions from '../../../../../../actions'
import Select from '../../../../../Select/Select'

const getCodeAnimaux = animalsSpecie => {
  if (animalsSpecie) {
    if (animalsSpecie.vm_species === 'rat') {
      return 'RAT'
    }
    if (animalsSpecie.vm_species === 'souris') {
      return 'SOU'
    }
  }
  return null
}

export default connectAdvanced((dispatch, factoryOptions) => {
  let res = null
  const _actions = actions(dispatch)

  return (state, ownProps) => {
    if (
      res &&
      res.params.code_animaux_espece !== getCodeAnimaux(ownProps.instance.object.animalsSpecie)
    ) {
      _actions.resetAnimalProvider()
    }
    if (
      res !== null &&
      res.options === state.modelName.objects &&
      res.optionsLoading === state.modelName.loading &&
      res.params.code_animaux_espece === getCodeAnimaux(ownProps.instance.object.animalsSpecie) &&
      ownProps.instance === res.instance
    ) {
      return res
    }
    res = {
      ...ownProps,
      options: state.animalProvider.objects,
      fetcher: 'getAnimalProvider',
      optionsLoading: state.animalProvider.loading,
      params: {
        code_animaux_espece: getCodeAnimaux(ownProps.instance.object.animalsSpecie)
      },
      getAnimalProvider: _actions.getAnimalProvider,
      inputProps: {
        id: 'id',
        name: 'libelle_article'
      }
    }
    return res
  }
})(Select)
