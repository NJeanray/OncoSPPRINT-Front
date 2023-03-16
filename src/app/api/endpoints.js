export const clientsEndpoint = clientId =>
  clientId ? `/api/clients/${clientId}/` : `/api/clients/`

export const contactsEndpoint = (clientId, contactId) =>
  contactId
    ? `/api/clients/${clientId}/contacts/${contactId}`
    : `/api/clients/${clientId}/contacts/`

export const costingDocumentEndpoint = projectId => `/api/export/project-costing/${projectId}/`

export const documentsEndpoint = (studyId, documentName) =>
  `/api/export/${studyId}/${documentName}/`

export const projectsListEndpoint = () => '/api/projects'

export const projectDuplicateEndpoint = projectId => `/api/projects/${projectId}/duplicate/`

export const studyDuplicateEndpoint = (projectId, studyId) =>
  `/api/projects/${projectId}/studies/${studyId}/duplicate/`

export const partDuplicateEndpoint = (projectId, studyId, partId) =>
  `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/duplicate/`

export const projectsEndpoint = projectId =>
  projectId ? `/api/projects/${projectId}/` : `/api/projects/`

export const studiesEndpoint = (projectId, studyId) =>
  studyId ? `/api/projects/${projectId}/studies/${studyId}/` : `/api/projects/${projectId}/studies/`

export const modelsEndpoint = () => '/api/models/'

export const subcontractorsEndpoint = () => '/api/subcontractors/'

export const modelsDefaultValuesEndpoint = modelId => `/api/models/${modelId}/default-values/`

export const partsEndpoint = (projectId, studyId, partId) =>
  partId
    ? `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/`
    : `/api/projects/${projectId}/studies/${studyId}/parts/`

export const customTasksEndpoint = (projectId, studyId, partId, customTaskId) =>
  customTaskId
    ? `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/custom-tasks/${customTaskId}/`
    : `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/custom-tasks/`

export const customConsumablesEndpoint = (projectId, studyId, partId, customConsumableId) =>
  customConsumableId
    ? `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/custom-consumable/${customConsumableId}/`
    : `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/custom-consumable/`

export const groupsEndpoint = (projectId, studyId, partId, groupId) =>
  groupId
    ? `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/groups/${groupId}/`
    : `/api/projects/${projectId}/studies/${studyId}/parts/${partId}/groups/`

export const cegidAnimalsEndpoint = () => '/api/cegid_animals/'

export const brickGenericCategoryEndpoint = () => '/api/bricks/'

export const brickParamsEndpoint = () => '/api/brick-params/'

export const eventEndpoint = eventId => (eventId ? `/api/events/${eventId}/` : `/api/events/`)

export const transportsEndpoint = () => `api/transports/`

export const antibodiesEndpoint = () => '/api/antibodies/'

export const fragmentsEndpoint = () => '/api/fragments/'

export const eventChoiceFieldsEndpoint = () => '/api/event-choice-fields/'

export const ethicalProtocolsEndpoint = () => '/api/ethical_protocols/'

export const consumablesEndpoint = () => '/api/consumables/'

export const customerCompoundsEndpoint = () => '/api/customer_compounds/'

export const mspLaboratoriesEndpoint = () => '/api/labo_msp_resources/'

export const laboratoriesEndpoint = () => '/api/laboratories/'

export const tokenEndpoint = () => '/api/token/'

export const tokenRefreshEndpoint = () => '/api/token/refresh/'

export const usersEndpoint = () => '/api/users/'

export const studyChoiceFieldsEndpoint = () => '/api/study-choice-fields/'

export const studySupervisionsEndpoint = (projectId, studyId, studySupervisionId) =>
  studySupervisionId
    ? `/api/projects/${projectId}/studies/${studyId}/study-supervisions/${studySupervisionId}/`
    : `/api/projects/${projectId}/studies/${studyId}/study-supervisions/`
