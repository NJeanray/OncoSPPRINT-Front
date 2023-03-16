import metadataReducer from './reducer-factory'

const initialParts = []
/**
 * Reducer managing study parts
 * @see metadataReducer.
 * @param {[Object]} state - Study parts state.
 * @param {Object} action - Redux action.
 * @param {Object} action - Redux action.
 * @param {string} action.type - Explicit.
 * @param {Object} action.payload - data to be processed.
 * @param {number?} action.payload.index - for update, insert or remove actions, index in the 'parts' array.
 * @param {Object?} action.payload.item - for update action, n.
 * @returns {Function} - Redux reducer.
 */
export default metadataReducer('PARTS', initialParts)
