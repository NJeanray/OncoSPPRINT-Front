import { applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { requestsPromiseMiddleware } from 'redux-saga-requests'

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), requestsPromiseMiddleware(), sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)

export default store
