import * as types from '../types';

const toggle = (isToggle, status) => dispatch => {
  return dispatch({
    type: isToggle ? types.BUTTON_DISABLED : types.BUTTON_ACTIVE,
    payload: !isToggle,
    status: isToggle ? 'Active' : 'Disabled',
  });
};

export default toggle;
