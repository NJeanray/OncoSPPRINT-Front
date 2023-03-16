import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiPatchRequest = action => {
  const { groupId, group_bricks } = action.payload

  return instance.patch(`api/v1/study-group/${groupId}/`, {
    group_bricks: group_bricks
  })
}

export function* setGroupBrick(action) {
  yield put({
    type: 'SET_GROUP_FETCHING',
    payload: true
  })

  try {
    const response = yield call(apiPatchRequest, action)
    yield put({
      type: 'SET_GROUP_BRICK_SUCCESS',
      payload: response.data
    })
    yield put({
      type: 'SET_GROUP_FETCHING',
      payload: false
    })
  } catch (error) {}
}
