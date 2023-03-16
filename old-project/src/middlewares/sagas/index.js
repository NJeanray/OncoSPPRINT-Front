import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import { getApiRequest } from './request'
import { getApiDeleteRequest } from './deleteRequest'
import { getApiPostRequest } from './postRequest'
import { getApiPatchRequest } from './patchRequest'
import { watchLogin } from './login'
import { watchLogout } from './logout'

import { setGroupBrick } from './setGroupBrick'
import { setGroupChildren } from './setGroupChildren'
import { setChildrenStudyGroup } from './setChildrenStudyGroup'
import { getBrickId } from './getBrickId'
import { getStudyCosting } from './getStudyCosting'
/***************************************************************************************/
/**                                   Application                                     **/
/***************************************************************************************/

/**
 * Export
 */

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchLogout(),
    // replace following code by maping function
    takeLatest('STUDIES_REQUEST', getApiRequest),
    takeLatest('STUDIES_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDIES_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('STUDY_REQUEST', getApiRequest),
    takeLatest('STUDY_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDY_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('STUDY_PARTS_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDY_PARTS_DELETE_REQUEST', getApiDeleteRequest),

    takeLatest('STUDY_STUDYMODEL_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDY_STUDYMODEL_DELETE_REQUEST', getApiDeleteRequest),

    takeLatest('STUDYNATURE_REQUEST', getApiRequest),
    takeLatest('STUDYNATURE_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDYNATURE_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('STUDYSITE_REQUEST', getApiRequest),
    takeLatest('STUDYSITE_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDYSITE_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('STUDYTYPE_REQUEST', getApiRequest),
    takeLatest('STUDYTYPE_POST_REQUEST', getApiPostRequest),
    takeLatest('STUDYTYPE_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('PHARMACO_REQUEST', getApiRequest),
    takeLatest('PHARMACO_POST_REQUEST', getApiPostRequest),
    takeLatest('PHARMACO_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('MODELTYPE_REQUEST', getApiRequest),
    takeLatest('MODELTYPE_POST_REQUEST', getApiPostRequest),
    takeLatest('MODELTYPE_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('MODELNAME_REQUEST', getApiRequest),
    takeLatest('MODELNAME_POST_REQUEST', getApiPostRequest),
    takeLatest('MODELNAME_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('ANIMAL_SPECIE_REQUEST', getApiRequest),
    takeLatest('ANIMAL_SPECIE_POST_REQUEST', getApiPostRequest),
    takeLatest('ANIMAL_SPECIE_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('ANIMAL_PROVIDER_REQUEST', getApiRequest),
    takeLatest('ANIMAL_PROVIDER_POST_REQUEST', getApiPostRequest),
    takeLatest('ANIMAL_PROVIDER_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('BRICKS_REQUEST', getApiRequest),
    takeLatest('BRICK_PARAMS_REQUEST', getApiRequest),

    takeLatest('CLIENTS_REQUEST', getApiRequest),
    takeLatest('CLIENTS_POST_REQUEST', getApiPostRequest),
    takeLatest('CLIENTS_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('CLIENTS_BRAINS_REQUEST', getApiRequest),

    takeLatest('CONTACTS_REQUEST', getApiRequest),
    takeLatest('CONTACTS_POST_REQUEST', getApiPostRequest),
    takeLatest('CONTACTS_PATCH_REQUEST', getApiPatchRequest),

    takeLatest('CONTACTS_BRAINS_REQUEST', getApiRequest),

    takeLatest('PUBLISH_REQUEST', getApiRequest),
    takeLatest('PUBLISH_POST_REQUEST', getApiPostRequest),

    takeLatest('AMEND_REQUEST', getApiRequest),
    takeLatest('AMEND_POST_REQUEST', getApiPostRequest),

    takeLatest('DOCUMENTS_REQUEST', getApiRequest),

    takeLatest('DOCUMENT_REQUEST', getApiRequest),
    takeLatest('DOCUMENT_POST_REQUEST', getApiPostRequest),

    takeLatest('ALL_CUSTOM_CONSUMABLES_REQUEST', getApiRequest),

    takeLatest('CUSTOM_CONSUMABLES_REQUEST', getApiRequest),
    takeLatest('CUSTOM_CONSUMABLES_POST_REQUEST', getApiPostRequest),

    takeLatest('CUSTOM_TASKS_REQUEST', getApiRequest),
    takeLatest('CUSTOM_TASKS_POST_REQUEST', getApiPostRequest),

    takeLatest('SUBCONTRACTINGS_REQUEST', getApiRequest),
    takeLatest('SUBCONTRACTINGS_POST_REQUEST', getApiPostRequest),

    takeLatest('FUNCTION_JOBS_REQUEST', getApiRequest),

    takeLatest('CONSUMABLES_REQUEST', getApiRequest),

    takeLatest('LABORATORIES_REQUEST', getApiRequest),

    takeLatest('ANIMAL_GEO_FIRST_REQUEST', getApiRequest),

    takeLatest('ANIMAL_GEO_SECOND_REQUEST', getApiRequest),

    takeEvery('SET_GROUP_BRICK', setGroupBrick),

    takeLatest('CHILDREN_STUDY_GROUP_POST_REQUEST', setChildrenStudyGroup),

    takeLatest('SET_GROUP_CHILDREN', setGroupChildren),

    takeLatest('GET_GROUP_ID', getBrickId),

    takeLatest('GET_STUDY_COSTING', getStudyCosting)
  ])
}
