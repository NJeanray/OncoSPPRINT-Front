import produce from 'immer'

import { STUDY_SET, STUDY_ERROR } from '../actions/types.js'

const initial = {
  study: null,
  lastId: null,
  loading: false,
  errors: null
}
export default (state = initial, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case STUDY_SET:
        draft.error = null
        draft.loading = false
        draft.study = action.payload
        break
      case STUDY_ERROR:
        draft.error = action.payload
        draft.loading = false
        draft.study = null
        break
    }
  })
}
