import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiRequest = (endpoint, params) => {
  return instance
    .get(typeof endpoint.endpoint === 'function' ? endpoint.endpoint(params) : endpoint.endpoint, {
      params: endpoint.pagination
        ? {
            ...params,
            limit: params.limit ? params.limit : 12,
            offset: params.offset ? params.offset : 0
          }
        : params
    })
    .then((response = {}) => response)
}

const prepareItem = (item, endpoint, toYield) => {
  if (endpoint.children) {
    Object.keys(endpoint.children).forEach(childName => {
      const reducerKey = childName.endsWith('[]')
        ? childName.substr(0, childName.length - 2)
        : childName
      if (item[reducerKey]) {
        const children = item[reducerKey]
        const childEndpoint = endpoint.children[childName]
        toYield.push(
          put({
            type: childEndpoint.types.ADD_CHILDREN,
            payload:
              typeof children.map === 'function'
                ? children.map(child => prepareItem(child, childEndpoint, toYield))
                : [prepareItem(children, childEndpoint, toYield)]
          })
        )
        item[reducerKey] =
          typeof children.map === 'function' ? children.map(child => child.id) : children.id
      }
    })
  }
  if (endpoint.recursive) {
    const children = item[endpoint.recursive]
    if (children) {
      toYield.push(
        put({
          type: endpoint.types.ADD_CHILDREN,
          payload:
            typeof children.map === 'function'
              ? children.map(child => prepareItem(child, endpoint, toYield))
              : [prepareItem(children, endpoint, toYield)]
        })
      )
      item[endpoint.recursive] =
        typeof children.map === 'function' ? children.map(child => child.id) : children.id
    }
  }
  return item
}

export function* getApiRequest(action) {
  const { endpoint, payload } = action

  try {
    const response = yield call(apiRequest, endpoint, payload)

    const toYield = []
    const res = prepareItem(response.data, endpoint, toYield)
    for (var i = 0; i < toYield.length; ++i) {
      yield toYield[i]
    }
    yield put({
      type: endpoint.types.API_SUCCESS,
      payload: res
    })
  } catch (error) {
    yield put({
      type: endpoint.type.API_ERROR,
      payload: error
    })
  }
}
