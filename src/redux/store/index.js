import { createStore, applyMiddleware } from 'redux';
import promiseMiddleWare from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const middleWare = applyMiddleware(promiseMiddleWare(), thunk, logger);

const store = createStore(rootReducer, composeWithDevTools(middleWare));

export default store;
