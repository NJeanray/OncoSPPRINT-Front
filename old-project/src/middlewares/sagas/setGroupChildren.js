import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiPatchRequest = action => {
  const { groupId } = action.payload

  return instance.patch(`api/v1/study-group/${groupId}/`, {
    children: []
  })
}

export function* setGroupChildren(action) {
  yield put({
    type: 'SET_GROUP_CHILDREN_FETCHING',
    payload: true
  })

  try {
    yield call(apiPatchRequest, action)

    yield put({
      type: 'SET_GROUP_CHILDREN_SUCCESS',
      payload: action.payload.groupId
    })
    yield put({
      type: 'SET_GROUP_FETCHING',
      payload: false
    })
  } catch (error) {}
}
