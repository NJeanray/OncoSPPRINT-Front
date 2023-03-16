import { SET_EDITING_PART, SET_EDITING_STUDY_MODEL } from './types'
import {
  INITIAL_LIST,
  INITIAL_SIMPLE_LIST,
  INITIAL_OBJECT,
  INITIAL_CHILDREN
} from './../reducers/initialState.js'

export const ENDPOINT_LIST = 'LIST'
export const ENDPOINT_OJBECT = 'OBJ'

const DELETE = 'DELETE'
const GET = 'GET'
const POST = 'POST'
const PATCH = 'PATCH'
const status = ['REQUEST', 'SUCCESS', 'ERROR', 'RESET']
const statusPostPatch = ['REQUEST', 'SUCCESS', 'ERROR']
const statusChildren = ['ADD_CHILDREN', 'SELECT_CHILD']

const actionTypes = endpoint =>
  status.reduce(
    (acc, value) =>
      Object.assign(acc, {
        [value === 'RESET' ? value : `API_${value}`]: `${endpoint}_${value}`
      }),
    { SET: `${endpoint}_SET` }
  )

const actionTypesPost = endpoint =>
  statusPostPatch.reduce(
    (acc, value) =>
      Object.assign(acc, {
        [`POST_API_${value}`]: `${endpoint}_POST_${value}`
      }),
    {}
  )

const actionTypesDelete = endpoint =>
  statusPostPatch.reduce(
    (acc, value) =>
      Object.assign(acc, {
        [`DELETE_API_${value}`]: `${endpoint}_DELETE_${value}`
      }),
    {}
  )

const actionTypesPatch = endpoint =>
  statusPostPatch.reduce(
    (acc, value) =>
      Object.assign(acc, {
        [`PATCH_API_${value}`]: `${endpoint}_PATCH_${value}`
      }),
    {}
  )

const actionChildren = endpoint =>
  statusChildren.reduce(
    (acc, value) =>
      Object.assign(acc, {
        [value]: `${endpoint}_${value}`
      }),
    { SET: `${endpoint}_SET` }
  )

const mapParts = function(studyParts, part) {
  if (!studyParts[part.status]) studyParts[part.status] = []

  studyParts[part.status].push(part)
  return studyParts
}

const groupEndpoint = {
  reducer: 'groups',
  types: {
    ...actionChildren('STUDY_GROUP'),
    ...actionTypesPost('STUDY_GROUP'),
    ...actionTypesPatch('STUDY_GROUP')
  },
  initial: INITIAL_CHILDREN,
  method: {
    [POST]: true,
    [PATCH]: ['animalsNumber', 'group_bricks', 'numberChildren']
  },
  recursive: 'children'
}

