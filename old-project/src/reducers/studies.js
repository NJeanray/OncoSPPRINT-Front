import produce from 'immer'

import { STUDIES_SET, STUDIES_ERROR } from '../actions/types'

const INITIAL_STATE = {
  studies: [],
  totalCount: null
}

export default (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case STUDIES_SET:
        draft.errors = null
        draft.studies = [...draft.studies, ...action.payload.results]
        draft.totalCount = action.payload.count
        break
      case STUDIES_ERROR:
        draft.errors = action.payload
        break
      default:
        break
    }
  })
