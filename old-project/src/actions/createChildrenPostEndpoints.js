import { camelize } from './api_types'

export const createChildrenPostEndpoints = (parents, name, endpoint, res) => {
  if (name.endsWith('[]')) {
    name = name.substr(0, name.length - 2)
  }

  res.actions.push(dispatch => ({
    [`create${camelize(name)}`]: (params = {}, data) =>
      dispatch({
        type: endpoint.types.POST_API_REQUEST,
        payload: data,
        params: params,
        endpoint
      })
  }))
}
