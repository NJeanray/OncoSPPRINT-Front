//import {createAction} from 'redux-actions';

import { LOGIN, LOGOUT, SET_EDITING_PART, SET_EDITING_STUDY_MODEL, SET_NOTIFICATION } from './types'

const createAction = (name, action) => dispatch => (...args) =>
  dispatch({
    type: name,
    payload: typeof action === 'function' ? action(...args) : action
  })

/***************************************************************************************/
/**                                  Redux Actions                                    **/
/***************************************************************************************/

// STUDY_GROUP
export const setGroupBrick = createAction('SET_GROUP_BRICK', (groupId, groupBrick) => ({
  groupId,
  group_bricks: groupBrick
}))

export const setGroupChildren = createAction('SET_GROUP_CHILDREN', groupId => ({
  groupId
}))

export const getGroupId = createAction('GET_GROUP_ID', infos => ({
  infos
}))

export const setNewStudyModelGroup = createAction(
  'SET_NEW_STUDY_MODEL_GROUP',
  newStudyModel => newStudyModel
)

export const getStudyCosting = createAction('GET_STUDY_COSTING', studyId => ({
  studyId: studyId
}))

// AUTHENTICATION
export const login = createAction(LOGIN, ({ username = null, password = null }) => ({
  username,
  password
}))
export const logout = createAction(LOGOUT)

export const setEditingPart = createAction(SET_EDITING_PART, (_, partId) => partId)

export const setEditingStudyModel = createAction(
  SET_EDITING_STUDY_MODEL,
  (_, studyModel) => studyModel
)

export const setNotification = createAction(SET_NOTIFICATION, notification => notification)

export default {
  login,
  logout,
  setEditingPart,
  setEditingStudyModel,
  setNotification,
  setGroupBrick,
  setNewStudyModelGroup,
  setGroupChildren,
  getGroupId,
  getStudyCosting
}
