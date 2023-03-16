import { STUDY_NATURE_GET, STUDY_NATURE_SET, STUDY_NATURE_ERROR } from '../actions/types.js'

const initial = {
  options: null,
  loading: false,
  errors: null
}

export default function(state = initial, action) {
  switch (action.type) {
    case STUDY_NATURE_GET:
      return { ...state, errors: null, loading: true }
    case STUDY_NATURE_SET:
      return { ...state, errors: null, loading: false, options: action.payload }
    case STUDY_NATURE_ERROR:
      return { ...state, errors: action.payload, loading: false }
    default:
      return state
  }
}
