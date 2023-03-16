import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiGetRequest = studyId => instance.get(`/api/v1/costing/?study_id=${studyId}`, {})

export function* getStudyCosting(action) {
  yield put({
    type: 'SET_STUDY_COSTING_FETCHING',
    payload: true
  })

  try {
    const { studyId } = action.payload
    const response = yield call(apiGetRequest, studyId)

    yield put({
      type: 'SET_STUDY_COSTING',
      payload: response.data[studyId]
    })
    yield put({
      type: 'SET_STUDY_COSTING_FETCHING',
      payload: false
    })
  } catch (error) {}
}
