import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import promiseMiddleWare from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middleWare = applyMiddleware(
  promiseMiddleWare(),
  thunk,
  logger
)


const store = createStore(rootReducer, composeWithDevTools(middleWare));

export default store;