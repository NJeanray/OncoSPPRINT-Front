import instance from './api_base'
import store from '../store'

import { JWT_TOKEN_ERROR, LOGOUT } from '../actions/types'

const is401 = error => error.response && error.response.status === 401

// Refresh token if expired
// TODO: finish it, by automatically retrying a request with expired token
instance.interceptors.response.use(
  response => response,
  async error => {
    const refreshToken = window.localStorage.getItem('refreshToken')
    if (refreshToken && is401(error)) {
      if (error.config.url !== `${error.config.baseURL}/api/v1/token/refresh/`) {
        const response = await instance.post('/api/v1/token/refresh/', {
          refresh: refreshToken
        })
        const {
          data: { access, refresh }
        } = response
        if (refresh) {
          window.localStorage.setItem('accessToken', access)
          instance.defaults.headers.common['Authorization'] = `Bearer ${access}`
          store.dispatch({
            type: JWT_TOKEN_ERROR,
            payload: {
              access,
              refresh: refreshToken
            }
          })
        } else {
          console.warn(`Couldn't refresh JWT Token`)
        }
      } else {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        instance.defaults.headers.common['Authorization'] = null
        store.dispatch({
          type: LOGOUT,
          payload: {}
        })
      }
    }
    if (error.response && error.response.data) throw error.response.data
    throw new Error({ non_field_errors: [error.message] })
  }
)

/***************************************************************************************/
/**                                   Application                                     **/
/***************************************************************************************/
const getJwtToken = async (credentials = { username: '', password: '' }) => {
  return await instance.post('/api/v1/token/', credentials)
}

const api = {
  instance,
  getJwtToken
}
export default api
