import * as actions from './index'
import {
  GET_ENTITIES_REQUEST,
  POST_ENTITIES_REQUEST,
  UPDATE_ENTITIES_REQUEST,
  DELETE_ENTITIES_REQUEST
} from '../constants'

describe('actions', () => {
  const name = 'parts'
  const payload = {
    name
  }

  it('should create an action to get a part', () => {
    const expectedAction = {
      type: GET_ENTITIES_REQUEST,
      payload
    }
    expect(actions.getActionCreator(name, {})).toEqual(expectedAction)
  })

  it('should create an action to delete a part', () => {
    const expectedAction = {
      type: DELETE_ENTITIES_REQUEST,
      payload
    }
    expect(actions.deleteActionCreator(name, {})).toEqual(expectedAction)
  })

  it('should create an action to create a part', () => {
    const expectedAction = {
      type: POST_ENTITIES_REQUEST,
      payload
    }
    expect(actions.createActionCreator(name, {})).toEqual(expectedAction)
  })

  it('should create an action to update a part', () => {
    const expectedAction = {
      type: UPDATE_ENTITIES_REQUEST,
      payload
    }
    expect(actions.updateActionCreator(name, {})).toEqual(expectedAction)
  })
})
