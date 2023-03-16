// fromJS({})

import { fromJS } from 'immutable'

export default function(state, action) {
  const { errors, name } = action.payload

  if (name === 'refresh' && errors)
    return fromJS({
      refresh: {
        isFetching: false,
        errors: errors
      }
    })
  else return fromJS({})
}
