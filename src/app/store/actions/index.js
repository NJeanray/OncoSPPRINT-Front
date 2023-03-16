import {
  GET_ENTITIES_REQUEST,
  POST_ENTITIES_REQUEST,
  UPDATE_ENTITIES_REQUEST,
  DELETE_ENTITIES_REQUEST,
  RESET_STATE_CREATED,
  RESET_STATE_UPDATED,
  RESET_STATE_ERRORS,
  RESET_STATE_DELETED,
  RESET_STORE,
  RESET_STATE,
  GET_DOCUMENT_REQUEST
} from '../constants'

export const getActionCreator = (name, payload) => {
  return {
    type: GET_ENTITIES_REQUEST,
    payload: { ...payload, name }
  }
}

export const createActionCreator = (name, payload) => ({
  type: POST_ENTITIES_REQUEST,
  payload: { ...payload, name }
})

export const updateActionCreator = (name, payload) => ({
  type: UPDATE_ENTITIES_REQUEST,
  payload: { ...payload, name },
  meta: {
    isPromise: true
  }
})

export const deleteActionCreator = (name, payload) => ({
  type: DELETE_ENTITIES_REQUEST,
  payload: { ...payload, name }
})

export const resetStateCreated = name => ({
  type: RESET_STATE_CREATED,
  payload: { name }
})

export const resetStateUpdated = name => ({
  type: RESET_STATE_UPDATED,
  payload: { name }
})

export const resetStateErrors = name => ({
  type: RESET_STATE_ERRORS,
  payload: { name }
})

export const resetStateDeleted = name => ({
  type: RESET_STATE_DELETED,
  payload: { name }
})

export const resetState = name => ({
  type: RESET_STATE,
  payload: { name }
})

export const setResetStore = () => ({
  type: RESET_STORE,
  payload: {}
})

export const getDocumentAction = (name, payload) => ({
  type: GET_DOCUMENT_REQUEST,
  payload: { ...payload, name }
})
