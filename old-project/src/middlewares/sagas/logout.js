import { takeEvery } from 'redux-saga/effects'

import { LOGOUT } from '../../actions/types'
import api from '../../service/api'

export function* watchLogout() {
  yield takeEvery(LOGOUT, () => {
    window.localStorage.removeItem('accessToken')
    api.instance.defaults.headers.common = { Authorization: null }
    window.location = '/'
  })
}
