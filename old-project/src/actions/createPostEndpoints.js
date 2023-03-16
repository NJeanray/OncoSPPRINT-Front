import { camelize } from './api_types'

export const createPostEndpoints = function(name, endpoint, res) {
  Object.assign(res.types, endpoint.types)

  const parentReducer = res.reducers[name]
  res.reducers[name] = (state = endpoint.initial, action) => {
    if (typeof parentReducer === 'function') {
      state = parentReducer(state, action)
    }

    switch (action.type) {
      case endpoint.types.POST_API_REQUEST:
        return { ...state, creating: { loading: true, data: action.payload, errors: null } }
      case endpoint.types.POST_API_SUCCESS:
        return {
          ...state,
          objects: [action.payload, ...state.objects],
          creating: { object: action.payload, loading: false, errors: null }
        }
      case endpoint.types.POST_API_ERROR:
        return { ...state, creating: { errors: action.payload, loading: false } }
      default:
        return state
    }
  }

  res.actions.push(dispatch => ({
    [`create${camelize(name)}`]: (params = {}, data) =>
      dispatch({
        type: endpoint.types.POST_API_REQUEST,
        payload: data,
        params: params,
        endpoint
      })
  }))

  return res
}
