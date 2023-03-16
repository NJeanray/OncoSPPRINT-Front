import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiPatchRequest = (endpoint, payload, params) =>
  instance.patch(
    typeof endpoint.endpoint === 'function' ? endpoint.endpoint(params) : endpoint.endpoint,
    payload
  )

export function* getApiPatchRequest(action) {
  const { endpoint, payload, params, field } = action
  yield put({
    type: `${endpoint.types.API_REQUEST}_LOADING`,
    payload: true
  })

  try {
    yield call(apiPatchRequest, endpoint, payload, params)
    yield put({
      type: endpoint.types.PATCH_API_SUCCESS,
      payload: payload
    })
    yield put({
      type: `${endpoint.types.API_REQUEST}_LOADING`,
      payload: false
    })
  } catch (error) {
    yield put({
      type: endpoint.types.PATCH_API_ERROR,
      payload: { [field]: error }
    })
  }
}
