import { camelize } from './api_types'

export const createSetEndpoints = function(name, endpoint, res) {
  Object.assign(res.types, endpoint.types)

  const parentReducer = res.reducers[name]
  res.reducers[name] = (state = endpoint.initial, action) => {
    if (typeof parentReducer === 'function') {
      state = parentReducer(state, action)
    }

    switch (action.type) {
      case endpoint.types.PATCH_API_REQUEST:
        return {
          ...state,
          object: Object.assign({}, state.object, action.payload),
          previous: Object.keys(action.payload).reduce(
            (obj, field) => Object.assign(obj, state[field]),
            {}
          ),
          loadingFields: Object.keys(action.payload).reduce((loadingFields, field) => {
            return Object.assign({}, loadingFields, {
              [field]: loadingFields[field] ? loadingFields[field] + 1 : 1
            })
          }, state.loadingFields || {}),
          errorsFields: Object.keys(action.payload).reduce((errorsFields, field) => {
            return Object.assign({}, errorsFields, {
              [field]: null
            })
          }, state.errorsFields)
        }
      case endpoint.types.PATCH_API_SUCCESS:
        return {
          ...state,
          loadingFields: Object.keys(action.payload).reduce((loadingFields, field) => {
            return Object.assign({}, loadingFields, {
              [field]: loadingFields[field] ? loadingFields[field] - 1 : 0
            })
          }, state.loadingFields || {})
        }
      case endpoint.types.PATCH_API_ERROR:
        return {
          ...state,
          loadingFields: Object.keys(action.payload).reduce((loadingFields, field) => {
            return Object.assign({}, loadingFields, {
              [field]: loadingFields[field] ? loadingFields[field] - 1 : 0
            })
          }, state.loadingFields || {}),
          errorsFields: Object.assign({}, state.errorsFields, action.payload)
        }
      default:
        return state
    }
  }

  res.actions.push(dispatch =>
    endpoint.method.PATCH.reduce(
      (actions, field) =>
        Object.assign(actions, {
          [`set${camelize(name)}${camelize(field)}`]: (params, value) => {
            const payload = { [field]: value }

            dispatch({
              type: endpoint.types.PATCH_API_REQUEST,
              payload: payload,
              params,
              endpoint,
              field
            })
          }
        }),
      {}
    )
  )
}
