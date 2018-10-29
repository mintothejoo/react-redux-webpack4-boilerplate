import { combineReducers } from 'redux';
import commonReducer from './CommonReducer';

const rootReducer = combineReducers({
  commonReducer,
});

export default rootReducer;
