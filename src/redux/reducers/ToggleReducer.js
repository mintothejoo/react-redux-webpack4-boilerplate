import * as types from '../types';

const initialState = {
  isToggle: false,
  status: 'disabled',
};

const toggle = (state = initialState, action) => {
  switch (action.type) {
    case types.BUTTON_ACTIVE:
      return {
        isToggle: action.payload,
        status: action.status,
      };

    case types.BUTTON_DISABLED:
      return {
        isToggle: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
};

export default toggle;
