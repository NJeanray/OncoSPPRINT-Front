import { all, takeEvery } from 'redux-saga/effects'

import {
  GET_ENTITIES_REQUEST,
  POST_ENTITIES_REQUEST,
  UPDATE_ENTITIES_REQUEST,
  DELETE_ENTITIES_REQUEST,
  GET_DOCUMENT_REQUEST
} from '../constants'
import sagaDeleteRequest from './delete.saga'
import sagaGetRequest from './get.saga'
import sagaPatchRequest from './patch.saga'
import sagaPostRequest from './post.saga'
import sagaGetDocumentRequest from './getDocument.saga'

export default function* rootSaga() {
  yield all([
    takeEvery(GET_ENTITIES_REQUEST, sagaGetRequest),
    takeEvery(DELETE_ENTITIES_REQUEST, sagaDeleteRequest),
    takeEvery(POST_ENTITIES_REQUEST, sagaPostRequest),
    takeEvery(UPDATE_ENTITIES_REQUEST, sagaPatchRequest),
    takeEvery(GET_DOCUMENT_REQUEST, sagaGetDocumentRequest)
  ])
}
