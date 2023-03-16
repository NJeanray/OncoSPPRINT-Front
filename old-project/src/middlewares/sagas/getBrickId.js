import instance from '../../service/api_base'
import { put, call } from 'redux-saga/effects'

const apiGetRequest = action => {
  const { urlCategory, site, brickNameUrl, paramsStringified } = action.payload.infos

  return instance.get(
    `/api/v1/brick/check_unique/?category=${urlCategory}&site=${site}&name=${brickNameUrl}&params=${paramsStringified}`,
    {}
  )
}

export function* getBrickId(action) {
  yield put({
    type: 'SET_GROUP_FETCHING',
    payload: true
  })

  try {
    const response = yield call(apiGetRequest, action)

    // yield put({
    //   type: 'SET_GROUP_FETCHING',
    //   payload: false
    // })
  } catch (error) {}
}
