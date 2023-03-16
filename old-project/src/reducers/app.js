import { JWT_TOKEN_SET, JWT_TOKEN_ERROR } from '../actions/types'

const INITIAL_STATE = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  errors: null
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case JWT_TOKEN_SET:
      return {
        ...state,
        errors: null,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh
      }
    case JWT_TOKEN_ERROR:
      return { ...state, accessToken: null, refreshToken: null, errors: action.payload }
    default:
      return state
  }
}
