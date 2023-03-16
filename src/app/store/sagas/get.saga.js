import { put, call } from 'redux-saga/effects'
import { isEmpty } from 'lodash'

import instance from 'app/api/instance'
import refreshToken from './refreshToken.saga'

const apiGetRequest = (endpoint, params = {}) =>
  instance
    .get(endpoint, {
      params: { ...params }
    })
    .then((response = {}) => response)

export default function* sagaGetRequest(action) {
  const { endpoint, params, name, parent, common, amend } = action.payload

  try {
    const response = yield call(apiGetRequest, endpoint, params)
    if (response) {
      const dataToSend = isEmpty(response.data) ? [] : response.data

      yield put({
        type: `GET_${name.toUpperCase()}_SUCCESS`,
        payload: {
          data: dataToSend,
          name,
          parent,
          common,
          amend
        }
      })
    }
  } catch (error) {
    const { data, status } = error.response

    if (data && data.code === 'token_not_valid') {
      const refreshTokenAction = refreshToken(action)

      yield put(refreshTokenAction)
    } else
      yield put({
        type: `GET_${name.toUpperCase()}_FAILURE`,
        payload: {
          name,
          errors: status === 500 ? { server: ['A server error has occured'] } : data
        }
      })
  }
}
