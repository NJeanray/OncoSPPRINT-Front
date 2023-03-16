import { put, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import instance from 'app/api/instance'
import logoutClearLocalStorage from 'app/utils/logoutClearLocalStorage'
import refreshToken from './refreshToken.saga'

export const apiPostRequest = (endpoint, params) =>
  instance.post(endpoint, params).then((response = {}) => response)

export default function* sagaPostRequest(action) {
  const {
    endpoint,
    params,
    name,
    parent,
    originAction,
    multiple,
    key,
    transfertNext
  } = action.payload

  try {
    const response = yield call(apiPostRequest, endpoint, params)

    if (name === 'login') {
      const { refresh, access, user } = response.data

      window.localStorage.setItem('refreshToken', refresh)
      window.localStorage.setItem('accessToken', access)
      window.localStorage.setItem('user', JSON.stringify(user))
      instance.defaults.headers.common.Authorization = access ? `Bearer ${access}` : null
    }
    if (name === 'refresh') {
      window.localStorage.setItem('accessToken', response.data.access)
      instance.defaults.headers.common.Authorization = `Bearer ${response.data.access}`
      yield put({ ...originAction })
    } else {
      yield put({
        type: `POST_${name.toUpperCase()}_SUCCESS`,
        payload: {
          name,
          data: response.data,
          parent,
          multiple,
          key,
          transfertNext
        }
      })
    }
  } catch (error) {
    const { data, status } = error.response

    if (name === 'refresh' && data.code === 'token_not_valid') {
      logoutClearLocalStorage()
      yield put(push('/'))
      yield put({
        type: 'RESET_STORE',
        payload: {
          name,
          errors: data
        }
      })
    } else if (data.code === 'token_not_valid') {
      const refreshTokenAction = refreshToken(action)

      yield put(refreshTokenAction)
    } else
      yield put({
        type: `POST_${name.toUpperCase()}_FAILURE`,
        payload: {
          name,
          errors: status === 500 ? { server: ['A server error has occured'] } : data,
          multiple,
          key,
          transfertNext
        }
      })
  }
}
