import baseActions from './actions'
import { endpoints } from './endpoints'

import { createBaseEndpoints } from './createBaseEndpoints'
import { createPostEndpoints } from './createPostEndpoints'
import { createSetEndpoints } from './createSetEndpoints'
import { createChildrenEndpoints } from './createChildrenEndpoints'

export const camelize = str =>
  str[0].toUpperCase() +
  str
    .substr(1)
    .replace('[]', '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, camelizeReplacer)
    .replace(/[\s-]+/g, '')
export const camelizeReplacer = (letter, index) =>
  index === 0 ? letter.toLowerCase() : letter.toUpperCase()

const createAllEndpoints = (name, endpoint, res) => {
  createBaseEndpoints(name, endpoint, res)

  if (endpoint.method.POST) createPostEndpoints(name, endpoint, res)

  if (endpoint.method.PATCH && endpoint.method.PATCH.length > 0)
    createSetEndpoints(name, endpoint, res)

  if (endpoint.children) {
    Object.keys(endpoint.children).reduce((res, childName) => {
      return createChildrenEndpoints([name], childName, endpoint.children[childName], res)
    }, res)
  }

  return res
}

const api_types = Object.keys(endpoints).reduce(
  (res, name) => {
    return createAllEndpoints(name, endpoints[name], res)
  },
  { types: {}, actions: [], reducers: {} }
)

const types = api_types.types
const actions = dispatch =>
  api_types.actions.reduce(
    (res, action) => Object.assign(res, action(dispatch)),
    Object.keys(baseActions).reduce(
      (res, name) =>
        Object.assign(res, {
          [name]: baseActions[name](dispatch)
        }),
      {}
    )
  )
const reducers = api_types.reducers

export { types, actions, reducers }
