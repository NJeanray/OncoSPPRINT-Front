// import { fromJS } from 'immutable'
//
// import rootReducer from './index'
//
// describe('reducers', () => {
//   const initialState = fromJS({
//     project: {
//       data: {},
//       isFetching: false,
//       errors: null
//     },
//     projects: {
//       data: {
//         1: {
//           id: 1,
//           name: 'project_1',
//           studies: [101, 102]
//         }
//       },
//       isFetching: false,
//       errors: null
//     },
//     studies: {
//       data: {
//         101: {
//           id: 101
//         },
//         102: {
//           id: 102
//         }
//       },
//       isFetching: false,
//       errors: null
//     }
//   })
//
//   it('should set project.data once /get request succeed', () => {
//     const name = 'project'
//     const action = {
//       type: `GET_${name.toUpperCase()}_SUCCESS`,
//       payload: {
//         name,
//         data: initialState.getIn(['projects', 'data', '1'])
//       }
//     }
//     const { data } = action.payload
//     const stateUpdated = rootReducer(initialState, action)
//
//     expect(stateUpdated).not.toEqual(initialState)
//     expect(stateUpdated.getIn([name, 'data'])).toEqual(fromJS({ [data.id]: data }))
//   })
//
//   it('should delete studies with id 102 once /delete request succeed', () => {
//     const name = 'studies'
//     const action = {
//       type: `DELETE_${name.toUpperCase()}_SUCCESS`,
//       payload: {
//         name,
//         data: {
//           id: 102
//         },
//         parent: {
//           projects: 1
//         }
//       }
//     }
//     const { data, parent } = action.payload
//     const parentName = Object.keys(parent)[0]
//     const parentKey = Object.values(parent)[0]
//     const stateUpdated = rootReducer(initialState, action)
//
//     expect(stateUpdated).not.toEqual(initialState)
//     expect(stateUpdated.getIn([name, 'data']).toJS()).not.toHaveProperty(data.id.toString())
//     expect(
//       stateUpdated.getIn([parentName, 'data', parentKey.toString(), name]).toJS()
//     ).not.toContain(data.id)
//   })
//
//   it('should post studies with id 103 once /post request succeed', () => {
//     const name = 'studies'
//     const action = {
//       type: `POST_${name.toUpperCase()}_SUCCESS`,
//       payload: {
//         name,
//         data: {
//           id: 103
//         },
//         parent: {
//           projects: 1
//         },
//         parts: []
//       }
//     }
//     const { data, parent } = action.payload
//     const parentName = Object.keys(parent)[0]
//     const parentKey = Object.values(parent)[0]
//     const stateUpdated = rootReducer(initialState, action)
//
//     expect(stateUpdated).not.toEqual(initialState)
//     expect(stateUpdated.getIn([name, 'data']).toJS()).toHaveProperty(data.id.toString())
//     expect(stateUpdated.getIn([parentName, 'data', parentKey.toString(), name]).toJS()).toContain(
//       data.id
//     )
//   })
//
//   it('should update projects name once /patch request succeed', () => {
//     const name = 'projects'
//     const action = {
//       type: `UPDATE_${name.toUpperCase()}_SUCCESS`,
//       payload: {
//         name,
//         data: {
//           id: 1,
//           name: 'project_001',
//           studies: [101, 102]
//         }
//       }
//     }
//     const stateUpdated = rootReducer(initialState, action)
//     const { data } = action.payload
//
//     expect(stateUpdated).not.toEqual(initialState)
//     expect(stateUpdated.getIn([name, 'data', data.id.toString()]).toJS()).toEqual(
//       action.payload.data
//     )
//   })
// })
