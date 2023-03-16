import { fromJS } from 'immutable'

import successPostReducer from './post.reducer'
import successGetReducer from './get.reducer'
import successPatchReducer from './patch.reducer'
import successDeleteReducer from './delete.reducer'
import resetStore from './resetStore.reducer'

const initialState = fromJS({})

export default (state = initialState, action) => {
  const { type, value } = action

  if (action.payload) {
    const { name, errors } = action.payload

    if (type === 'RESET_STORE') return resetStore(state, action)
    if (type === 'RESET_STATE') return state.set(name, initialState)
    if (type === 'RESET_STATE_CREATED') return state.setIn([name, 'created'], null)
    if (type === 'RESET_STATE_UPDATED') return state.setIn([name, 'updated'], null)
    if (type === 'RESET_STATE_ERRORS' && action.payload.multiple)
      return state.updateIn([name, 'errors'], prevErrors => ({
        ...prevErrors,
        value
      }))
    if (type === 'RESET_STATE_ERRORS') return state.setIn([name, 'errors'], null)
    if (type === 'RESET_STATE_DELETED') return state.setIn([name, 'deleted'], null)
    if (type.endsWith('REQUEST'))
      return state.setIn([name, 'isFetching'], true).setIn([name, 'errors'], null)
    if (type === 'GET_DOCUMENT_SUCCESS') return state.setIn(['document', 'isFetching'], false)
    if (type.endsWith('SUCCESS')) {
      if (type.startsWith('POST')) return successPostReducer(state, action)
      if (type.startsWith('GET')) return successGetReducer(state, action)
      if (type.startsWith('PATCH')) return successPatchReducer(state, action)
      if (type.startsWith('DELETE')) return successDeleteReducer(state, action)
    }
    if (type.endsWith('FAILURE') && action.payload.multiple)
      return state
        .updateIn([name, 'errors'], prevErrors => {
          return {
            ...prevErrors,
            [action.payload.key]: {
              ...errors
            }
          }
        })
        .setIn([name, 'isFetching'], false)
    if (type.endsWith('FAILURE') && !action.payload.multiple)
      return state.setIn([name, 'isFetching'], false).setIn([name, 'errors'], errors)
  }
  return state
}
