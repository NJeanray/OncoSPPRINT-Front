import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import data from './state.reducer'

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    data
  })

export default rootReducer
