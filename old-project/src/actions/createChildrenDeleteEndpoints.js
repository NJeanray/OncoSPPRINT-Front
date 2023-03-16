import { camelize } from './api_types'

export const createChildrenDeleteEndpoints = (parents, name, endpoint, res) => {
  if (name.endsWith('[]')) {
    name = name.substr(0, name.length - 2)
  }

  res.actions.push(dispatch => ({
    [`delete${camelize(name)}`]: (params = {}) =>
      dispatch({
        type: endpoint.types.DELETE_API_REQUEST,
        payload: params.id,
        params: params,
        endpoint
      })
  }))
}
