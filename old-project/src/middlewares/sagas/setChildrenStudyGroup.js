import instance from '../../service/api_base'
import { put, call, all } from 'redux-saga/effects'

const apiPostRequest = params => {
  return instance.post(`api/v1/study-group/`, params)
}

export function* setChildrenStudyGroup(action) {
  const { numberOfGroups, groupParentId } = action.payload
  const arrayGroups = Array.from({ length: numberOfGroups }).reduce(acc => {
    acc.push({
      parent: groupParentId,
      animalsNumber: 0
    })
    return acc
  }, [])

  try {
    const response = yield all(arrayGroups.map(obj => call(apiPostRequest, obj)))
    const childrenCreated = response.map(item => ({ ...item.data }))

    yield put({
      type: 'SET_CHILDREN_STUDY_GROUP',
      payload: [...childrenCreated],
      parent: groupParentId
    })
  } catch (error) {}
}
