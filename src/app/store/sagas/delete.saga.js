import { put, call } from 'redux-saga/effects'

import instance from 'app/api/instance'
import refreshToken from './refreshToken.saga'

const apiDeleteRequest = (endpoint, params) =>
  instance.delete(endpoint, params).then((response = {}) => response)

export default function* sagaDeleteRequest(action) {
  const { endpoint, params, name, parent } = action.payload

  try {
    yield call(apiDeleteRequest, endpoint, params)
    yield put({
      type: `DELETE_${name.toUpperCase()}_SUCCESS`,
      payload: {
        data: params,
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
        type: `DELETE_${name.toUpperCase()}_FAILURE`,
        payload: {
          name,
          errors: status === 500 ? { server: ['A server error has occured'] } : data
        }
      })
  }
}
