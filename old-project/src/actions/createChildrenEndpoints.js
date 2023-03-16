import { createChildrenDeleteEndpoints } from './createChildrenDeleteEndpoints'
import { createChildrenPostEndpoints } from './createChildrenPostEndpoints'
import { createChildrenSetEndpoints } from './createChildrenSetEndpoints'

export const createChildrenEndpoints = (parents, name, endpoint, res) => {
  createChildrenSetEndpoints(parents, name, endpoint, res)

  if (endpoint.method.POST) {
    createChildrenPostEndpoints(parents, name, endpoint, res)
  }
  if (endpoint.method.DELETE) {
    createChildrenDeleteEndpoints(parents, name, endpoint, res)
  }

  if (endpoint.children) {
    Object.keys(endpoint.children).reduce((res, childName) => {
      return createChildrenEndpoints(
        [...parents, name],
        childName,
        endpoint.children[childName],
        res
      )
    }, res)
  }
  return res
}
