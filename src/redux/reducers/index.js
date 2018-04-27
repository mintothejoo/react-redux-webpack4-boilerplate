import { combineReducers } from 'redux';
import toggle from './ToggleReducer';
import reducerA from './ReducerA';

const rootReducer = combineReducers({
  toggle,
  reducerA,
});

export default rootReducer;
