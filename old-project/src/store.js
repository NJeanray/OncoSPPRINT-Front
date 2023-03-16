import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { requestsPromiseMiddleware } from 'redux-saga-requests'

import reducers from './reducers'
import rootSaga from './middlewares/sagas'

const INITIAL_STATE = {}
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(requestsPromiseMiddleware(), sagaMiddleware))
const store = createStore(reducers, INITIAL_STATE, enhancer)
sagaMiddleware.run(rootSaga)

export default store
