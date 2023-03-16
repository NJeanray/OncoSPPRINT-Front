export const INITIAL_LIST = {
  objects: [],
  totalCount: null,
  loading: false,
  errors: null
}

export const INITIAL_SIMPLE_LIST = Object.assign({}, INITIAL_LIST, { objects: null })

export const INITIAL_OBJECT = {
  object: null,
  lastId: null,
  loading: false,
  errors: null,
  loadingFields: {},
  errorsFields: {}
}

export const INITIAL_CHILDREN = {
  objects: {},
  currentChild: null,
  errors: null,
  loadingFields: {},
  errorsFields: {}
}
