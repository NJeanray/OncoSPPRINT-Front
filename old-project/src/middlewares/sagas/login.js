wimport { put, takeEvery } from 'redux-saga/effects'

import api from '../../service/api'
import { LOGIN, JWT_TOKEN_SET, JWT_TOKEN_ERROR } from '../../actions/types'

export function* getJwtTokenAsync(action = { type: '', payload: { username: '', password: '' } }) {
    try {
        const response = yield api.getJwtToken(action.payload)
        const { data: tokens = { access: '', refresh: '' } } = response

        api.instance.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`
        window.localStorage.setItem('refreshToken', tokens.refresh)
        window.localStorage.setItem('accessToken', tokens.access)
        yield put({
            type: JWT_TOKEN_SET,
            payload: tokens
        })
    } catch (error) {
        yield put({
            type: JWT_TOKEN_ERROR,
            payload: error
        })
    }
}

export function* watchLogin() {
    yield takeEvery(LOGIN, getJwtTokenAsync)
}
