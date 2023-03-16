import { camelize } from './api_types'
import instance from '../service/api_base'

export const createChildrenSetEndpoints = (parents, name, endpoint, res) => {
  if (name.endsWith('[]')) {
    name = name.substr(0, name.length - 2)
  }

  const ALL_TYPES = Object.values(endpoint.types).reduce(
    (res, value) => Object.assign(res, { [value]: true }),
    {}
  )

  res.reducers[endpoint.reducer] = (state = endpoint.initial, action) => {
    if (!ALL_TYPES[action.type]) {
      return state
    }

    switch (action.type) {
      case endpoint.types.SET:
        const updateObject = state.objects[state.currentChild]
        return {
          ...state,
          objects: {
            ...state.objects,
            [updateObject.id]: {
              ...updateObject,
              ...action.payload
            }
          }
        }
      case endpoint.types.ADD_CHILDREN:
        return {
          ...state,
          objects: action.payload.reduce(
            (objects, child) => Object.assign(objects, { [child.id]: child }),
            { ...state.objects }
          )
        }
      case endpoint.types.SELECT_CHILD:
        return {
          ...state,
          currentChild:
            typeof action.payload === 'object' && action.payload !== null && action.payload.id
              ? action.payload.id
              : action.payload
        }
      case endpoint.types.PATCH_API_REQUEST:
        return {
          ...state,
          objects: {
            ...state.objects,
            [action.object.id]: {
              ...state.objects[action.object.id],
              ...action.payload
            }
          }
        }
      case endpoint.types.PATCH_API_SUCCESS:
        return {
          ...state
        }
      case endpoint.types.PATCH_API_ERROR:
        return {
          ...state
        }
      case endpoint.types.POST_API_REQUEST:
        return {
          ...state,
          creating: {
            loading: true,
            data: action.payload,
            errors: null
          }
        }
      case endpoint.types.POST_API_SUCCESS:
        return {
          ...state,
          objects: Object.assign({}, state.objects, {
            [action.payload.id]: action.payload
          }),
          creating: {
            loading: false,
            object: action.payload,
            errors: null
          }
        }
      case endpoint.types.POST_API_ERROR:
        return {
          ...state,
          creating: {
            loading: false,
            data: state.creating ? state.creating.data : null,
            errors: action.payload
          }
        }
      case endpoint.types.DELETE_API_REQUEST:
        const deletedObject = state.objects[action.payload]
        return {
          ...state,
          objects: Object.keys(state.objects)
            .filter(o => o.id !== action.payload)
            .reduce((objects, id) => Object.assign(objects, { [id]: state.objects[id] }), {}),
          deleting: {
            loading: true,
            data: deletedObject,
            errors: null
          }
        }
      case endpoint.types.DELETE_API_SUCCESS:
        return {
          ...state,
          deleting: null
        }
      case endpoint.types.DELETE_API_ERROR:
        return {
          ...state,
          objects: {
            ...state.objects,
            [state.deleting.data.id]: state.deleting.data
          },
          deleting: {
            loading: false,
            errors: action.payload
          }
        }
      default:
        return state
    }
  }
  const baseActions = dispatch => ({
    [`select${camelize(endpoint.reducer)}Child`]: child =>
      dispatch({ type: endpoint.types.SELECT_CHILD, payload: child }),
    [`update${camelize(name)}`]: params => {
      dispatch({ type: endpoint.types.SET, payload: params })
    }
  })

  if (endpoint.method.PATCH) {
    res.actions.push(dispatch =>
      endpoint.method.PATCH.reduce(
        (actions, field) =>
          Object.assign(actions, {
            [`set${camelize(endpoint.reducer)}${camelize(field)}`]: (object, value) => {
              const payload = { [field]: value }
              dispatch({
                type: endpoint.types.PATCH_API_REQUEST,
                payload: payload,
                object,
                endpoint
              })
              instance
                .patch(object.resource_uri, payload)
                .then(r => {
                  dispatch({
                    type: endpoint.types.PATCH_API_SUCCESS,
                    payload: payload,
                    object,
                    endpoint
                  })
                })
                .catch(e => {
                  dispatch({
                    type: endpoint.types.PATCH_API_ERROR,
                    payload: { [field]: e },
                    object,
                    endpoint
                  })
                })
            }
          }),
        baseActions(dispatch)
      )
    )
  } else {
    res.actions.push(baseActions)
  }
}
