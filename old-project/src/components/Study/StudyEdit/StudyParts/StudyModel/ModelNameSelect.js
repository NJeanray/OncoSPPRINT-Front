import { connectAdvanced } from 'react-redux'

import actions from '../../../../../actions'
import Select from '../../../../Select/Select'

export default connectAdvanced((dispatch, factoryOptions) => {
  let res = null
  const _actions = actions(dispatch)

  return (state, ownProps) => {
    if (
      res &&
      res.params.modelType !==
        (ownProps.instance.object.model_type ? ownProps.instance.object.model_type.name : null)
    ) {
      _actions.resetModelName()
    }
    if (
      res !== null &&
      res.options === state.modelName.objects &&
      res.optionsLoading === state.modelName.loading &&
      res.params.modelType ===
        (ownProps.instance.object.model_type ? ownProps.instance.object.model_type.name : null) &&
      ownProps.instance === res.instance
    )
      return res
    res = {
      ...ownProps,
      options: state.modelName.objects,
      fetcher: 'getModelName',
      optionsLoading: state.modelName.loading,
      params: {
        modelType: ownProps.instance.object.model_type
          ? ownProps.instance.object.model_type.name
          : null
      },
      getModelName: _actions.getModelName
    }
    return res
  }
})(Select)
