import { put, call } from 'redux-saga/effects'

import instance from 'app/api/instance'
import refreshToken from './refreshToken.saga'

const apiGetRequest = (endpoint, params: {}) =>
  instance
    .get(endpoint, {
      responseType: 'blob',
      params: { ...params }
    })
    .then((response = {}) => response)

export default function* sagaGetDocumentRequest(action) {
  const { endpoint, name, documentName, fileExtension, params } = action.payload

  try {
    const response = yield call(apiGetRequest, endpoint, params)
    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', `${documentName}.${fileExtension}`)
      document.body.appendChild(link)
      link.click()
      yield put({
        type: `GET_${name.toUpperCase()}_SUCCESS`,
        payload: {
          name
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
