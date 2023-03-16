import { ENDPOINT_LIST, ENDPOINT_OJBECT } from './endpoints'
import { camelize } from './api_types'

export const createBaseEndpoints = function(name, endpoint, res) {
  Object.assign(res.types, endpoint.types)

  if (endpoint.type === ENDPOINT_LIST) {
    res.reducers[name] = (state = endpoint.initial, action) => {
      if (typeof endpoint.reducer === 'function') {
        state = endpoint.reducer(state, action)
      }
      switch (action.type) {
        case endpoint.types.API_REQUEST:
          return { ...state, errors: null, loading: true, lastParams: action.payload }
        case endpoint.types.API_SUCCESS:
          const objects =
            typeof endpoint.mapper === 'function'
              ? endpoint.pagination
                ? endpoint.mapper(action.payload.results, state.objects || [])
                : endpoint.mapper(action.payload)
              : endpoint.pagination
              ? [...(state.objects || []), ...action.payload.results]
              : action.payload

          return {
            ...state,
            errors: null,
            loading: false,
            objects: objects,
            totalCount: endpoint.pagination ? action.payload.count : null
          }
        case endpoint.types.API_ERROR:
          return { ...state, errors: action.payload, loading: false }
        case endpoint.types.RESET:
          return {
            ...endpoint.initial
          }
        default:
          return state
      }
    }

    res.actions.push(dispatch => ({
      [`get${camelize(name)}`]: (params = {}) => {
        dispatch({ type: endpoint.types.API_REQUEST, payload: params, endpoint })
      },
      [`reset${camelize(name)}`]: (params = {}) => {
        dispatch({ type: endpoint.types.RESET })
      }
    }))
  } else if (endpoint.type === ENDPOINT_OJBECT) {
    res.reducers[name] = (state = endpoint.initial, action) => {
      if (typeof endpoint.reducer === 'function') {
        state = endpoint.reducer(state, action)
      }
      switch (action.type) {
        case endpoint.types.API_REQUEST:
          return {
            ...state,
            errors: null,
            loading: true,
            object: null,
            lastId: action.payload
          }
        case endpoint.types.API_SUCCESS:
          return {
            ...state,
            errors: null,
            loading: false,
            object:
              typeof endpoint.mapper === 'function'
                ? endpoint.mapper(action.payload)
                : action.payload
          }
        case endpoint.types.API_ERROR:
          return { ...state, errors: action.payload, loading: false }
        case endpoint.types.SET:
          return {
            ...state,
            object: Object.assign({}, state.object, action.payload)
          }
        default:
          return state
      }
    }

    res.actions.push(dispatch =>
      Object.assign(
        {
          [`get${camelize(name)}`]: params => {
            dispatch({ type: endpoint.types.API_REQUEST, payload: params, endpoint })
          }
        },
        (endpoint.method.PATCH ? endpoint.method.PATCH : []).reduce(
          (actions, field) =>
            Object.assign(actions, {
              [`set${camelize(name)}${camelize(field)}`]: param => {
                // TODO: this has not been implemented yet
              },
              [`update${camelize(name)}`]: params => {
                dispatch({ type: endpoint.types.SET, payload: params })
              }
            }),
          {}
        )
      )
    )
  }

  return res
}
