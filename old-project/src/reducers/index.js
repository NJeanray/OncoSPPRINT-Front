import { combineReducers } from 'redux'

import app from './app'
//import studies from './studies';
//import study from './study';
//import studyNature from './study-nature';
//import parts from './parts';
import * as basicReducers from './basic-reducers'
import { reducers } from '../actions/api_types'
/**
 * Redux state for a study
 * @typedef {Object} ReduxState
 * @property {boolean} hasPendingApiCall - Is UI blocked? (during GET on /costing)
 * @property {string} errorMessage - Explicit.
 * @property {[Object]} parts - Study Parts.
 */
//const reducers = Object.assign({}, basicReducers, { parts, app, studies, study, studyNature });
const tmp = Object.assign({}, basicReducers, reducers, { app })

/**
 * Root Study reducer
 * @see metadataReducer for the action convention.
 * @param {[Object]} state - Whole study state.
 * @param {Object} action - Redux action.
 * @param {string} action.type - Explicit.
 * @param {Object} action.payload - data to be processed.
 * @param {number?} action.payload.index - for update, insert or remove actions, index in the 'parts' array.
 * @param {Object?} action.payload.item - for update action, n.
 * @returns {ReduxState} - Study state.
 */
const allReducers = combineReducers(tmp)

/**
 * Trick to allow whole study state reset.
 * @see saveStudy
 * @param {[Object]} state - Whole study state.
 * @param {Object} action - Redux action.
 * @param {string} action.type - Explicit.
 */
export default function rootReducer(state, action) {
  if (action.type === 'APP_RESET') state = undefined
  else if (action.type === 'APP_SET') state = action.payload
  else if (action.type === 'SET_NOTIFICATION') {
    return {
      ...state,
      notification: action.payload
    }
  } else if (action.type === 'SET_GROUP_BRICK_SUCCESS') {
    return {
      ...state,
      groups: {
        objects: {
          ...state.groups.objects,
          [action.payload.id]: {
            ...state.groups.objects[action.payload.id],
            group_bricks: [...action.payload.group_bricks]
          }
        }
      }
    }
  } else if (action.type === 'SET_NEW_STUDY_MODEL_GROUP') {
    return {
      ...state,
      study_models: {
        ...state.study_models,
        objects: {
          ...state.study_models.objects,
          [action.payload.id]: {
            ...action.payload,
            initial_group: action.payload.initial_group.id
          }
        }
      },
      groups: {
        ...state.groups,
        currentChild: action.payload.initial_group.id,
        objects: {
          ...state.groups.objects,
          [action.payload.initial_group.id]: {
            ...action.payload.initial_group
          }
        }
      }
    }
  } else if (action.type === 'SET_GROUP_FETCHING') {
    return {
      ...state,
      groups: {
        ...state.groups,
        isFetching: action.payload
      }
    }
  } else if (action.type === 'SET_CHILDREN_STUDY_GROUP') {
    const childrenObj = action.payload.reduce(
      (map, { id, ...rest }) => ({ ...map, [id]: { ...rest, id: id } }),
      {}
    )

    return {
      ...state,
      groups: {
        ...state.groups,
        objects: {
          ...state.groups.objects,
          ...childrenObj,
          [action.parent]: {
            ...state.groups.objects[action.parent],
            children: [
              ...state.groups.objects[action.parent].children,
              ...action.payload.map(item => item.id)
            ]
          }
        }
      }
    }
  } else if (action.type === 'SET_GROUP_CHILDREN_SUCCESS') {
    return {
      ...state,
      groups: {
        ...state.groups,
        objects: {
          ...state.groups.objects,
          [action.payload]: {
            ...state.groups.objects[action.payload],
            children: []
          }
        }
      }
    }
  } else if (action.type === 'SET_STUDY_COSTING') {
    return {
      ...state,
      study: {
        ...state.study,
        object: {
          ...state.study.object,
          total_cost: action.payload.total_cost
        }
      },
      costing: {
        ...state.costing,
        objects: {
          ...action.payload
        }
      }
    }
  } else if (action.type === 'SET_STUDY_COSTING_FETCHING') {
    return {
      ...state,
      costing: {
        ...state.costing,
        loading: action.payload
      }
    }
  } else if (action.type === 'CUSTOM_TASKS_REQUEST_LOADING') {
    return {
      ...state,
      customTasks: {
        ...state.customTasks,
        loading: action.payload
      }
    }
  } else if (action.type === 'CUSTOM_CONSUMABLES_REQUEST_LOADING') {
    return {
      ...state,
      customConsumables: {
        ...state.customConsumables,
        loading: action.payload
      }
    }
  } else if (action.type === 'SUBCONTRACTINGS_REQUEST_LOADING') {
    return {
      ...state,
      subcontractings: {
        ...state.subcontractings,
        loading: action.payload
      }
    }
  }

  return allReducers(state, action)
}
