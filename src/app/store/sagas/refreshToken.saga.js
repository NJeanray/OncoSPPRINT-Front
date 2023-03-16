import { tokenRefreshEndpoint } from 'app/api/endpoints'
import { POST_ENTITIES_REQUEST } from '../constants'

export default function refreshToken(action) {
  const refresh = localStorage.getItem('refreshToken')

  return {
    type: POST_ENTITIES_REQUEST,
    payload: {
      name: 'refresh',
      endpoint: tokenRefreshEndpoint(),
      params: {
        refresh
      },
      originAction: {
        ...action
      }
    }
  }
}
