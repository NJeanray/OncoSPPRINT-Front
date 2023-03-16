import reducerFactory from './reducer-factory'

// Not recommanded to do some DRY code here (e.g: reduce then CommongJs export of an object),
// because otherwise the JS engine cannot do some optimization for static import.
export const client = reducerFactory('CLIENT', {})
export const description = reducerFactory('DESCRIPTION', '')
export const edit_url = reducerFactory('EDIT_URL', '')
export const name = reducerFactory('NAME', '')
export const nature = reducerFactory('NATURE', '')
export const owner = reducerFactory('OWNER', {})
export const pharmacology = reducerFactory('PHARMACOLY', {})
export const resource_uri = reducerFactory('RESOURCE_URI', '')
export const site = reducerFactory('SITE', {})
export const title = reducerFactory('TITLE', '')
export const total_cost = reducerFactory('TOTAL_COST', '')
export const type = reducerFactory('TYPE', {})
export const notification = reducerFactory('NOTIFICATION', '')
export const documents = reducerFactory('DOCUMENTS', '')
export const costing = reducerFactory('COSTING', '')
