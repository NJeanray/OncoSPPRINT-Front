import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiDeleteRequest = (endpoint, payload, params) =>
  instance.delete(
    typeof endpoint.endpoint === 'function' ? endpoint.endpoint(params) : endpoint.endpoint,
    payload
  )

export function* getApiDeleteRequest(action) {
  const { endpoint, payload, params, field } = action

  try {
    yield call(apiDeleteRequest, endpoint, payload, params)
    yield put({
      type: endpoint.types.DELETE_API_SUCCESS,
      payload: payload
    })
  } catch (error) {
    yield put({
      type: endpoint.types.DELETE_API_ERROR,
      payload: { [field]: error }
    })
  }
}
