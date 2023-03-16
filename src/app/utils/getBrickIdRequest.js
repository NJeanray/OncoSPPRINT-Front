import { isEmpty } from 'lodash'

import instance from '../api/instance'
import { brickGenericCategoryEndpoint } from '../api/endpoints'

function getBrickIdRequest(action, eventSelected, partSite, brickCategory, brickName, brickParams) {
  if (action === 'update' && Object.keys(brickParams).length === 0)
    return eventSelected.get('brick_id')

  const brickParamsToSend = Object.keys(brickParams).reduce((acc, item) => {
    // eslint-disable-next-line no-param-reassign
    acc += `${acc === '' ? '' : ','}${item}:${brickParams[item]}`
    return acc
  }, '')

  return instance
    .get(brickGenericCategoryEndpoint(), {
      params: {
        generic_category: brickCategory,
        params: brickParamsToSend,
        name: brickName,
        site: partSite
      }
    })
    .then(data => {
      if (data.status === 200) {
        if (data.data && !isEmpty(data.data) && data.data.length === 1)
          return data.data[0].id.toString()
        return -1
      }
      return -1
    })
}

export default getBrickIdRequest
