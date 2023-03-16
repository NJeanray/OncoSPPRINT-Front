import instance from './../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiPostRequest = (endpoint, params, payload) =>
  instance
    .post(
      typeof endpoint.endpoint === 'function' ? endpoint.endpoint(params) : endpoint.endpoint,
      payload
    )
    .then((response = {}) => response)

export function* getApiPostRequest(action) {
  const { endpoint, params, payload } = action
  yield put({
    type: `${endpoint.types.API_REQUEST}_LOADING`,
    payload: true
  })

  try {
    const response = yield call(apiPostRequest, endpoint, params, payload)

    yield put({
      type: endpoint.types.POST_API_SUCCESS,
      payload: response.data
    })
    yield put({
      type: `${endpoint.types.API_REQUEST}_LOADING`,
      payload: false
    })
  } catch (error) {
    yield put({
      type: endpoint.type.POST_API_ERROR,
      payload: error
    })
  }
}
