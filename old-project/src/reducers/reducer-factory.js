import { replace, remove, add } from '../lib/utils'

/**
 * DRY Redux reducer generator (higher-order function)
 * @see: https://joreteg.com/blog/honey-badger-web-apps
 * @param {string} baseType - Name associated with the returned reducer.
 * @param {Object|Array} initialData - Data associated with the reducer.
 * @returns {Function} - Redux reducer.
 */
export default function metadataReducer(baseType, initialData) {
  const START = `${baseType}_START`
  const ERROR = `${baseType}_ERROR`
  const SUCCESS = `${baseType}_SUCCESS`
  const APPEND = `${baseType}_APPEND`
  const SET = `${baseType}_SET`
  const UPDATE = `${baseType}_UPDATE`
  const REMOVE = `${baseType}_REMOVE`
  const INSERT = `${baseType}_INSERT`

  if (Array.isArray(initialData)) {
    const initialState = [...initialData]
    initialState.loading = false
    initialState.error = null

    return function(state = initialData, action) {
      let temp = state
      switch (action.type) {
        case START:
          temp = [...state].loading = true
          return temp

        case SUCCESS:
          temp = action.payload
          temp.error = null
          temp.loading = false
          return temp

        case ERROR:
          temp = [...state]
          temp.error = action.payload
          temp.loading = false
          return temp

        case SET:
          temp = action.payload
          temp.error = state.error
          temp.loading = state.loading
          return temp

        case APPEND:
          temp = [...state, action.payload]
          temp.error = state.error
          temp.loading = state.loading
          return temp

        case UPDATE:
          temp = replace(state, action.payload.index, action.payload.item)
          temp.error = state.error
          temp.loading = state.loading
          return temp

        case REMOVE:
          temp = remove(state, action.payload.index)
          temp.error = state.error
          temp.loading = state.loading
          return temp

        case INSERT:
          temp = add(state, action.payload.index, action.payload.item)
          temp.error = state.error
          temp.loading = state.loading
          return temp

        default:
          return temp
      }
    }
  }

  if (typeof initialData === 'object') {
    return function(state = initialData, action) {
      switch (action.type) {
        case START:
          return Object.assign({}, state, { loading: true })

        case SUCCESS:
          return Object.assign({}, state, {
            data: action.payload,
            error: null,
            loading: false
          })

        case ERROR:
          return Object.assign({}, state, {
            error: action.payload,
            loading: false
          })

        case SET:
          return action.payload

        case UPDATE:
          return Object.assign({}, state, {
            data: Object.assign({}, state.data, {
              [action.payload.key]: action.payload.value
            })
          })

        case REMOVE:
          const newData = Object.assign({}, state.data)
          delete newData[action.payload.key]
          return Object.assign({}, state, { data: newData })

        case INSERT: // Normaly not used
        case APPEND: // Normaly not used
        default:
          return state
      }
    }
  }

  if (typeof initialData === 'string') {
    return function(state = initialData, action) {
      switch (action.type) {
        case SET:
          return action.payload.toString

        default:
          return state
      }
    }
  }
}
