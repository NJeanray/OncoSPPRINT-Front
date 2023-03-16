import { put, call } from 'redux-saga/effects'

import instance from 'app/api/instance'
import refreshToken from './refreshToken.saga'

const apiPatchRequest = (endpoint, params) =>
  instance.patch(endpoint, params).then((response = {}) => response)

export default function* sagaPatchRequest(action) {
  const { endpoint, params, name, parent } = action.payload

  try {
    const response = yield call(apiPatchRequest, endpoint, params)

    yield put({
      type: `PATCH_${name.toUpperCase()}_SUCCESS`,
      payload: {
        data: response.data,
        name,
        parent
      }
    })
  } catch (error) {
    const { data, status } = error.response

    if (data.code === 'token_not_valid') {
      const refreshTokenAction = refreshToken(action)

      yield put(refreshTokenAction)
    } else
      yield put({
        type: `PATCH_${name.toUpperCase()}_FAILURE`,
        payload: {
          name,
          errors: status === 500 ? { server: ['A server error has occured'] } : data
        }
      })
  }
}