export const endpoints = {
  studies: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('STUDIES'),
      ...actionTypesPost('STUDIES')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/study/',
    pagination: true,
    method: {
      [GET]: true,
      [POST]: true
    }
  },
  study: {
    type: ENDPOINT_OJBECT,
    types: {
      ...actionTypes('STUDY'),
      ...actionTypesPatch('STUDY')
    },
    initial: INITIAL_OBJECT,
    endpoint: id => `/api/v1/study/${id}/`,
    method: {
      [GET]: true,
      [PATCH]: ['nature', 'type', 'pharmacology', 'study_kind']
    },
    mapper: study => Object.assign(study, { partsByStatus: study.parts.reduce(mapParts, {}) }),
    children: {
      'parts[]': {
        reducer: 'parts',
        type: ENDPOINT_LIST,
        types: {
          ...actionChildren('STUDY_PARTS'),
          ...actionTypesPost('STUDY_PARTS'),
          ...actionTypesDelete('STUDY_PARTS')
        },
        initial: INITIAL_CHILDREN,
        endpoint: ({ studyId, id = null }) =>
          id ? `/api/v1/study/${studyId}/parts/${id}/` : `/api/v1/study/${studyId}/parts/`,
        method: {
          [POST]: true,
          [DELETE]: true
        },
        children: {
          'study_models[]': {
            reducer: 'study_models',
            endpoint: ({ studyId, partId, id = null }) =>
              id
                ? `/api/v1/study/${studyId}/parts/${partId}/models/${id}/`
                : `/api/v1/study/${studyId}/parts/${partId}/models/`,
            types: {
              ...actionChildren('STUDY_STUDYMODEL'),
              ...actionTypesPost('STUDY_STUDYMODEL'),
              ...actionTypesPatch('STUDY_STUDYMODEL'),
              ...actionTypesDelete('STUDY_STUDYMODEL')
            },
            initial: INITIAL_CHILDREN,
            method: {
              [POST]: true,
              [DELETE]: true,
              [PATCH]: [
                'model_type',
                'modelName',
                'animalsSpecie',
                'animalsProvider',
                'animalsIrradiation',
                'animalsGeoArea',
                'animalsShaving',
                'animalsIrradiationDose',
                'animalsPerCage'
              ]
            },
            children: {
              initial_group: groupEndpoint
            }
          }
        }
      }
    },
    reducer: (state, action) => {
      switch (action.type) {
        case SET_EDITING_PART:
          return {
            ...state,
            editingPart: action.payload
          }
        case SET_EDITING_STUDY_MODEL:
          return {
            ...state,
            editingStudyModel: action.payload
          }
        default:
          return state
      }
    }
  },
  studyNature: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('STUDYNATURE')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/study-nature/',
    pagination: false,
    method: {
      GET: true
    }
  },
  studySite: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('STUDYSITE')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/site/',
    pagination: false,
    method: {
      GET: true
    }
  },
  studyType: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('STUDYTYPE')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/study-type/',
    pagination: false,
    method: {
      GET: true
    }
  },
  studyPharmacology: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('PHARMACO')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/study-pharmaco/',
    pagination: false,
    method: {
      GET: true
    }
  },
  modelType: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('MODELTYPE')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/model-type/',
    pagination: false,
    method: {
      GET: true
    }
  },
  studyModel: {
    initial: INITIAL_OBJECT,
    types: {
      ...actionTypes('STUDYMODEL')
    },
    type: null,
    method: {
      PATCH: ['model_type']
    }
  },
  modelName: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('MODELNAME')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/model-name/',
    pagination: false,
    method: {
      GET: true
    }
  },
  animalSpecie: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('ANIMAL_SPECIE')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/animal-specie/',
    pagination: false,
    method: {
      GET: true
    }
  },
  animalProvider: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('ANIMAL_PROVIDER')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/animal-provider/',
    pagination: false,
    method: {
      GET: true
    }
  },
  bricks: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('BRICKS')
    },
    initial: INITIAL_SIMPLE_LIST,
    endpoint: '/api/v1/brick/',
    pagination: false,
    method: {
      GET: true
    }
  },
  brickParams: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('BRICK_PARAMS')
    },
    initial: Object.assign({}, INITIAL_SIMPLE_LIST, { objects: {} }),
    endpoint: '/api/v1/brick/params/',
    pagination: false,
    mapper: (params, previous = {}) =>
      params.reduce((res, param) => {
        if (!res[param.name]) {
          res[param.name] = {
            name: param.name,
            unit: param.unit,
            values: [],
            min_value: param.min_value,
            max_value: param.max_value
          }
        }
        if (param.value) {
          if (res[param.name].values.indexOf(param.value) === -1) {
            res[param.name].values.push(param.value)
          }
        }
        if (param.min_value !== null) {
          if (res[param.name].min_value === null || param.min_value < res[param.name].min_value) {
            res[param.name].min_value = param.min_value
          }
          if (res[param.name].max_value === null || param.max_value > res[param.name].max_value) {
            res[param.name].max_value = param.max_value
          }
        }
        return res
      }, previous),
    method: {
      GET: true
    }
  },
  clients: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CLIENTS'),
      ...actionTypesPost('CLIENTS')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/client/',
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true
    }
  },
  clientsBrains: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CLIENTS_BRAINS')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/client/brains/',
    pagination: false,
    method: {
      [GET]: true
    }
  },
  contacts: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CONTACTS'),
      ...actionTypesPost('CONTACTS')
    },
    initial: INITIAL_LIST,
    endpoint: clientId => `/api/v1/client/${clientId}/contacts/`,
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true
    }
  },
  contactsBrains: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CONTACTS_BRAINS')
    },
    initial: INITIAL_LIST,
    endpoint: clientId => `/api/v1/client/${clientId}/contacts/brains/`,
    pagination: false,
    method: {
      [GET]: true
    }
  },
  publish: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('PUBLISH'),
      ...actionTypesPost('PUBLISH')
    },
    initial: INITIAL_LIST,
    endpoint: studyId => `/api/v1/study/${studyId}/publish/`,
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true
    }
  },
  amend: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('AMEND'),
      ...actionTypesPost('AMEND')
    },
    initial: INITIAL_LIST,
    endpoint: ({ studyPk, groupPartId }) =>
      `api/v1/study/${studyPk}/group-parts/${groupPartId}/amend/`,
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true
    }
  },
  documents: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('DOCUMENTS'),
      ...actionTypesPost('DOCUMENTS')
    },
    initial: INITIAL_LIST,
    endpoint: studyId => `/api/v1/study/${studyId}/documents/`,
    pagination: false,
    method: {
      [GET]: true
    }
  },
  document: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('DOCUMENT'),
      ...actionTypesPost('DOCUMENT')
    },
    initial: INITIAL_LIST,
    endpoint: ({ studyId, documentName }) => `/api/v1/study/${studyId}/${documentName}/`,
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true
    }
  },
  consumables: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CONSUMABLES')
    },
    initial: INITIAL_LIST,
    endpoint: 'api/v1/reference-product/',
    pagination: false,
    method: {
      [GET]: true
    }
  },
  customConsumables: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CUSTOM_CONSUMABLES'),
      ...actionTypesPost('CUSTOM_CONSUMABLES'),
      ...actionTypesDelete('CUSTOM_CONSUMABLES'),
      ...actionTypesPatch('CUSTOM_CONSUMABLES')
    },
    initial: Object.assign({}, INITIAL_SIMPLE_LIST, { objects: {} }),
    endpoint: 'api/v1/custom-consumables/',
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true,
      [DELETE]: true,
      [PATCH]: true
    }
  },
  customTasks: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CUSTOM_TASKS'),
      ...actionTypesPost('CUSTOM_TASKS'),
      ...actionTypesDelete('CUSTOM_TASKS'),
      ...actionTypesPatch('CUSTOM_TASKS')
    },
    initial: Object.assign({}, INITIAL_SIMPLE_LIST, { objects: {} }),
    endpoint: 'api/v1/custom-tasks/',
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true,
      [DELETE]: true,
      [PATCH]: true
    }
  },
  subcontractings: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('SUBCONTRACTINGS'),
      ...actionTypesPost('SUBCONTRACTINGS'),
      ...actionTypesDelete('SUBCONTRACTINGS'),
      ...actionTypesPatch('SUBCONTRACTINGS')
    },
    initial: Object.assign({}, INITIAL_SIMPLE_LIST, { objects: {} }),
    endpoint: 'api/v1/subcontractings/',
    pagination: false,
    method: {
      [GET]: true,
      [POST]: true,
      [DELETE]: true,
      [PATCH]: true
    }
  },
  functionJobs: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('FUNCTION_JOBS')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/function-jobs/',
    pagination: false,
    method: {
      [GET]: true
    }
  },
  laboratories: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('LABORATORIES')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/laboratory/',
    pagination: false,
    method: {
      [GET]: true
    }
  },
  animalGeoFirst: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('ANIMAL_GEO_FIRST')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/animal-geo-first/',
    pagination: false,
    method: {
      [GET]: true
    }
  },
  animalGeoSecond: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('ANIMAL_GEO_SECOND')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/animal-geo-second/',
    pagination: false,
    method: {
      [GET]: true
    }
  },
  childrenStudyGroup: {
    type: ENDPOINT_LIST,
    types: {
      ...actionTypes('CHILDREN_STUDY_GROUP'),
      ...actionTypesPost('CHILDREN_STUDY_GROUP')
    },
    initial: INITIAL_LIST,
    endpoint: '/api/v1/study-group/',
    pagination: false,
    method: {
      [POST]: true
    }
  }
}
